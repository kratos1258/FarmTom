import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ROLES } from "../constants/roles.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import generateOTP from "../utils/otp.js";
import emailVerificationRepository from "../repositories/emailVerification.repository.js";
import { OTP_EXPIRY_MINUTES } from "../constants/auth.js";
import sendEmail from "../utils/sendEmail.js";
import { verificationEmailTemplate } from "../utils/emailTemplates.js";
import { AUTH_MESSAGES } from "../constants/messages.js";
import passwordResetRepository from "../repositories/passwordReset.repository.js";
import { passwordResetEmailTemplate } from "../utils/emailTemplates.js";



const register = async (userData) => {
    console.log("Service started");

    const { email, roles } = userData;

    const emailExists = await userRepository.existsByEmail(email);

    console.log("Email check complete");

    if (emailExists) {
        throw new AppError(
            "Email already exists.",
            HTTP_STATUS.CONFLICT
        );
    }
    if (roles.includes(ROLES.ADMIN)) {
        throw new AppError(
            "You cannot register as an administrator.",
            HTTP_STATUS.FORBIDDEN
        );
    }

    const user = await userRepository.create(userData);

    // Remove any previous verification OTPs
    await emailVerificationRepository.deleteByUser(user._id);

    // Generate OTP
    const otp = generateOTP();

        // Set expiry time
    const expiresAt = new Date(
            Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
        );

    // Save OTP
    await emailVerificationRepository.create({
            user: user._id,
            otp,
            expiresAt,
        });

    console.log("Before sending email");

     sendEmail({
        to: user.email,
        subject: "Verify your FreshAm account",
        html: verificationEmailTemplate(
            user.firstName,
            otp
        ),
    });
    return user;
};

const login = async ({ email, password }) => {
    // Find user with password
    const user = await userRepository.findByEmailWithPassword(email);

    if (!user) {
        throw new AppError(
            "Invalid email or password.",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new AppError(
            "Invalid email or password.",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    // Check account status
    if (!user.isActive) {
        throw new AppError(
            "Your account has been deactivated.",
            HTTP_STATUS.FORBIDDEN
        );
    }

    // Generate Access Token
    const accessToken = jwt.sign(
        {
            id: user._id,
            roles: user.roles,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        }
    );

    // Save Refresh Token
    user.refreshToken = refreshToken;
    await user.save();

    return {
        user,
        accessToken,
        refreshToken,
    };
};

const logout = async (userId) => {
    const user = await userRepository.findById(userId);
    user.refreshToken = null;
    await user.save();
};

const verifyEmail = async ({ email, otp }) => {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new AppError(
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }
    // Already verified?
    if (user.isEmailVerified) {
        throw new AppError(
            "Email is already verified.",
            HTTP_STATUS.BAD_REQUEST
        );
    }
    // Find OTP
    const verification =
        await emailVerificationRepository.findByUser(user._id);
    if (!verification) {
        throw new AppError(
            "Verification OTP not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }
    // Expired?
    if (verification.expiresAt < new Date()) {
        throw new AppError(
            "Verification OTP has expired.",
            HTTP_STATUS.BAD_REQUEST
        );
    }
    // Wrong OTP?
    if (verification.otp !== otp) {
        throw new AppError(
            "Invalid verification OTP.",
            HTTP_STATUS.BAD_REQUEST
        );
    }
    // Verify account
    user.isEmailVerified = true;
    await user.save();
    // Delete OTP
    await emailVerificationRepository.deleteById(
        verification._id
    );
    return user;
};

const resendVerificationEmail = async ({ email }) => {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new AppError(
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }
    // Already verified
    if (user.isEmailVerified) {
        throw new AppError(
            "Email is already verified.",
            HTTP_STATUS.BAD_REQUEST
        );
    }
    // Remove previous OTP
    await emailVerificationRepository.deleteByUser(user._id);
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );
    // Save OTP
    await emailVerificationRepository.create({
        user: user._id,
        otp,
        expiresAt,
    });
    // Send Email
    await sendEmail({
        to: user.email,
        subject: "Verify your FreshAm account",
        html: verificationEmailTemplate(
            user.firstName,
            otp
        ),
    });
    return otp;
};

const forgotPassword = async ({ email }) => {

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new AppError(
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    await passwordResetRepository.deleteByUser(user._id);

    const otp = generateOTP();

    const expiresAt = new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );

    await passwordResetRepository.create({
        user: user._id,
        otp,
        expiresAt,
    });

    await sendEmail({
        to: user.email,
        subject: "Reset your FreshAm password",
        html: passwordResetEmailTemplate(
            user.firstName,
            otp
        ),
    });

    return otp;
};

const resetPassword = async ({ email, otp, newPassword }) => {
    // Find user
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new AppError(
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    // Find reset OTP
    const passwordReset =
        await passwordResetRepository.findByOTP(
            user._id,
            otp
        );

    if (!passwordReset) {
        throw new AppError(
            "Invalid password reset OTP.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    // Check expiry
    if (passwordReset.expiresAt < new Date()) {
        throw new AppError(
            "Password reset OTP has expired.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    // Update password
    user.password = newPassword;

    // Invalidate refresh token (forces login again)
    user.refreshToken = null;

    // Triggers pre("save") to hash the password
    await user.save();

    // Delete used OTP
    await passwordResetRepository.deleteById(
        passwordReset._id
    );

    return user;
};

export default {
    register,
    login,
    logout,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword
};


