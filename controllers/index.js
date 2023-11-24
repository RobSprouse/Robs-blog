import express from 'express';
import { homeRoutes } from './homeRoutes.js';
import { apiRoutes } from './api/index.js';

const router = express.Router();

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

export default router;