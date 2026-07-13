import { Router } from "express";
import { SymptomController } from "../controllers/symptom.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const symptomController = new SymptomController();

router.use(authMiddleware);

router.post("/", (req, res, next) => symptomController.create(req, res, next));
router.get("/", (req, res, next) => symptomController.findAll(req, res, next));
router.get("/:id", (req, res, next) => symptomController.findById(req, res, next));
router.put("/:id", (req, res, next) => symptomController.update(req, res, next));
router.delete("/:id", (req, res, next) => symptomController.delete(req, res, next));

export default router;