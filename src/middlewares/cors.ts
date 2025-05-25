import cors from "cors";

const corsMiddleware = cors({
  origin: "http://localhost:5173", // url yang diizinkan mengakses
  credentials: true
})
export default corsMiddleware