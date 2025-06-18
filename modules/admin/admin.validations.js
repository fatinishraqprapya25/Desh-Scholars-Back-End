import { z } from 'zod';

const adminValidations = {};

adminValidations.createAdminSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required',
        })
        .min(2, { message: 'Name must be at least 2 characters' })
        .max(100, { message: 'Name is too long' }),

    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({ message: 'Invalid email address' }),

    password: z
        .string({
            required_error: 'Password is required',
        })
        .min(6, { message: 'Password must be at least 6 characters' }),
});

export default adminValidations;