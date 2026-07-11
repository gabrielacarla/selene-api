import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();
export class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const user = await userService.createUser(name, email);

    return res.status(201).json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await userService.getUsers();

    return res.json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.getUserById(Number(id));

    return res.json(user);
  }
}