import User from "../models/User.js";

const create = (userData) => {
    return User.create(userData);
};

const findByEmail = (email) => {
    return User.findOne({ email });
};

const findById = (id) => {
    return User.findById(id);
};

const updateById = (id, update) => {
    return User.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
    });
};

const deleteById = (id) => {
    return User.findByIdAndDelete(id);
};

const findByEmailWithPassword = (email) => {
    return User.findOne({ email }).select("+password");
};

const existsByEmail = async (email) => {
    return await User.exists({ email });
};

const updateProfile = (id, data) => {
    return User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export default {
    create,
    findByEmail,
    findById,
    updateById,
    deleteById,
    findByEmailWithPassword,
    existsByEmail,
    updateProfile
};

