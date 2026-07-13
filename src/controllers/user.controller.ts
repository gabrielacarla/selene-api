import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async findAll(req: Request, res: Response) {
    const users = await userService.getUsers();

    return res.json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.getUserById(Number(id));

    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await userService.updateUser(
      Number(id),
      name,
      email
    );

    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await userService.deleteUser(Number(id));

      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
  }
}