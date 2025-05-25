import express from "express"
import authRouter from "./routers/user"

import path from "path"
import corsMiddleware from "./middlewares/cors"

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(corsMiddleware);

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/v1", authRouter)


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})