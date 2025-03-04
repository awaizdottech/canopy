import { z } from "zod"

const passwordSchema = z
  .string()
  .trim()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/,
    {
      message:
        "Password must be 6-18 characters long, and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    }
  )

const mobileSchema = z
  .string()
  .regex(/^(\+?91|0)?[6-9]\d{9}$/, "Please enter a valid Indian mobile number")

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must be no more than 20 characters")
      .toLowerCase(),
    email: z.string().trim().email(),
    mobile: mobileSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.discriminatedUnion("loginType", [
  z.object({
    loginType: z.literal("email"),
    email: z.string().trim().email(),
    password: passwordSchema,
    mobile: mobileSchema.optional(),
  }),

  z.object({
    loginType: z.literal("mobile"),
    mobile: mobileSchema,
    password: passwordSchema,
    email: z.string().trim().email().optional(),
  }),
])
