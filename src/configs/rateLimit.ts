import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// export const limiter = rateLimit({
//   windowMs: 30 * 1000,
//   max: 50,
//   handler: (req: Request, res: Response) => {
//     res.status(429).json({
//       status: 429,
//       message: "Too Many Requests. Please try again later",
//     });
//   },
// });

export function rateLimiter(windowMs: number, max: number) {
  return rateLimit({
    windowMs,
    max,
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        status: 429,
        error: "RATE_LIMIT_EXCEEDED",
        message: `Too many requests. Please wait ${
          windowMs / 1000
        } seconds before retrying`,
        retryAfter: windowMs / 1000,
      });
    },
  });
}
