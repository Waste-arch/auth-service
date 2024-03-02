import { z } from 'zod';

const UserCore = z.object({
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email should be valid and non-empty',
        })
        .email(),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password should be valid and non-empty',
        })
        .min(6)
        .max(30),
});

export const CreateUserSchema = z.object({
    username: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string and non-empty',
        })
        .min(4)
        .max(20)
        .trim(),
    ...UserCore.shape,
});

export const LoginUserSchema = UserCore;

export const ChangePasswordSchema = z.object({
    newPassword: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password should be valid and non-empty',
        })
        .min(6)
        .max(30),
    ...UserCore.shape,
});

export type LoginUserType = z.infer<typeof LoginUserSchema>;
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
