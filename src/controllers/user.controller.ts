import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();

      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(Number(id));

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await userService.updateUser(
        Number(id),
        name,
        email
      );

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await userService.deleteUser(Number(id));

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}