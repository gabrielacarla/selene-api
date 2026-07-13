import { Router } from "express";
import { CycleController } from "../controllers/cycle.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const cycleController = new CycleController();

router.use(authMiddleware);

router.post("/", (req, res, next) => cycleController.create(req, res, next));
router.get("/", (req, res, next) => cycleController.findAll(req, res, next));
router.get("/:id", (req, res, next) => cycleController.findById(req, res, next));
router.put("/:id", (req, res, next) => cycleController.update(req, res, next));
router.delete("/:id", (req, res, next) => cycleController.delete(req, res, next));

export default router;