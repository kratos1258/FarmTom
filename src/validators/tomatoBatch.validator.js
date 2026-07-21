import Joi from "joi";

export const createTomatoBatchSchema = Joi.object({
    tomatoVariety: Joi.string().trim().required(),

    grade: Joi.string()
        .valid("A", "B", "C")
        .required(),

    quantity: Joi.number()
        .positive()
        .required(),

    unit: Joi.string()
        .valid("kg", "crate", "basket")
        .default("kg"),
    image: Joi.object({
            url: Joi.string().uri(),
            publicId: Joi.string(),
        }).optional(),

    harvestDate: Joi.date().required(),

    expiryDate: Joi.date().greater(Joi.ref("harvestDate")).required(),

    farmLocation: Joi.string().trim().required(),
});

export const updateTomatoBatchSchema =
    createTomatoBatchSchema.fork(
        [
            "tomatoVariety",
            "grade",
            "quantity",
            "unit",
            "harvestDate",
            "expiryDate",
            "farmLocation",
        ],
        (schema) => schema.optional()
    );
