import Joi from "joi";

export const createFarmerProfileSchema = Joi.object({
    farmName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    farmDescription: Joi.string()
        .trim()
        .max(500)
        .allow("")
        .optional(),

    farmAddress: Joi.string()
        .trim()
        .required(),

    country: Joi.string()
        .trim()
        .default("Nigeria"),

    state: Joi.string()
        .trim()
        .required(),

    localGovernment: Joi.string()
        .trim()
        .required(),

    farmSize: Joi.number()
        .positive()
        .required(),

    farmSizeUnit: Joi.string()
        .valid("hectares", "acres")
        .default("hectares"),

    yearsOfExperience: Joi.number()
        .min(0)
        .required(),

    profileImage: Joi.string()
        .uri()
        .allow(null, "")
        .optional(),
});

export const updateFarmerProfileSchema = Joi.object({
    farmName: Joi.string()
        .trim()
        .min(2)
        .max(100),

    farmDescription: Joi.string()
        .trim()
        .max(500)
        .allow(""),

    farmAddress: Joi.string()
        .trim(),

    country: Joi.string()
        .trim(),

    state: Joi.string()
        .trim(),

    localGovernment: Joi.string()
        .trim(),

    farmSize: Joi.number()
        .positive(),

    farmSizeUnit: Joi.string()
        .valid("hectares", "acres"),

    yearsOfExperience: Joi.number()
        .min(0),

    profileImage: Joi.string()
        .uri()
        .allow(null, ""),
})
.min(1);

export default {
    createFarmerProfileSchema,
    updateFarmerProfileSchema,
};
