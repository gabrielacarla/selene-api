import { Router } from "express";
import { SymptomController } from "../controllers/symptom.controller";

const router = Router();

const symptomController = new SymptomController();

router.post("/", (req, res) => symptomController.create(req, res));
router.get("/", (req, res) => symptomController.findAll(req, res));
router.get("/:id", (req, res) => symptomController.findById(req, res));
router.put("/:id", (req, res) => symptomController.update(req, res));
router.delete("/:id", (req, res) => symptomController.delete(req, res));

export default router;