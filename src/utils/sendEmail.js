import nodemailer from "nodemailer";

const createTransporter = () => {
    const port = Number(process.env.EMAIL_PORT || 587);

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port,
        secure: port === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        //connectionTimeout: 8000,
        //greetingTimeout: 5000,
        //socketTimeout: 8000,
    });
};
const sendEmail = async ({ to, subject, html }) => {
    const transporter = createTransporter();

    try {

        await transporter.verify();

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });

        console.log(info);

        return info;

    } catch (error) {
        console.error("EMAIL ERROR");
        console.error(error);

        throw error;
    }
};


// check back to findout why timeout is an issue...
/*
const sendEmail = async ({ to, subject, html }) => {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email service is not configured.");
    }

    const transporter = createTransporter();
    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Email delivery timed out")), 10000);
    });

    return Promise.race([
        transporter.sendMail(mailOptions),
        timeoutPromise,
    ]);
};
*/

export default sendEmail;