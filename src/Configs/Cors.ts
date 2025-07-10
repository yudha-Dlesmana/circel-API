import cors from "cors";

const corsMiddleware = cors({
  origin: ["http://localhost:5173", "https://circel-ui.vercel.app"],
  credentials: true,
});
export default corsMiddleware;
