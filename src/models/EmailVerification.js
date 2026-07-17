import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        otp: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Automatically remove expired OTPs
emailVerificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const EmailVerification = mongoose.model(
    "EmailVerification",
    emailVerificationSchema
);

export default EmailVerification;