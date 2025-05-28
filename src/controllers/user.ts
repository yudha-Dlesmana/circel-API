import { getUserService } from "../services/user";
import { NextFunction, Request, Response } from "express";

export async function getUserController(req: Request, res: Response, next: NextFunction){
  try{
    const user = await getUserService((req as any).user.id)
    res.status(200).json({message: "user",user})
  } catch (e){
    next()
  }



}