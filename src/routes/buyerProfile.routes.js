import express from "express";

import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";

import buyerProfileController from "../controllers/buyerProfile.controller.js";

import {
    createBuyerProfileSchema,
    updateBuyerProfileSchema,
} from "../validators/buyerProfile.validator.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post("/",authenticate,authorize(ROLES.BUYER),validate(createBuyerProfileSchema),buyerProfileController.createProfile);

router.get("/me",authenticate,authorize(ROLES.BUYER),buyerProfileController.getMyProfile);

router.patch("/me",authenticate,authorize(ROLES.BUYER),validate(updateBuyerProfileSchema),buyerProfileController.updateProfile);

export default router;