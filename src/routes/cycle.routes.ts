import { Router } from "express";
import { CycleController } from "../controllers/cycle.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const cycleController = new CycleController();

/**
 * @swagger
 * tags:
 *   name: Cycles
 *   description: Menstrual cycle management
 */

/**
 * @swagger
 * /cycles:
 *   post:
 *     summary: Create a new menstrual cycle
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-06
 *               cycleLength:
 *                 type: integer
 *                 example: 28
 *               notes:
 *                 type: string
 *                 example: Mild cramps
 *     responses:
 *       201:
 *         description: Cycle created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.use(authMiddleware);

router.post("/", (req, res, next) =>
  cycleController.create(req, res, next)
);

/**
 * @swagger
 * /cycles:
 *   get:
 *     summary: Get all user cycles
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cycles
 *       401:
 *         description: Unauthorized
 */
router.get("/", (req, res, next) =>
  cycleController.findAll(req, res, next)
);

/**
 * @swagger
 * /cycles/{id}:
 *   get:
 *     summary: Get cycle by id
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Cycle found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cycle not found
 */
router.get("/:id", (req, res, next) =>
  cycleController.findById(req, res, next)
);

/**
 * @swagger
 * /cycles/{id}:
 *   put:
 *     summary: Update a menstrual cycle
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               cycleLength:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cycle updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cycle not found
 */
router.put("/:id", (req, res, next) =>
  cycleController.update(req, res, next)
);

/**
 * @swagger
 * /cycles/{id}:
 *   delete:
 *     summary: Delete a menstrual cycle
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Cycle deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cycle not found
 */
router.delete("/:id", (req, res, next) =>
  cycleController.delete(req, res, next)
);

export default router;