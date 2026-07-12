import { Router } from "express";
import { HealthController } from "../controllers/health.controller";
import userRoutes from "./user.routes";
import cycleRoutes from "./cycle.routes";
import symptomRoutes from "./symptom.routes";

const router = Router();

const healthController = new HealthController();

router.get("/", (req, res) => healthController.index(req, res));

router.use("/users", userRoutes);
router.use("/cycles", cycleRoutes);
router.use("/symptoms", symptomRoutes);

export default router;