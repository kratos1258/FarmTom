export const verificationEmailTemplate = (firstName, otp) => {
    return `
        <h2>Hello ${firstName},</h2>

        <p>Welcome to TomatoLink.</p>

        <p>Your email verification code is:</p>

        <h1>${otp}</h1>

        <p>This code expires in 10 minutes.</p>

        <p>If you didn't create this account, you can ignore this email.</p>
    `;
};