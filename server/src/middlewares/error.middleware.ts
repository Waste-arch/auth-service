import ApiError from '../exceptions/api-error';
import { NextFunction, Request, Response } from 'express';

export default (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({
            message: error.message,
            errors: error.errors,
            success: false,
        });
    }
    return res
        .status(500)
        .json({ message: 'Invalid server error', success: false });
};
