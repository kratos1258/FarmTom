import mongoose from "mongoose";

const buyerProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        businessName: {
            type: String,
            required: true,
            trim: true,
        },

        businessType: {
            type: String,
            enum: [
                "individual",
                "restaurant",
                "retailer",
                "wholesaler",
                "supermarket",
                "processor",
                "exporter",
                "other",
            ],
            default: "individual",
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            required: true,
            trim: true,
            default: "Nigeria",
        },

        profileCompleted: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "BuyerProfile",
    buyerProfileSchema
);