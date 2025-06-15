import { hash } from "bcrypt";
import { prismaClient } from "../../database/prisma";

interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export async function changePassword(id: string, resetPassword: ResetPassword) {
  const hashPassword = await hash(resetPassword.password, 10);

  const reset = await prismaClient.user.update({
    where: { id },
    data: {
      password: hashPassword,
    },
  });

  return { username: reset.username };
}
