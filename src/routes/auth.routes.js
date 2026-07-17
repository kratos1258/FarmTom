import express from "express";
import authController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import { registerSchema } from "../validators/auth.validator.js";
import { loginSchema } from "../validators/auth.validator.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register",validate(registerSchema),authController.register);
router.post("/login",validate(loginSchema),authController.login);
router.post("/logout",authenticate,authController.logout);

export default router;

