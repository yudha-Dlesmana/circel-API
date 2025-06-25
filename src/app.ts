import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routers/auth";
import profileRouter from "./routers/profile";
import userRouter from "./routers/user";
import followRouter from "./routers/follow";
import tweetRouter from "./routers/tweets";
import likeRouter from "./routers/likes";

import corsMiddleware from "./configs/cors";
import { limiter } from "./configs/rateLimit";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(corsMiddleware);
app.use(limiter);

app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", followRouter);
app.use("/api/v1", tweetRouter);
app.use("/api/v1", likeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
