import MarketplaceListing from "../models/MarketplaceListing.js";

const create = (data) => MarketplaceListing.create(data);

const findByBatch = (batchId) =>
    MarketplaceListing.findOne({
        tomatoBatch: batchId,
    });

const findAll = () =>
    MarketplaceListing.find({
        isPublished: true,
    }).populate("tomatoBatch");

const updateById = (id, data) =>
    MarketplaceListing.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

export default {
    create,
    findByBatch,
    findAll,
    updateById,
};