import FarmerProfile from "../models/FarmerProfile.js";

const create = (data) => {
    return FarmerProfile.create(data);
};

const findByUser = (userId) => {
    return FarmerProfile.findOne({ user: userId });
};

const findById = (id) => {
    return FarmerProfile.findById(id);
};

const updateByUser = (userId, update) => {
    return FarmerProfile.findOneAndUpdate(
        { user: userId },
        update,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteByUser = (userId) => {
    return FarmerProfile.findOneAndDelete({
        user: userId,
    });
};

export default {
    create,
    findByUser,
    findById,
    updateByUser,
    deleteByUser,
};