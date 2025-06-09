import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routers/auth";
import corsMiddleware from "./middlewares/cors";
import { errorHandler } from "./middlewares/errorHandler";
import { limiter } from "./middlewares/rateLimit";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(corsMiddleware);
app.use(limiter);

app.use("/api/v1", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
