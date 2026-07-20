import BuyerProfile from "../models/BuyerProfile.js";

const create = (data) => {
    return BuyerProfile.create(data);
};

const findByUser = (userId) => {
    return BuyerProfile.findOne({ user: userId });
};

const updateByUser = (userId, data) => {
    return BuyerProfile.findOneAndUpdate(
        { user: userId },
        data,
        {
            new: true,
            runValidators: true,
        }
    );
};

export default {
    create,
    findByUser,
    updateByUser,
};