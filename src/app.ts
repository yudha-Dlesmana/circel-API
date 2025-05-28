import express from "express"
import authRouter from "./routers/auth"
import userRouter from "./routers/user"
import dotenv from "dotenv"

import path from "path"
import corsMiddleware from "./middlewares/cors"
import { errorHandler } from "./middlewares/errorHandler"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(corsMiddleware);

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/v1", authRouter)
app.use("/api/v1", userRouter)

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})