import { z } from "zod"

// product:

// productID - string
// productName - string
// productCategory - string
// productDescription - string
// productImage - string
// productPrice - number
// productQuantity - number
// rating - number
// reviews - array of objects - reviewRating, reviewComment, reviewUser

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  desciption: z.string(),
  imageURL: z.string(),
  price: z.number(),
  stock: z.number(),
  rating: z.number(),
  reviews: z.array(
    z.object({
      rating: z.number(),
      comment: z.string(),
      userID: z.string(),
    })
  ),
})
