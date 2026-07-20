import farmerService from "../services/farmerProfile.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const createProfile = async (req, res, next) => {
    try {
        const profile = await farmerService.createProfile(
            req.user.id,
            req.body
        );

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: "Farmer profile created successfully.",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const profile = await farmerService.getProfile(
            req.user.id
        );

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: "Farmer profile fetched successfully.",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const profile = await farmerService.updateProfile(
            req.user.id,
            req.body
        );

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: "Farmer profile updated successfully.",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProfile = async (req, res, next) => {
    try {
        await farmerService.deleteProfile(req.user.id);

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: "Farmer profile deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
};