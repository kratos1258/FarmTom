import express from "express";
import authController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import { forgotPasswordSchema, registerSchema, resendVerificationSchema, resetPasswordSchema } from "../validators/auth.validator.js";
import { loginSchema } from "../validators/auth.validator.js";
import authenticate from "../middlewares/authenticate.js";
import {verifyEmailSchema} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register",validate(registerSchema),authController.register);
router.post("/login",validate(loginSchema),authController.login);
router.post("/logout",authenticate,authController.logout);
router.post("/verify-email",validate(verifyEmailSchema),authController.verifyEmail);
router.post("/resend-verification-email", validate(resendVerificationSchema), authController.resendVerificationEmail)
router.post("/forgot-password",validate(forgotPasswordSchema),authController.forgotPassword);
router.patch("/reset-password",validate(resetPasswordSchema),authController.resetPassword);

export default router;

