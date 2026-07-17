import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const authenticate = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new AppError(
                "Authentication required.",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userRepository.findById(decoded.id);

        if (!user) {
            throw new AppError(
                "User not found.",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        if (!user.isActive) {
            throw new AppError(
                "Account is inactive.",
                HTTP_STATUS.FORBIDDEN
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export default authenticate;