import userService from "../services/user.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const getProfile = async (req, res, next) => {
    try {
        const user = await userService.getProfile(req.user.id);

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: "Profile retrieved successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const user = await userService.updateProfile(
            req.user.id,
            req.body
        );

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: "Profile updated successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const addRole = async (req, res, next) => {
    try {
        const user = await userService.addRole(
            req.user.id,
            req.body.role
        );

        res.status(200).json({
            success: true,
            message: "Role added successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const userController = {
    getProfile,
    updateProfile,
    addRole

}

export default userController;