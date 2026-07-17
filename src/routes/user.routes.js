import express from "express";
import authenticate from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import userController from "../controllers/user.controller.js";
import { updateProfileSchema } from "../validators/user.validator.js";

const router = express.Router();

router.get("/me",authenticate,userController.getProfile);

router.patch("/profile",authenticate,validate(updateProfileSchema),userController.updateProfile);

export default router;