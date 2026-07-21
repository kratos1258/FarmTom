import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const authorize = (...roles) => {
    return (req, res, next) => {
        console.log("Allowed roles:", roles);
        console.log("User roles:", req.user.roles);

        const hasPermission = req.user.roles.some(role =>
            roles.includes(role)
        );

        if (!hasPermission) {
            return next(
                new AppError(
                    "You are not authorized to perform this action.",
                    HTTP_STATUS.FORBIDDEN
                )
            );
        }

        next();
    };
};

/*
const authorize = (...roles) => {
    return (req, res, next) => {
        const hasPermission = req.user.roles.some(role =>
            roles.includes(role)
        );

        if (!hasPermission) {
            return next(
                new AppError(
                    "You are not authorized to perform this action.",
                    HTTP_STATUS.FORBIDDEN
                )
            );
        }

        next();
    };
};
*/

export default authorize;