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
  cart: z.array(cartItemSchema),
})

export const loginSchema = z.object({
  password: passwordSchema,
  cart: z.array(cartItemSchema),
  emailOrMobile: z.string().refine(val => {
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const mobileRegex = /^(\+?91|0)?[6-9]\d{9}$/

    return emailRegex.test(val) || mobileRegex.test(val)
  }),
})
