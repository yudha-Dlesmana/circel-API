import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Joi.ValidationError) {
    res.status(400).json({ messsage: err.message });
    return;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        res.status(400).json({ Error: "UniqueConstraintViolation" });
        break;
      case "P2025":
        res.status(400).json({ Error: "InvalidCredentialsError" });
        break;
      default:
        res.status(400).json({ code: err.code, meta: err.meta });
        break;
    }
  }

  if (err instanceof Error) {
    res.status(400).json({ Error: err.message });
    return;
  }
  res.status(500).json({ message: "UnknownError" });
}
