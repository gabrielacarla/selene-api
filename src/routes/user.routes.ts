import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const userController = new UserController();

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Gabriela
 *               email: gabriela@email.com
 *               createdAt: "2026-07-12T21:32:01.301Z"
 *               updatedAt: "2026-07-12T21:32:01.301Z"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */

router.use(authMiddleware);

router.get("/", (req, res, next) =>
  userController.findAll(req, res, next)
);

router.get("/profile", (req, res, next) =>
  userController.profile(req, res, next)
);

router.get("/:id", (req, res, next) =>
  userController.findById(req, res, next)
);

router.put("/:id", (req, res, next) =>
  userController.update(req, res, next)
);

router.delete("/:id", (req, res, next) =>
  userController.delete(req, res, next)
);

export default router;