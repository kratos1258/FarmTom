import marketplaceListingRepository from "../repositories/marketplaceListing.repository.js";
import tomatoBatchRepository from "../repositories/tomatoBatch.repository.js";
import farmerProfileRepository from "../repositories/farmerProfile.repository.js";

import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ROLES } from "../constants/roles.js";

const createListing = async (user, batchId, listingData) => {
    if (!user.roles.includes(ROLES.FARMER)) {
        throw new AppError(
            "Only farmers can publish listings.",
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

    const batch =
        await tomatoBatchRepository.findById(batchId);

    if (!batch) {
        throw new AppError(
            "Tomato batch not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    const existing =
        await marketplaceListingRepository.findByBatch(batchId);

    if (existing) {
        throw new AppError(
            "Listing already exists for this batch.",
            HTTP_STATUS.CONFLICT
        );
    }

    const listing =
        await marketplaceListingRepository.create({
            tomatoBatch: batchId,
            ...listingData,
        });

    return listing;
};

const getAllListings = async () => {
    return marketplaceListingRepository.findAll();
};

const updateListing = async (id, data) => {

    const listing =
        await marketplaceListingRepository.updateById(
            id,
            data
        );

    if (!listing) {
        throw new AppError(
            "Listing not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return listing;
};

export default {
    createListing,
    getAllListings,
    updateListing,
};