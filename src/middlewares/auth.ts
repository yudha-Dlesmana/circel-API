import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authentication(req: Request, res: Response, next: NextFunction){
  try{
    const authHeader = req.headers.authorization
    if (!authHeader) throw new Error ("Unauthenticated")

    const token = authHeader.split(" ")[1]
    if (!token) throw new Error ("Unauthenticated")

    const decode = verifyToken(token);
    (req as any).user = decode
    next()

  } catch(e: any){
    if (e instanceof Error){
      res.status(401).json({message: e.message})
      return
    }
    res.status(500).json({message: "Internal Server Error"})
  }
}

export function authorization(roles: string[]){

  return (req: Request, res: Response, next: NextFunction) => {
    const role= (req as any).user.role
    
    try{
      if(!roles.includes(role)) throw new Error ("Access Denied")
      next()

    }catch(e: any){

      if(e instanceof Error){
        res.status(403).json({message: e.message})
        return
      }
      res.status(500).json({message: "Internal server error"})
    }
  }
}