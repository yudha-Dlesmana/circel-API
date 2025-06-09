import { Request, Response, NextFunction } from "express";
import {
  authSchema,
  fotgotSchema,
  resetPasswordSchema,
} from "../validation/authValidation";
import { sendResetPasswordLink } from "../utils/mailer";
import { signToken, verifyToken } from "../utils/jwt";
import { createUser } from "../services/auth/createUser";
import { validateCredential } from "../services/auth/validateCredential";
import { validateEmail } from "../services/auth/validateEmail";
import { changePassword } from "../services/auth/changePassword";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await authSchema.validateAsync(req.body);

    const user = await createUser(req.body);

    res.status(200).json({ message: "User Registered", user });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await authSchema.validateAsync(req.body);

    const payload = await validateCredential(req.body);

    const token = signToken(payload);

    res.status(200).json({ message: "Access Accepted", token });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    await fotgotSchema.validateAsync(req.body);

    const payload = await validateEmail(req.body);

    const token = signToken(payload);

    const resetLink = `http://localhost:8000/api/v1/reset-password/${token}`;

    await sendResetPasswordLink(
      email,
      "reset password link",
      `Click this link to reset your password: ${resetLink}`
    );

    res.status(200).json({
      message: `We have sent a password reset link to ${email}. Please check your email.`,
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token } = req.params;

    await resetPasswordSchema.validateAsync(req.body);

    const { id } = verifyToken(token as string);

    const { username } = await changePassword(id, req.body);

    res
      .status(200)
      .json({ message: `${username}, your password has been reset` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}
