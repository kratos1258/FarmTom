import tomatoBatchRepository from "../repositories/tomatoBatch.repository.js";
import farmerProfileRepository from "../repositories/farmerProfile.repository.js";
import uploadImage from "../utils/uploadImage.js";

import generateBatchNumber from "../utils/generateBatchNumber.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ROLES } from "../constants/roles.js";

const createBatch = async (user, batchData, file) => {

    if (!user.roles.includes(ROLES.FARMER)) {
        throw new AppError(
            "Only farmers can register tomato batches.",
            HTTP_STATUS.FORBIDDEN
        );
    }

    const farmer =
        await farmerProfileRepository.findByUser(user.id);

    if (!farmer) {
        throw new AppError(
            "Farmer profile not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    let image = null;
    if (file) {
        image = await uploadImage(file);
    }
    const batch =
        await tomatoBatchRepository.create({
            farmer: farmer._id,
            batchNumber: generateBatchNumber(),
            image,
            ...batchData,
        });
    };

const getMyBatches = async (user) => {

    const farmer =
        await farmerProfileRepository.findByUser(user.id);

    if (!farmer) {
        throw new AppError(
            "Farmer profile not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return tomatoBatchRepository.findByFarmer(
        farmer._id
    );
};

const getBatch = async (id) => {

    const batch =
        await tomatoBatchRepository.findById(id);

    if (!batch) {
        throw new AppError(
            "Tomato batch not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return batch;
};

const updateBatch = async (id, data) => {

    const batch =
        await tomatoBatchRepository.updateById(
            id,
            data
        );

    if (!batch) {
        throw new AppError(
            "Tomato batch not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return batch;
};

export default {
    createBatch,
    getMyBatches,
    getBatch,
    updateBatch,
};