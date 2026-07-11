import { prisma } from "../lib/prisma";

export class UserService {
  async createUser(name: string, email: string) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}