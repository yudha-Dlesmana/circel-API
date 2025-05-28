import { connection } from "../connections/prismaClient"
import { verifyToken } from "../utils/jwt"

export async function getUserService(id:string){
  
  const user = await connection.user.findUnique({
    where: {id}
  })

  return {user}
}