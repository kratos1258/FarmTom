import Joi from "joi";
import { ROLES } from "../constants/roles.js";

export const registerSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    phoneNumber: Joi.string()
        .trim()
        .required(),

    password: Joi.string()
        .min(8)
        .max(50)
        .required(),

    roles: Joi.array()
        .items(
            Joi.string().valid(
                ROLES.FARMER,
                ROLES.BUYER,
                ROLES.LOGISTICS_PROVIDER,
                ROLES.WAREHOUSE_OPERATOR
            )
        )
        .unique()
        .min(1)
        .required(),
});


export const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    password: Joi.string()
        .required(),
});


export const verifyEmailSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    otp: Joi.string()
        .length(6)
        .required(),
});

export const resendVerificationSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),
});

export const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    otp: Joi.string()
        .trim()
        .length(6)
        .required(),

    newPassword: Joi.string()
        .min(8)
        .max(50)
        .required(),
});