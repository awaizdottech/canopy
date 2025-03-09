import { z } from "zod"

// orders:

// - productID - string
// - orderID - string
// - orderDate - date
// - orderStatus - string
// - orderTotal - number
// - orderPaymentMethod - string
// - orderAddress - string
// - orderUserID - string

export const orderSchema = z.object({
  id: z.string(),
  productID: z.string(),
  date: z.date(),
  status: z.enum(["pending", "confirmed"]),
  total: z.number(),
  paymentMethod: z.string(),
  address: z.string(),
  userID: z.string(),
})
