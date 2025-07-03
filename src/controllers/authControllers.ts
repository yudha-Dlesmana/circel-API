import { Request, Response, NextFunction } from "express";
import {
  loginSchema,
  fotgotSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schme/authSchema";
import { createReponse, Status } from "../utils/response";
import { sendResetPasswordLink } from "../utils/mailer";
import { signToken, UserPayload, verifyToken } from "../utils/jwt";
import { createUser } from "../services/auth/RegisterUser";
import { validateCredential } from "../services/auth/ValidateCredential";
import { validateEmail } from "../services/auth/ValidateEmail";
import { changePassword } from "../services/auth/ChangePassword";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    registerSchema.parse(req.body);

    const user = await createUser(req.body);

    const token = signToken({ id: user.id, role: user.role } as UserPayload);

    res.statusCode = 201;
    res.statusMessage = "SUCCESS";
    res.json(
      createReponse(Status.success, 201, "Registration successful", {
        username: user.username,
        name: user.name,
        token,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    loginSchema.parse(req.body);

    const payload = await validateCredential(req.body);

    const token = signToken(payload);

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(createReponse(Status.success, 200, "success login", { token }));
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

    fotgotSchema.parse(req.body);

    const payload = await validateEmail(req.body);

    const token = signToken(payload);

    const resetLink = `http://localhost:8000/api/v1/reset-password/${token}`;

    await sendResetPasswordLink(
      email,
      "reset password link",
      `Click this link to reset your password: ${resetLink}`
    );

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createReponse(
        Status.success,
        200,
        `We have sent a password reset link to ${email}. Please check your email.`,
        { resetLink }
      )
    );
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.params;

    resetPasswordSchema.parse(req.body);

    const { id } = verifyToken(token as string);

    const { username } = await changePassword(id, req.body);

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createReponse(
        Status.success,
        200,
        `${username} your password has been reset`,
        {}
      )
    );
  } catch (error) {
    next(error);
  }
}
