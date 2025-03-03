// user:

// - username - string
// - password - string
// - email - string
// - mobile - string - not needed for admin
// - role - string
// - tokens - array of strings
// fields from here not needed for admin
// - cart - array of objects - productID, quantity
// - orders - past & current - array of orderIDs
// - addresses - array of objects - address, city, state, country, pincode
// - payment methods - array of objects - cardNumber, expiryDate, cvv, nameOnCard
// - profilePic - string

import { number, z } from "zod"

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

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .toLowerCase(),
  email: z.string().trim().email(),
  mobile: mobileSchema,
  password: passwordSchema,
  cart: z.array(z.object({ id: z.string(), quantity: z.number() })),
})

export type registerInputsType = z.infer<typeof registerSchema>

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

export type loginInputsType = z.infer<typeof loginSchema>

export const cartType = z.array(
  z.object({
    id: z.number(),
    quantity: z.number(),
  })
)
