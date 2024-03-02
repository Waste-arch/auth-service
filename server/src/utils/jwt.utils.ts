import jwt, { JwtPayload } from 'jsonwebtoken';
import config from './config';
import ApiError from '../exceptions/api-error';

export const generateToken = (userId: string | number): string => {
    return jwt.sign({ userId }, config.secret_key, {
        expiresIn: '30m',
    });
};

export const verifyToken = (
    token: string,
): { payload: JwtPayload | null; expired: boolean | string } => {
    try {
        const decoded = jwt.verify(token, config.secret_key) as JwtPayload;
        return { payload: decoded, expired: false };
    } catch (error) {
        //@ts-ignore
        throw ApiError.Unauthorized('Invalid or expired token', error.message);
    }
};
