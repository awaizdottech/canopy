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

const usernameSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .toLowerCase()

export const registerSchema = z.object({
  username: usernameSchema,
  email: z.string().trim().email().max(40),
  mobile: mobileSchema,
  password: passwordSchema,
  cart: z.array(z.object({ id: z.string(), quantity: z.number() })).optional(),
})

export const loginSchema = z.discriminatedUnion("loginType", [
  z.object({
    loginType: z.literal("email"),
    email: z.string().trim().email().max(40),
    password: passwordSchema,
    mobile: mobileSchema.optional(),
    cart: z
      .array(z.object({ id: z.string(), quantity: z.number() }))
      .optional(),
  }),

  z.object({
    loginType: z.literal("mobile"),
    mobile: mobileSchema,
    password: passwordSchema,
    email: z.string().trim().email().optional(),
    cart: z
      .array(z.object({ id: z.string(), quantity: z.number() }))
      .optional(),
  }),
])

export const updateUserSchema = z
  .object({
    username: usernameSchema,
    email: z.string().trim().email().max(40),
    mobile: mobileSchema,
    password: passwordSchema,
  })
  .partial()

export const cartSchema = z.array(
  z.object({
    id: z.string(),
    quantity: z.number(),
  })
)

export const ordersSchema = z.array(
  z.object({
    id: z.string(),
    quantity: z.number(),
    total: z.number(),
    paymentMethodId: z.string(),
    addressId: z.string(),
  })
)

export const addressSchema = z.object({
  address: z.string().max(200, "limit 200"),
  id: z.string().optional(),
})

export const paymentMethodSchema = z.object({
  cardNumber: z.string().length(6),
  expiryDate: z.date(),
  cvv: z.string().length(3),
  nameOnCard: z.string().max(50),
  id: z.string().optional(),
})

export type registerInputsType = z.infer<typeof registerSchema>
export type loginInputsType = z.infer<typeof loginSchema>
export type updateUserInputsType = z.infer<typeof updateUserSchema>
export type cartType = z.infer<typeof cartSchema>
export type ordersType = z.infer<typeof ordersSchema>
export type addressType = z.infer<typeof addressSchema>
export type paymentMethodType = z.infer<typeof paymentMethodSchema>

// export const userSchema = z.object({
//   uesrname: z.string(),
//   email: z.string(),
//   password: z.string(),
//   mobile: z.string(),
//   refresh_token: z.string(),
// })
