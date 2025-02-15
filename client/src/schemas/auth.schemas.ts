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

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must be no more than 20 characters")
      .toLowerCase(),
    email: z.string().trim().email(),
    mobile: z
      .string()
      .regex(
        /^(\+?91|0)?[6-9]\d{9}$/,
        "Please enter a valid Indian mobile number"
      ),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // This tells Zod to add the error on confirmPassword field
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
