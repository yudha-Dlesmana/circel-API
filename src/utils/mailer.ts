import nodemailer from "nodemailer";

export async function sendResetPasswordLink(
  to: string,
  subject: string,
  text: string
) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const mailOption = {
    from: `Circle ${user}`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOption);
    return info;
  } catch (e) {
    throw new Error("Failed");
  }
}
