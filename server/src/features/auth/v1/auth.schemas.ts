import { z } from "zod"
import {
  cartItemSchema,
  emailSchema,
  mobileSchema,
  passwordSchema,
  usernameSchema,
} from "../../users/v1/user.schemas"

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  mobile: mobileSchema,
  password: passwordSchema,
  // cart: z.array(z.object({ id: z.string(), quantity: z.number() })).optional(),
  cart: z.array(cartItemSchema),
})

export const loginSchema = z.discriminatedUnion("loginType", [
  z.object({
    loginType: z.literal("email"),
    email: emailSchema,
    password: passwordSchema,
    mobile: mobileSchema.optional(),
    cart: z.array(cartItemSchema),
  }),

  z.object({
    loginType: z.literal("mobile"),
    mobile: mobileSchema,
    password: passwordSchema,
    email: emailSchema.optional(),
    cart: z.array(cartItemSchema),
  }),
])
