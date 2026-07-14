import { Router } from "express";
import { SymptomController } from "../controllers/symptom.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const symptomController = new SymptomController();

router.use(authMiddleware);

/**
 * @swagger
 * /symptoms:
 *   post:
 *     summary: Create a new symptom
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
 *                 example: Pain during first days
 *     responses:
 *       201:
 *         description: Symptom created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", (req, res, next) =>
  symptomController.create(req, res, next)
);

/**
 * @swagger
 * /symptoms:
 *   get:
 *     summary: Get all symptoms
 *     tags:
 *       - Symptoms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Symptoms found
 *       401:
 *         description: Unauthorized
 */
router.get("/", (req, res, next) =>
  symptomController.findAll(req, res, next)
);

/**
 * @swagger
 * /symptoms/{id}:
 *   get:
 *     summary: Get symptom by id
 *     tags:
 *       - Symptoms
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
 *         description: Symptom found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Symptom not found
 */
router.get("/:id", (req, res, next) =>
  symptomController.findById(req, res, next)
);

/**
 * @swagger
 * /symptoms/{id}:
 *   put:
 *     summary: Update a symptom
 *     tags:
 *       - Symptoms
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
 *               name:
 *                 type: string
 *                 example: Headache
 *               intensity:
 *                 type: integer
 *                 example: 5
 *               notes:
 *                 type: string
 *                 example: Improved today
 *     responses:
 *       200:
 *         description: Symptom updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Symptom not found
 */
router.put("/:id", (req, res, next) =>
  symptomController.update(req, res, next)
);

/**
 * @swagger
 * /symptoms/{id}:
 *   delete:
 *     summary: Delete a symptom
 *     tags:
 *       - Symptoms
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
 *         description: Symptom deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Symptom not found
 */
router.delete("/:id", (req, res, next) =>
  symptomController.delete(req, res, next)
);

export default router;