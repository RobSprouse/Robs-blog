import express from 'express';
import { homeRoutes } from './homeRoutes.js';
// import apiRoutes from './api/index.js';

const router = express.Router();

router.use('/', homeRoutes);

export default router;