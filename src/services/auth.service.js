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

const register = async (userData) => {
    console.log("Service started");

    const { email, roles } = userData;

    console.log("Checking email...");
    const emailExists = await userRepository.existsByEmail(email);

    console.log("Email check complete");

    if (emailExists) {
        throw new AppError(
            "Email already exists.",
            HTTP_STATUS.CONFLICT
        );
    }

    console.log("Creating user...");
    const user = await userRepository.create(userData);
    console.log("User created");
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

    try {
         await sendEmail({
            to: user.email,
            subject: "Verify your TomatoLink account",
            html: verificationEmailTemplate(
                user.firstName,
                otp
            ),
        });
    } catch (error) {
        console.error("Verification email could not be sent:", error.message);
    }

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

export default {
    register,
    login,
    logout
};

