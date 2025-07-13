import cors from "cors";

const corsMiddleware = cors({
  origin: ["http://localhost:5173", "https://circle-share.vercel.app"],
  credentials: true,
});
export default corsMiddleware;
