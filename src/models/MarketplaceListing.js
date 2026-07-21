import mongoose from "mongoose";

const marketplaceListingSchema = new mongoose.Schema(
    {
        tomatoBatch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TomatoBatch",
            required: true,
            unique: true,
        },

        pricePerUnit: {
            type: Number,
            required: true,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "MarketplaceListing",
    marketplaceListingSchema
);