import { HTTP_STATUS } from "../constants/httpStatus.js";
import AppError from "../utils/AppError.js";

const validate = (schema) => {
    return (req, res, next) => {
        console.log("Validator reached");
        const { error, value } = schema.validate(req.body, {

            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const message = error.details
                .map((detail) => detail.message)
                .join(", ");

            return next(
                new AppError(message, HTTP_STATUS.BAD_REQUEST)
            );
        }

        // Replace the request body with the validated/sanitized data
        req.body = value;

        next();
    };
};

export default validate;