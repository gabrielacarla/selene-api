import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  create(req: Request, res: Response) {
    const { name, email } = req.body;

    const user = userService.createUser(name, email);

    return res.status(201).json(user);
  }
}