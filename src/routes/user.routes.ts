import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const userController = new UserController();

router.use(authMiddleware);

router.get("/", (req, res, next) => userController.findAll(req, res, next));
router.get("/profile", (req, res, next) => userController.profile(req, res, next));
router.get("/:id", (req, res, next) => userController.findById(req, res, next));
router.put("/:id", (req, res, next) => userController.update(req, res, next));
router.delete("/:id", (req, res, next) => userController.delete(req, res, next));

export default router;