import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./Routers/Auth";
import profileRouter from "./Routers/Profile";
import userRouter from "./Routers/User";
import followRouter from "./Routers/Follow";
import tweetRouter from "./Routers/Tweet";
import { errorHandler } from "./Middlewares/ErrorHandler";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", followRouter);
app.use("/api/v1", tweetRouter);
// app.use("/api/v1", likeRouter);
// app.use("/api/v1", commentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
