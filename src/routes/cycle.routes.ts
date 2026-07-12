import { Router } from "express";
import { CycleController } from "../controllers/cycle.controller";

const router = Router();

const cycleController = new CycleController();

router.post("/", (req, res) => cycleController.create(req, res));
router.get("/", (req, res) => cycleController.findAll(req, res));
router.get("/:id", (req, res) => cycleController.findById(req, res));
router.put("/:id", (req, res) => cycleController.update(req, res));
router.delete("/:id", (req, res) => cycleController.delete(req, res));

export default router;