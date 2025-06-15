import { prismaClient } from "../../database/prisma";
import { UserPayload } from "../../utils/jwt";

interface Forgot {
  email: string;
}

export async function validateEmail(forgot: Forgot) {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: { email: forgot.email },
  });

  const payload: UserPayload = { id: user.id, role: user.role };

  return payload;
}
