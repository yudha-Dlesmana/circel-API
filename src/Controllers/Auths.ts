import { Request, Response, NextFunction } from "express";
import {
  loginSchema,
  forgotSchema,
  registerSchema,
  resetPasswordSchema,
} from "../Schemas/Auths";
import { createResponse, Status } from "../Utils/Response";
import { sendResetPasswordLink } from "../Utils/Mailer";
import { signToken, UserPayload, verifyToken } from "../Utils/Jwt";
import { createUser } from "../Services/Auths/RegisterUser";
import { validateCredential } from "../Services/Auths/ValidateCredential";
import { validateEmail } from "../Services/Auths/ValidateEmail";
import { changePassword } from "../Services/Auths/ChangePassword";

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
    res.statusMessage = "CREATED";
    res.json(
      createResponse(
        Status.success,
        201,
        "Your account has been created successfully.",
        {
          username: user.username,
          name: user.name,
          token,
        }
      )
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
    res.statusMessage = "SUCCESS";
    res.json(
      createResponse(Status.success, 200, "You have logged in successfully.", {
        token,
      })
    );
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

    forgotSchema.parse(req.body);

    const payload = await validateEmail(req.body);

    const token = signToken(payload);

    const resetLink = `http://localhost:5173/reset/${token}`;

    await sendResetPasswordLink(
      email,
      "reset password link",
      `Click this link to reset your password: ${resetLink}`
    );

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createResponse(
        Status.success,
        200,
        `Reset password email has been sent.`,
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
      createResponse(
        Status.success,
        200,
        `Your password has been reset successfully.`,
        {}
      )
    );
  } catch (error) {
    next(error);
  }
}
