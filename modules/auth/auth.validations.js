const { z } = require("zod");

const authValidations = {};

authValidations.registerValidation = z.object({
    name: z.string().min(1, { message: "First name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

authValidations.loginValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

module.exports = authValidations;
