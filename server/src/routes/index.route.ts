import { Router } from 'express';
import authRouter from './auth.route';

const router = Router();

[authRouter].forEach((route) => {
    router.use('/api/v1', route);
});

export default router;
