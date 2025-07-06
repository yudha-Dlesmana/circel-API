import { hash } from "bcrypt";
import { prismaClient } from "../../database/prisma";
import type { ResetPassword } from "../../Schemas/Auths";

export async function changePassword(id: string, resetPassword: ResetPassword) {
  const hashPassword = await hash(resetPassword.password, 10);

  await prismaClient.user.update({
    where: { id },
    data: {
      password: hashPassword,
    },
  });
}
