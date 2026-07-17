import userRepository from "../repositories/user.repository.js";

const getProfile = async (userId) => {
    return await userRepository.findById(userId);
};

const updateProfile = async (userId, data) => {
    return await userRepository.updateProfile(userId, data);
};

export default {
    getProfile,
    updateProfile,
};