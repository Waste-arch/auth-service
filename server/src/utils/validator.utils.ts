import { ZodType } from 'zod';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';

const validate = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            // @ts-ignore
            next(ApiError.BadRequest('Validation error', error));
        }
    };
};

export default validate;
