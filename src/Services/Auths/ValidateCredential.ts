import { compare } from "bcrypt";
import { prismaClient } from "../../database/prisma";
import { UserPayload } from "../../Utils/Jwt";
import { Login } from "../../Schemas/Auths";

export async function validateCredential(login: Login) {
  const user = await prismaClient.user.findUnique({
    where: { email: login.email },
  });
  if (!user) throw new Error("InvalidCredentialsError");

  const isMatch = await compare(login.password, user.password);
  if (!isMatch) throw new Error("InvalidCredentialsError");

  const payload: UserPayload = { id: user.id, role: user.role };

  return payload;
}
