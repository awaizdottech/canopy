import { Request, Response } from "express"
import { asyncHandler } from "../../../middlewares/error.middlewares"
import { getProducts } from "./product.services"
import { ApiError, ApiResponse } from "../../../helpers/api-standards"
import { productIDsList } from "./product.schemas"

export const getProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    let finalResponse
    if (req.method == "GET") {
      const { id } = req.params
      if (id) finalResponse = await getProducts([id])
      else finalResponse = await getProducts()
    } else {
      const validation = productIDsList.safeParse(req.body)
      if (!validation.success)
        throw new ApiError(
          400,
          "product list validation failed",
          validation.error.issues
        )

      finalResponse = await getProducts(validation.data)
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, finalResponse, "everything worked out somehow ;P")
      )
  }
)
