import buyerProfileService from "../services/buyerProfile.service.js";

const createProfile = async (req, res, next) => {
    try {
        const profile = await buyerProfileService.createProfile(
            req.user,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Buyer profile created successfully.",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

const getMyProfile = async (req, res, next) => {
    try {
        const profile = await buyerProfileService.getMyProfile(
            req.user.id
        );

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const profile = await buyerProfileService.updateProfile(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Buyer profile updated successfully.",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createProfile,
    getMyProfile,
    updateProfile,
};