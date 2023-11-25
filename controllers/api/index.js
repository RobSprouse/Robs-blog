import express from "express";
import userRoutes from "./userRoutes.js";
// import { dashboardRoutes } from "./dashboardRoutes.js";

const router = express.Router({mergeParams: true});

router.use("/users", userRoutes);
// router.use("/dashboard", dashboardRoutes);

export default router;
