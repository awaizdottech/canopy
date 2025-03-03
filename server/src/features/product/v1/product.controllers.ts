import { Request, Response } from "express"
import { asyncHandler } from "../../../middlewares/error.middlewares"
import { getProducts } from "./product.services"
import { ApiError } from "../../../utils/standards"
import { z } from "zod"

export const getProductsController = asyncHandler(
  (req: Request, res: Response) => {
    if (req.method == "GET") {
      const { id } = req.params
      if (id) getProducts([Number(id)])
      else getProducts()
    } else {
      const validation = z.array(z.number()).nonempty().safeParse(req.body)
      if (!validation.success)
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              "product list validation failed",
              validation.error.issues
            )
          )

      getProducts(validation.data)
    }
  }
)
