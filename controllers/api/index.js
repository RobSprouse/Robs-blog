// COMMENT: importing required modules
import express from "express";
import userRoutes from "./userRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import blogRoutes from "./blogRoutes.js";

// COMMENT: Creating a new router instance
const router = express.Router();

// COMMENT: defining the api routes
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/blogs", blogRoutes);

// COMMENT: exporting router instance
export default router;
