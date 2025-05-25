import { Request, Response } from "express";
import { forgotServices, loginServices, registerServices, resetPasswordServices } from "../services/auth";
import { fotgotSchema, loginSchema, registerSchema, resetPasswordSchema } from "../validations/auth";
import { sendEmailService } from "../services/mailer";
import { verifyToken } from "../utils/jwt";


export async function registerUser(req: Request, res: Response){
  try{
    const {error} = registerSchema.validate(req.body)
    if (error) throw new Error(error.message)
    
    const user = await registerServices(req.body);
    
    res.status(200).json({message: "User Registered", user})

  } catch(e: any){
    if(e.code === "P2002"){
      res.status(409).json({message: "This email is already registered."})
    } else if (e instanceof Error){
      res.status(400).json({message: e.message})
    }
    res.status(500).json({code: e.code})
  }
} // aman

export async function loginUser(req: Request, res: Response){ 
  try{

    const {error} = loginSchema.validate(req.body)
    if(error) throw new Error (error.message)

    const token = await loginServices(req.body)
    
    res.status(200).json({message:"Access Accepted", token})

  }catch(e){
    if(e instanceof Error){
      res.status(400).json({message: e.message})
    }
    res.status(500).json({message: "Internal Server Error"})
  }
} // aman

export async function forgotPassword(req: Request, res: Response){
  try{
    const {email} = req.body;

    const {error} = fotgotSchema.validate(req.body);
    if(error) throw new Error (error.message)

    const token = await forgotServices(req.body)
    const resetLink = `http://localhost:5173/reset?token=${token.token}`
    

    await sendEmailService(email, 
      "reset password link", `Click this link to reset your password: ${resetLink}` )
    
    res.status(200).json({message: `your link reset password ${resetLink}`})

  }catch(e) {
    if (e instanceof Error){
      res.status(400).json({message: `Error: ${e.message}`})
    }
    res.status(500).json({message: "Internal Server Error"})
  }
} // aman

export async function resetPassword(req: Request, res: Response){
  try{
    const {token} = req.query

    const {error} = resetPasswordSchema.validate(req.body)
    if(error) throw new Error (error.message)

    const { id } = verifyToken(token as string)

    const {username} = await resetPasswordServices(id, req.body)

    res.status(200).json({message: `${username}, your password has been reset`})

  } catch(error){
    if(error instanceof Error){
      res.status(400).json({message: error.message})
    }
    res.status(500).json({message: 'Internal Server Error'})
  }
} // aman

