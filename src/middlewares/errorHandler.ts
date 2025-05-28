
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express"; 
import Joi from "joi";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
  if(err instanceof Joi.ValidationError){
    res.status(400).json({messsage: err.details[0].message});
    return
  }

  if(err instanceof PrismaClientKnownRequestError){
    res.status(400).json({message: err.message})
    return
  }

  if(err instanceof Error){
    res.status(400).json({message: err.message});
    return
  }
  res.status(500).json({message: "internal server error"})

}