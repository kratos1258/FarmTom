import express from "express";
import farmerController from "../controllers/farmerProfile.controller.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import { ROLES } from "../constants/roles.js";
import {createFarmerProfileSchema,updateFarmerProfileSchema,} from "../validators/farmerProfile.validator.js";

const router = express.Router();

router.use(authenticate);

router.post("/profile",authorize(ROLES.FARMER),validate(createFarmerProfileSchema),farmerController.createProfile);

router.get("/profile",authorize(ROLES.FARMER),farmerController.getProfile);

router.patch("/profile",authorize(ROLES.FARMER),validate(updateFarmerProfileSchema),farmerController.updateProfile);

router.delete("/profile",authorize(ROLES.FARMER),farmerController.deleteProfile);

export default router;