import { hash } from "bcrypt";
import { prismaClient } from "../../database/prisma";
import { Payload } from "../user/registerUserProfile";
import { UserPayload } from "../../utils/jwt";

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

  const payload: UserPayload = { id: registerUser.id, role: registerUser.role };

  return payload;
}
