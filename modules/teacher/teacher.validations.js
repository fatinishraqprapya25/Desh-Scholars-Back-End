const { z } = require("zod");

// Reusable Fields
const email = z.string().email({ message: "Invalid email address" });
const password = z.string().min(6, { message: "Password must be at least 6 characters" });
const name = z.string().min(1, { message: "Name is required" });
const phone = z.string().optional();
const gender = z.enum(["male", "female"]).optional();
const bio = z.string().optional();

// Create Teacher Validation
const createTeacherSchema = z.object({
    body: z.object({
        name,
        email,
        password,
        phone,
        gender,
        bio,
    }),
});

// Update Teacher Validation (partial)
const updateTeacherSchema = z.object({
    body: z.object({
        name: name.optional(),
        email: email.optional(),
        password: password.optional(),
        phone,
        gender,
        bio,
    }),
});

// Login (Optional if you're handling auth)
const loginTeacherSchema = z.object({
    body: z.object({
        email,
        password,
    }),
});

module.exports = {
    createTeacherSchema,
    updateTeacherSchema,
    loginTeacherSchema,
};
