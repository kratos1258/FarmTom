import crypto from "crypto";

const generateBatchNumber = () => {
    const random = crypto.randomBytes(3).toString("hex").toUpperCase();

    const date = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

    return `TB-${date}-${random}`;
};

export default generateBatchNumber;