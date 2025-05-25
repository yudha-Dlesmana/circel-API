import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export interface UserPayload{
  id: string;
  role: string;
}

export function signToken(payload: UserPayload){
  return jwt.sign(payload, JWT_SECRET, {expiresIn: "1m"})
}

export function verifyToken(token: string,) {

  return jwt.verify(token, JWT_SECRET) as UserPayload
}