import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  role: string;
}

const JWT_SECRET = process.env.SUPABASE_SUPABASE_JWT_SECRET as string;

export function signToken(payload: UserPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as UserPayload;
}
