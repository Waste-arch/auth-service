import {
    ChangePasswordType,
    CreateUserType,
    LoginUserType,
} from '../schemas/auth.schema';
import User from '../models/auth-model';
import ApiError from '../exceptions/api-error';
import { hashPassword, verifyPassword } from '../utils/hash.utils';
import { generateToken } from '../utils/jwt.utils';

class AuthService {
    async createUser({ username, email, password }: CreateUserType) {
        const foundUser = await User.findOne({ email });

        if (foundUser) {
            throw ApiError.BadRequest(`User already exists`);
        }

        const hashedPassword = await hashPassword(password);

        const createdUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return { accessToken: generateToken(createdUser.id), createdUser };
    }
    async loginUser({ email, password }: LoginUserType) {
        const foundUser = await User.findOne({ email });
        if (
            !foundUser ||
            !(await verifyPassword(password, foundUser.password))
        ) {
            throw ApiError.BadRequest('Invalid Credentials');
        }

        return { accessToken: generateToken(foundUser.id), user: foundUser };
    }
    async changePassword({ email, password, newPassword }: ChangePasswordType) {
        if (password === newPassword) {
            throw ApiError.BadRequest(
                'New password cannot be the same as the old password',
            );
        }

        const foundUser = await User.findOne({ email });

        if (
            !foundUser ||
            !(await verifyPassword(password, foundUser.password))
        ) {
            throw ApiError.BadRequest('Invalid Credentials');
        }

        const hashedNewPassword = await hashPassword(newPassword);

        await User.updateOne(
            { email },
            { $set: { password: hashedNewPassword } },
        );

        return {
            changedUser: await User.findOne({ email }),
            accessToken: generateToken(foundUser.id),
        };
    }
}

export default new AuthService();
