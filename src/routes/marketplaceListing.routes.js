import express from "express";

import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";

import marketplaceListingController from "../controllers/marketplaceListing.controller.js";

import {
    createMarketplaceListingSchema,
    updateMarketplaceListingSchema,
} from "../validators/marketplaceListing.validator.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post(
    "/:batchId",
    authenticate,
    authorize(ROLES.FARMER),
    validate(createMarketplaceListingSchema),
    marketplaceListingController.createListing
);

router.get(
    "/",
    marketplaceListingController.getAllListings
);

router.patch(
    "/:id",
    authenticate,
    authorize(ROLES.FARMER),
    validate(updateMarketplaceListingSchema),
    marketplaceListingController.updateListing
);

export default router;