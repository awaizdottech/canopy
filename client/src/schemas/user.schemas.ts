import { z } from "zod"

const passwordSchema = z
  .string()
  .trim()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/,
    {
      message: "Please follow the guidelines on top",
    }
  )

const mobileSchema = z
  .string()
  .regex(/^(\+?91|0)?[6-9]\d{9}$/, "Please enter a valid Indian mobile number")

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email" })

const usernameSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .toLowerCase()

export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    mobile: mobileSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .nonempty({ message: "Should be same as above password" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"],
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
  password: z.string().nonempty({ message: "Password cant be empty" }),
})

export const dbUserSchema = z.object({
  id: z.number(),
  email: emailSchema,
  username: usernameSchema,
  mobile: mobileSchema,
  profilePic: z.string().nullable(),
  deleted: z.boolean(),
  role: z.enum(["customer", "admin"]),
})
