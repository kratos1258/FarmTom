import mongoose from "mongoose";
import { VERIFICATION_STATUS } from "../constants/verificationStatus.js";

const farmerProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        farmName: {
            type: String,
            required: true,
            trim: true,
        },

        farmDescription: {
            type: String,
            trim: true,
            default: "",
        },

        farmAddress: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        localGovernment: {
            type: String,
            required: true,
            trim: true,
        },

        farmSize: {
            type: Number,
            required: true,
            min: 0,
        },

        farmSizeUnit: {
            type: String,
            enum: ["hectares", "acres"],
            default: "hectares",
        },

        yearsOfExperience: {
            type: Number,
            default: 0,
            min: 0,
        },

        profileImage: {
            type: String,
            default: null,
        },

        verificationStatus: {
            type: String,
            enum: Object.values(VERIFICATION_STATUS),
            default: VERIFICATION_STATUS.PENDING,
        },
    },
    {
        timestamps: true,
    }
);

const FarmerProfile = mongoose.model(
    "FarmerProfile",
    farmerProfileSchema
);

export default FarmerProfile;