import Joi from "joi";

export const createBuyerProfileSchema = Joi.object({
    businessName: Joi.string()
        .trim()
        .required(),

    businessType: Joi.string()
        .valid(
            "individual",
            "restaurant",
            "retailer",
            "wholesaler",
            "supermarket",
            "processor",
            "exporter",
            "other"
        )
        .required(),

    address: Joi.string()
        .trim()
        .required(),

    city: Joi.string()
        .trim()
        .required(),

    state: Joi.string()
        .trim()
        .required(),

    country: Joi.string()
        .trim()
        .default("Nigeria"),
});

export const updateBuyerProfileSchema =
    createBuyerProfileSchema.fork(
        [
            "businessName",
            "businessType",
            "address",
            "city",
            "state",
            "country",
        ],
        (schema) => schema.optional()
    );

export default {
    createBuyerProfileSchema,
    updateBuyerProfileSchema,
};