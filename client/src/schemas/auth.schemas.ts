import { z } from "zod"

const passwordSchema = z
  .string()
  .trim()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
    {
      message:
        "Password must be 6-12 characters long, and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    }
  )

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .toLowerCase(),
  email: z.string().trim(),
  mobile: z.string().regex(/^(\+?91|0)?[6-9]\d{9}$/),
  password: passwordSchema,
})

export const loginSchema = z.object({
  emailOrMobile: z.string().refine(
    value => {
      const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const mobileRegex = /^(\+?91|0)?[6-9]\d{9}$/

      return emailRegex.test(value) || mobileRegex.test(value)
    },
    { message: "Must be a valid email address or 10-digit mobile number" }
  ),
  password: passwordSchema,
})
