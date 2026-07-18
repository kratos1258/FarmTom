import PasswordReset from "../models/PasswordReset.js";

const create = (data) => {
    return PasswordReset.create(data);
};

const findByUser = (userId) => {
    return PasswordReset.findOne({
        user: userId,
    });
};

const findByOTP = (userId, otp) => {
    return PasswordReset.findOne({
        user: userId,
        otp,
    });
};

const deleteByUser = (userId) => {
    return PasswordReset.deleteMany({
        user: userId,
    });
};

const deleteById = (id) => {
    return PasswordReset.findByIdAndDelete(id);
};

export default {
    create,
    findByUser,
    findByOTP,
    deleteByUser,
    deleteById,
};