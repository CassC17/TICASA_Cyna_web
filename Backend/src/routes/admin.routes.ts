import { Router } from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { getDashboardStats } from '../controllers/admin.controller';

const router = Router();

router.get('/dashboard', authenticate, authorizeAdmin, getDashboardStats);

export default router;
