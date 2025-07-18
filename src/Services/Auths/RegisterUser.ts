import { hash } from "bcrypt";
import { prismaClient } from "../../database/prisma";
import { Register } from "../../Schemas/Auths";

export async function createUser(register: Register) {
  const username = `@${register.email.split("@")[0]}`;

  const registerUser = await prismaClient.user.create({
    data: {
      email: register.email,
      username,
      name: register.name,
      password: await hash(register.password, 10),
    },
  });

  return registerUser;
}
