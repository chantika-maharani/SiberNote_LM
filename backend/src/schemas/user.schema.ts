import { z } from "zod"

export const registerSchema = {
    body: z.object({
        username: z.string().min(3).max(30).trim(),
        email: z.email(),
        password: z.string().min(8).max(16),
    })
}

export const loginSchema = {
    body: z.object({
        email: z.email(),
        password: z.string().min(1),
    })
}