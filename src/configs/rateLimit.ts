import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 10,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      status: 429,
      message: "Too Many Requests. Please try again later",
    });
  },
});
