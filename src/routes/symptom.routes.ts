import { Router } from "express";
import { SymptomController } from "../controllers/symptom.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const symptomController = new SymptomController();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Symptoms
 *   description: Symptom management
 */

/**
 * @swagger
 * /symptoms:
 *   post:
 *     summary: Create a new symptom
 *     description: Creates a new symptom associated with one of the authenticated user's menstrual cycles.
 *     tags:
 *       - Symptoms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cycleId
 *               - name
 *             properties:
 *               cycleId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Cramps
 *               intensity:
 *                 type: integer
 *                 example: 7
 *               notes:
 *                 type: string
 *                 example: Pain during the first days of the cycle.
 *     responses:
 *       201:
 *         description: Symptom created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Symptom'
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
  symptomController.create(req, res, next)
);

/**
 * @swagger
 * /symptoms:
 *   get:
 *     summary: Get all symptoms
 *     description: Returns all symptoms belonging to the authenticated user.
 *     tags:
 *       - Symptoms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of symptoms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Symptom'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", (req, res, next) =>
  symptomController.findAll(req, res, next)
);

/**
 * @swagger
 * /symptoms/{id}:
 *   get:
 *     summary: Get symptom by ID
 *     description: Returns a symptom by its ID.
 *     tags:
 *       - Symptoms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Symptom ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Symptom found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Symptom'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Symptom not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", (req, res, next) =>
  symptomController.findById(req, res, next)
);

/**
 * @swagger
 * /symptoms/{id}:
 *   put:
 *     summary: Update a symptom
 *     description: Updates an existing symptom.
 *     tags:
 *       - Symptoms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Symptom ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Headache
 *               intensity:
 *                 type: integer
 *                 example: 5
 *               notes:
 *                 type: string
 *                 example: Pain improved after medication.
 *     responses:
 *       200:
 *         description: Symptom updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Symptom'
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
 *         description: Symptom not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", (req, res, next) =>
  symptomController.update(req, res, next)
);

/**
 * @swagger
 * /symptoms/{id}:
 *   delete:
 *     summary: Delete a symptom
 *     description: Deletes a symptom by its ID.
 *     tags:
 *       - Symptoms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Symptom ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Symptom deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Symptom not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", (req, res, next) =>
  symptomController.delete(req, res, next)
);

export default router;