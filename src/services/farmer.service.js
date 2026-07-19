import farmerRepository from "../repositories/farmer.repository.js";
import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ROLES } from "../constants/roles.js";

const createProfile = async (userId, profileData) => {
    // Check if user exists
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError(
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    // Only farmers can create a farmer profile
    if (!user.roles.includes(ROLES.FARMER)) {
        throw new AppError(
            "Only farmers can create a farmer profile.",
            HTTP_STATUS.FORBIDDEN
        );
    }

    // Prevent duplicate profile
    const existingProfile = await farmerRepository.findByUser(userId);

    if (existingProfile) {
        throw new AppError(
            "Farmer profile already exists.",
            HTTP_STATUS.CONFLICT
        );
    }

    // Create profile
    return farmerRepository.create({
        user: userId,
        ...profileData,
    });
};


const getProfile = async (userId) => {
    const profile = await farmerRepository.findByUser(userId);

    if (!profile) {
        throw new AppError(
            "Farmer profile not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return profile;
};

const updateProfile = async (userId, updateData) => {
    const profile = await farmerRepository.updateByUser(
        userId,
        updateData
    );

    if (!profile) {
        throw new AppError(
            "Farmer profile not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return profile;
};


const deleteProfile = async (userId) => {
    const profile = await farmerRepository.deleteByUser(
        userId
    );

    if (!profile) {
        throw new AppError(
            "Farmer profile not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return;
};


export default {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
};