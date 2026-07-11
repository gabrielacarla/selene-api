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

  async updateUser(id: number, name: string, email: string) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
  }
}