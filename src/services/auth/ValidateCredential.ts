import { compare } from "bcrypt";
import { prismaClient } from "../../prisma/client";
import { signToken, UserPayload } from "../../utils/jwt";

interface Login {
  email: string;
  password: string;
}

export async function validateCredential(login: Login) {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: { email: login.email },
  });

  const isMatch = await compare(login.password, user.password);
  if (!isMatch) throw new Error("InvalidCredentialsError");

  const payload: UserPayload = { id: user.id, role: user.role };

  return payload;
}
