import nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password',
    text: `You requested for a password reset. Click the link below to reset your password:\n\n${process.env.FRONTEND_URL}/reset-password?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
};