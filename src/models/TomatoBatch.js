import mongoose from "mongoose";

const tomatoBatchSchema = new mongoose.Schema(
    {
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FarmerProfile",
            required: true,
        },

        batchNumber: {
            type: String,
            required: true,
            unique: true,
        },

        tomatoVariety: {
            type: String,
            required: true,
            trim: true,
        },

        grade: {
            type: String,
            enum: ["A", "B", "C"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        unit: {
            type: String,
            enum: ["kg", "crate", "basket"],
            default: "kg",
        },

        harvestDate: {
            type: Date,
            required: true,
        },

        expiryDate: {
            type: Date,
            required: true,
        },

        farmLocation: {
            type: String,
            required: true,
        },
        image: {
            url: String,
            publicId: String,
        },
        status: {
            type: String,
            enum: [
                "available",
                "reserved",
                "sold",
                "expired"
            ],
            default: "available",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "TomatoBatch",
    tomatoBatchSchema
);