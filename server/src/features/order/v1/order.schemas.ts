import { z } from "zod"

export const orderSchema = z.object({
  id: z.string(),
  productID: z.string(),
  date: z.date(),
  status: z.enum(["pending", "approved"]),
  total: z.number(),
  paymentMethod: z.string(),
  address: z.string(),
  userID: z.string(),
})

export const updateOrderSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "approved", "cancelled"]),
})

export type updateOrderType = z.infer<typeof updateOrderSchema>
