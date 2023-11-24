import express from "express";
import { userRoutes } from "./userRoutes.js";
// import { dashboardRoutes } from "./dashboardRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
// router.use("/dashboard", dashboardRoutes);

export { router as apiRoutes };
