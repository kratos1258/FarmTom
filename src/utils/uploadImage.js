import streamifier from "streamifier";
import cloudinary from "./cloudinary.js";

const uploadImage = (file) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "fresham/tomato-batches",
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);
    });
};

export default uploadImage;