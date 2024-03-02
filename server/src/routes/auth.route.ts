import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authController from '../controllers/auth.controller';
import validate from '../utils/validator.utils';
import { CreateUserSchema, LoginUserSchema } from '../schemas/auth.schema';
import authMiddleware from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post(
    '/register',
    validate(CreateUserSchema),
    authController.register,
);
authRouter.post('/login', validate(LoginUserSchema), authController.login);
authRouter.post('/logout', authMiddleware, AuthController.logout);
authRouter.patch('/password', AuthController.changePassword);

export default authRouter;
