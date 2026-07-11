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

  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}