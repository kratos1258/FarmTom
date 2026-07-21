import marketplaceListingService from "../services/marketplaceListing.service.js";

const createListing = async (req, res, next) => {
    try {

        const listing =
            await marketplaceListingService.createListing(
                req.user,
                req.params.batchId,
                req.body
            );

        res.status(201).json({
            success: true,
            message: "Listing published successfully.",
            data: listing,
        });

    } catch (error) {
        next(error);
    }
};

const getAllListings = async (req, res, next) => {
    try {

        const listings =
            await marketplaceListingService.getAllListings();

        res.json({
            success: true,
            data: listings,
        });

    } catch (error) {
        next(error);
    }
};

const updateListing = async (req, res, next) => {
    try {

        const listing =
            await marketplaceListingService.updateListing(
                req.params.id,
                req.body
            );

        res.json({
            success: true,
            message: "Listing updated successfully.",
            data: listing,
        });

    } catch (error) {
        next(error);
    }
};


export default {
    createListing,
    getAllListings,
    updateListing,
};