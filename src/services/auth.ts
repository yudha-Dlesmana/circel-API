import { compare, hash } from "bcrypt";
import { connection } from "../connections/prismaClient";
import { signToken, UserPayload } from "../utils/jwt";

interface Register{
  fullname: string;
  email: string;
  password: string;
}

interface Login{
  email: string;
  password: string;
}

interface Forgot{
  email: string
}

interface ResetPassword{
  password: string,
  confirmPassword: string
}

export async function registerServices(register: Register){

  const username = `@${register.email.split("@")[0]}`;

  const registerUser = await connection.user.create({
    data: {
        fullname: register.fullname,
        username,
        email: register.email,
        password: await hash(register.password, 10),
      }
    })

  return {username: registerUser.username, email: registerUser.email }
}

export async function loginServices(login: Login){

  const user = await connection.user.findUnique({
    where: {email: login.email}
  })

  if (!user) throw new Error ("Wrong email or username")
    
  const isMatch = await compare(login.password, user.password);
  if (!isMatch) throw new Error("Wrong password")

  const payload: UserPayload = {id:user.id, role: user.role}
  
  const token = signToken(payload)

  return token
}

export async function forgotServices(forgot: Forgot){
  const user = await connection.user.findUnique({
    where: {email: forgot.email}
  })
  if (!user) throw new Error ("Email is not registered")

  const payload: UserPayload = {id:user.id, role:user.role}

  const token = signToken(payload)

  return {token}
}

export async function resetPasswordServices( id: string, resetPassword: ResetPassword){
  if (resetPassword.password != resetPassword.confirmPassword) throw new Error ("miss match password")

  const hashPassword = await hash(resetPassword.password, 10)

  const reset = await connection.user.update({
    where: {id},
    data: {
      password: hashPassword
    }
  })

  return { username: reset.username}
}

