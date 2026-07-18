export const verificationEmailTemplate = (firstName, otp) => {
    return `
        <h2>Hello ${firstName},</h2>

        <p>Welcome to FreshAm.</p>

        <p>Your email verification code is:</p>

        <h1>${otp}</h1>

        <p>This code expires in 10 minutes.</p>

        <p>If you didn't create this account, you can ignore this email.</p>
    `;
};


export const passwordResetEmailTemplate = (
    firstName,
    otp
) => {
    return `
        <h2>Password Reset</h2>

        <p>Hello ${firstName},</p>

        <p>Use the OTP below to reset your password.</p>

        <h1>${otp}</h1>

        <p>This OTP expires in 10 minutes.</p>

        <p>If you did not request a password reset, please ignore this email.</p>
    `;
};