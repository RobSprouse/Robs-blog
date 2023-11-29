import express from "express";
import userRoutes from "./userRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import blogRoutes from "./blogRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/blogs", blogRoutes);

export default router;
