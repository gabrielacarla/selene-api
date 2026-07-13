import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

const authController = new AuthController();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gabriela
 *               email:
 *                 type: string
 *                 example: gabriela@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: Gabriela
 *               email: gabriela@email.com
 *               createdAt: "2026-07-13T10:00:00.000Z"
 *               updatedAt: "2026-07-13T10:00:00.000Z"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/register", (req, res, next) =>
  authController.register(req, res, next)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: gabriela@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt_token_here"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", (req, res, next) =>
  authController.login(req, res, next)
);

export default router;