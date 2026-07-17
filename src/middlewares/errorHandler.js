import { ERROR_MESSAGES } from "../constants/messages.js";


const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    res.status(statusCode).json({
        success: false,
        status,
        message:err.message ||ERROR_MESSAGES.INTERNAL_SERVER_ERROR});
};

export default errorHandler;