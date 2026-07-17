import authService from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { AUTH_MESSAGES } from "../constants/messages.js";


const register = async (req, res, next) => {
    console.log("1. Controller reached");

    try {
        console.log("2. Calling service...");
        const user = await authService.register(req.body);
        console.log("3. Service completed");

        const responseData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            roles: user.roles,
            isEmailVerified: user.isEmailVerified,
        };

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: AUTH_MESSAGES.REGISTER_SUCCESS,
            data: responseData,
        });
    } catch (error) {
        console.error("Controller caught:", error);
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const { user, accessToken, refreshToken } =
            await authService.login(req.body);

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: AUTH_MESSAGES.LOGIN_SUCCESS,
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    roles: user.roles,
                },
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        await authService.logout(req.user.id);

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: "Logout successful.",
        });
    } catch (error) {
        next(error);
    }
};

const authController = {
    register,
    login,
    logout
}

export default authController;