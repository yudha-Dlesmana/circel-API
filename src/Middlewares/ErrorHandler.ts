import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import { ZodError } from "zod";
import { createResponse, Status } from "../Utils/Response";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof PrismaClientKnownRequestError) {
    res.statusCode = 400;
    res.statusMessage = "Bad Request";
    res.json(
      createResponse(Status.error, 400, err.message, {
        // code: err.code,
        // meta: err.meta,
        // message: err.message,
        // client: err.clientVersion,
        // batchRequest: err.batchRequestIdx,
        // stack: err.stack,
      })
    );
    return;
  }
  if (err instanceof MulterError) {
    res.statusCode = 400;
    res.statusMessage = "Bad Request";
    res.json(
      createResponse(Status.error, 400, err.message, {
        // code: err.code,
        // field: err.field,
        // message: err.message,
        // name: err.name, MulterError
        // stack: err.stack
      })
    );
    return;
  }
  if (err instanceof ZodError) {
    res.statusCode = 400;
    res.statusMessage = "Bad Request";
    res.json(
      createResponse(Status.error, 400, err.errors[0].message, {
        path: err.errors[0].path,
      })
    );
    return;
  }
  if (err instanceof Error) {
    res.statusCode = 400;
    res.statusMessage = "Bad Request";
    res.json(
      createResponse(Status.error, 400, err.name, {
        message: err.message,
      })
    );
    return;
  }
  res.status(500).json({ message: "UnknownError" });
}
