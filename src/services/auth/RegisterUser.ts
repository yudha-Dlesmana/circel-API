import { hash } from "bcrypt";
import { prismaClient } from "../../prisma/client";

interface Register {
  email: string;
  password: string;
}

export async function createUser(register: Register) {
  const username = `@${register.email.split("@")[0]}`;

  const registerUser = await prismaClient.user.create({
    data: {
      email: register.email,
      username,
      password: await hash(register.password, 10),
    },
  });

  return { username: registerUser.username, email: registerUser.email };
}
