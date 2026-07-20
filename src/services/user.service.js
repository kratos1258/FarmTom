import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import {
    ROLES,
    SELF_ASSIGNABLE_ROLES,
} from "../constants/roles.js";


const getProfile = async (userId) => {
    return await userRepository.findById(userId);
};

const updateProfile = async (userId, data) => {
    return await userRepository.updateProfile(userId, data);
};

const addRole = async (userId, role) => {
    // Find user
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError(
            "User not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    // Extra security check
    if (!SELF_ASSIGNABLE_ROLES.includes(role)) {
        throw new AppError(
            "Invalid role.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    // Prevent admin assignment
    if (role === ROLES.ADMIN) {
        throw new AppError(
            "You cannot assign the admin role.",
            HTTP_STATUS.FORBIDDEN
        );
    }

    // Prevent duplicates
    if (user.roles.includes(role)) {
        throw new AppError(
            "You already have this role.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    // Add role
    user.roles.push(role);

    await user.save();

    return user;
};


export default {
    getProfile,
    updateProfile,
    addRole,
};