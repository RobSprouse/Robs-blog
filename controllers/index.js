// COMMENT: importing required modules
import express from "express";
import homeRoutes from "./homeRoutes.js";
import apiRoutes from "./api/index.js";

// COMMENT: creating a router instance
const router = express.Router();

// COMMENT: defining the routes from the base URL
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// COMMENT: exporting router instance
export default router;
