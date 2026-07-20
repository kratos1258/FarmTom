import buyerProfileRepository from "../repositories/buyerProfile.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ROLES } from "../constants/roles.js";

const createProfile = async (user, profileData) => {
    // Must have buyer role
    if (!user.roles.includes(ROLES.BUYER)) {
        throw new AppError(
            "You must have the buyer role before creating a buyer profile.",
            HTTP_STATUS.FORBIDDEN
        );
    }

    // Check if profile already exists
    const existingProfile =
        await buyerProfileRepository.findByUser(user.id);

    if (existingProfile) {
        throw new AppError(
            "Buyer profile already exists.",
            HTTP_STATUS.CONFLICT
        );
    }

    // Create profile
    const profile =
        await buyerProfileRepository.create({
            user: user.id,
            ...profileData,
        });

    return profile;
};

const getMyProfile = async (userId) => {
    const profile =
        await buyerProfileRepository.findByUser(userId);

    if (!profile) {
        throw new AppError(
            "Buyer profile not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return profile;
};

const updateProfile = async (userId, data) => {
    const profile =
        await buyerProfileRepository.updateByUser(
            userId,
            data
        );

    if (!profile) {
        throw new AppError(
            "Buyer profile not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return profile;
};

export default {
    createProfile,
    getMyProfile,
    updateProfile,
};