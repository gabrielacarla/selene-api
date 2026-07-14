import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import cycleRoutes from "./cycle.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/cycles", cycleRoutes);

export default router;