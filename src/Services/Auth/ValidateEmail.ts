import { prismaClient } from "../../database/prisma";
import { Forgot } from "../../Schema/AuthSchema";
import { UserPayload } from "../../Utils/Jwt";

export async function validateEmail(forgot: Forgot) {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: { email: forgot.email },
  });

  const payload: UserPayload = { id: user.id, role: user.role };

  return payload;
}
