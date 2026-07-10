import { Router } from "express";
import { HealthController } from "../controllers/health.controller";
import userRoutes from "./user.routes";

const router = Router();

const healthController = new HealthController();

router.get("/", (req, res) => healthController.index(req, res));

router.use("/users", userRoutes);

export default router;