import EmailVerification from "../models/EmailVerification.js";

const create = (data) => {
    return EmailVerification.create(data);
};

const findByUser = (userId) => {
    return EmailVerification.findOne({ user: userId });
};

const findByOTP = (userId, otp) => {
    return EmailVerification.findOne({
        user: userId,
        otp,
    });
};

const deleteByUser = (userId) => {
    return EmailVerification.deleteMany({
        user: userId,
    });
};
const deleteById = (id) => {
    return EmailVerification.findByIdAndDelete(id);
};

export default {
    create,
    findByUser,
    findByOTP,
    deleteByUser,
    deleteById
};