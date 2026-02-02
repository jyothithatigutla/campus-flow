import { z } from "zod";

export const LoginSchema = z.object({
    identifier: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["student", "faculty", "admin", "principal"]),
});

export const SignupSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    identifier: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["student", "faculty", "admin", "principal"]),
    secretKey: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
