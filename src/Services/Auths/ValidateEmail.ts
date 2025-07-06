import { prismaClient } from "../../database/prisma";
import { Forgot } from "../../Schemas/Auths";
import { UserPayload } from "../../Utils/Jwt";

export async function validateEmail(forgot: Forgot) {
  const user = await prismaClient.user.findUnique({
    where: { email: forgot.email },
  });
  if (!user) throw new Error("Email not registered");

  const payload: UserPayload = { id: user.id, role: user.role };

  return payload;
}
