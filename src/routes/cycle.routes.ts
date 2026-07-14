import { Router } from "express";
import { CycleController } from "../controllers/cycle.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const cycleController = new CycleController();

router.use(authMiddleware);

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
 *     description: Creates a new menstrual cycle for the authenticated user.
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
 *                 example: "2026-07-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-06"
 *               cycleLength:
 *                 type: integer
 *                 example: 28
 *               notes:
 *                 type: string
 *                 example: Mild cramps during the first days.
 *     responses:
 *       201:
 *         description: Cycle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", (req, res, next) =>
  cycleController.create(req, res, next)
);

/**
 * @swagger
 * /cycles:
 *   get:
 *     summary: Get all menstrual cycles
 *     description: Returns all cycles belonging to the authenticated user.
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cycles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cycle'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", (req, res, next) =>
  cycleController.findAll(req, res, next)
);

/**
 * @swagger
 * /cycles/{id}:
 *   get:
 *     summary: Get cycle by ID
 *     description: Returns a menstrual cycle by its ID.
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cycle ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Cycle found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cycle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", (req, res, next) =>
  cycleController.findById(req, res, next)
);

/**
 * @swagger
 * /cycles/{id}:
 *   put:
 *     summary: Update a menstrual cycle
 *     description: Updates an existing menstrual cycle.
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cycle ID
 *         schema:
 *           type: integer
 *           example: 1
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
 *                 example: "2026-07-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-06"
 *               cycleLength:
 *                 type: integer
 *                 example: 28
 *               notes:
 *                 type: string
 *                 example: Updated notes.
 *     responses:
 *       200:
 *         description: Cycle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cycle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", (req, res, next) =>
  cycleController.update(req, res, next)
);

/**
 * @swagger
 * /cycles/{id}:
 *   delete:
 *     summary: Delete a menstrual cycle
 *     description: Deletes a menstrual cycle by its ID.
 *     tags:
 *       - Cycles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cycle ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Cycle deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cycle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", (req, res, next) =>
  cycleController.delete(req, res, next)
);

export default router;