// user:
// - username - string
// - password - string
// - email - string
// - mobile - string - not needed for admin
// - role - string
// - tokens - array of strings
// fields from here not needed for admin
// - cart - array of objects - productId, quantity
// - orders - past & current - array of orderIDs
// - addresses - array of objects - address, city, state, country, pincode
// - payment methods - array of objects - cardNumber, expiryDate, cvv, nameOnCard
// - profilePic - string

import { z } from "zod"

export const passwordSchema = z
  .string()
  .trim()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/,
    {
      message:
        "Password must be 6-18 characters long, and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    }
  )

export const mobileSchema = z
  .string()
  .regex(/^(\+?91|0)?[6-9]\d{9}$/, "Please enter a valid Indian mobile number")

export const usernameSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .toLowerCase()

export const emailSchema = z.string().trim().email().max(40)

export const updateUserSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    mobile: mobileSchema,
    password: passwordSchema,
  })
  .partial()

export const cartItemSchema = z.object({
  productId: z.string(), // TODO:
  quantity: z.number(),
})

export const orderItemSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  total: z.number(),
  paymentMethodId: z.string(),
  addressId: z.string(),
})

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

export type updateUserInputsType = z.infer<typeof updateUserSchema>
export type ordersType = z.infer<typeof orderItemSchema>
export type addressType = z.infer<typeof addressSchema>
export type paymentMethodType = z.infer<typeof paymentMethodSchema>
