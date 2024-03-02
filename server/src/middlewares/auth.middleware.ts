import ApiError from '../exceptions/api-error';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.utils';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return next(ApiError.Unauthorized('Authorization token required'));
        }
        const token: string = authorization.split(' ')[1];

        verifyToken(token);

        next();
    } catch (error) {
        //@ts-ignore
        return next(ApiError.BadRequest(error.message, error.errors));
    }
};
