import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./Routers/Auths";
import profileRouter from "./Routers/Profiles";
import userRouter from "./Routers/Users";
import followRouter from "./Routers/Follows";
import tweetRouter from "./Routers/Tweets";
import likeRouter from "./Routers/Likes";
import commentRouter from "./Routers/Comments";
import { errorHandler } from "./Middlewares/ErrorHandler";
import corsMiddleware from "./Configs/Cors";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", followRouter);
app.use("/api/v1", tweetRouter);
app.use("/api/v1", likeRouter);
app.use("/api/v1", commentRouter);
app.get("/", (req, res) => {
  res.send("PageNotFound");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
