import Joi from "joi";

export const createMarketplaceListingSchema = Joi.object({
    pricePerUnit: Joi.number()
        .positive()
        .required(),


    description: Joi.string()
        .allow("")
        .optional(),
});

export const updateMarketplaceListingSchema =
    createMarketplaceListingSchema.fork(
        [
            "pricePerUnit",
            "description",
        ],
        (schema) => schema.optional()
    );