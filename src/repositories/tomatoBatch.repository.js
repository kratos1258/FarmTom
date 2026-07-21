import TomatoBatch from "../models/TomatoBatch.js";

const create = (data) => TomatoBatch.create(data);

const findById = (id) => TomatoBatch.findById(id);

const findByFarmer = (farmerId) =>
    TomatoBatch.find({ farmer: farmerId });

const updateById = (id, data) =>
    TomatoBatch.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

export default {
    create,
    findById,
    findByFarmer,
    updateById,
};