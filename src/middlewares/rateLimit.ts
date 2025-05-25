import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 3,
  message: "Terlalu Banyak Request Coba Lagi Nanti"
})