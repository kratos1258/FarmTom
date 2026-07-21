import tomatoBatchService from "../services/tomatoBatch.service.js";

const createBatch = async (req, res, next) => {
    try {

        const batch =
            await tomatoBatchService.createBatch(
                req.user,
                req.body,
                req.file
            );

        res.status(201).json({
            success: true,
            message: "Tomato batch registered successfully.",
            data: batch,
        });

    } catch (error) {
        next(error);
    }
};

const getMyBatches = async (req, res, next) => {
    try {

        const batches =
            await tomatoBatchService.getMyBatches(
                req.user
            );

        res.json({
            success: true,
            data: batches,
        });

    } catch (error) {
        next(error);
    }
};

const getBatch = async (req, res, next) => {
    try {

        const batch =
            await tomatoBatchService.getBatch(
                req.params.id
            );

        res.json({
            success: true,
            data: batch,
        });

    } catch (error) {
        next(error);
    }
};

const updateBatch = async (req, res, next) => {
    try {

        const batch =
            await tomatoBatchService.updateBatch(
                req.params.id,
                req.body
            );

        res.json({
            success: true,
            message: "Tomato batch updated successfully.",
            data: batch,
        });

    } catch (error) {
        next(error);
    }
};

export default {
    createBatch,
    getMyBatches,
    getBatch,
    updateBatch,
};