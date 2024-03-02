import { NextFunction, Request, Response } from 'express';
import {
    CreateUserType,
    LoginUserType,
    ChangePasswordType,
} from '../schemas/auth.schema';
import authService from '../services/auth.service';

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password }: CreateUserType = req.body;

            const { accessToken, createdUser } = await authService.createUser({
                username,
                email,
                password,
            });

            return res.json({
                success: true,
                message: 'Registration successful',
                username: createdUser.username,
                email: createdUser.email,
                accessToken,
            });
        } catch (error) {
            return next(error);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: LoginUserType = req.body;

            const { accessToken, user } = await authService.loginUser({
                email,
                password,
            });

            return res.json({
                success: true,
                message: 'You have successfully logged in. Welcome back',
                username: user.username,
                email: user.email,
                accessToken,
            });
        } catch (error) {
            return next(error);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({
                message:
                    'You have been successfully logged out. See you next time',
                success: true,
            });
        } catch (error) {
            return next(error);
        }
    }
    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, newPassword }: ChangePasswordType =
                req.body;

            const { changedUser, accessToken } =
                await authService.changePassword({
                    email,
                    password,
                    newPassword,
                });

            return res.json({
                message:
                    'Your password has been successfully changed. You will need to log in with your new password.',
                success: true,
                username: changedUser?.username,
                email: changedUser?.email,
                accessToken,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default new AuthController();
