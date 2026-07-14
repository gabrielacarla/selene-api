import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import cycleRoutes from "./cycle.routes";
import symptomRoutes from "./symptom.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/cycles", cycleRoutes);
router.use("/symptoms", symptomRoutes);

export default router;