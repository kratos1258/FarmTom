import Joi from "joi";
import {
    ROLES,
    SELF_ASSIGNABLE_ROLES,
} from "../constants/roles.js";

export const updateProfileSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50),

    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50),

    phoneNumber: Joi.string()
        .trim(),

    profileImage: Joi.string()
        .uri()
        .allow(null, ""),
});

export const addRoleSchema = Joi.object({
    role: Joi.string()
        .valid(...SELF_ASSIGNABLE_ROLES)
        .required(),
});

export default {
    updateProfileSchema,
    addRoleSchema,
};