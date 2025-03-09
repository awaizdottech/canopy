import { z } from "zod"
import { asyncHandler } from "../../../middlewares/error.middlewares"
import { Request, Response } from "express"
import { ApiError } from "../../../helpers/api-standards"
import { getOrders } from "./order.services"

export const getOrdersController = asyncHandler(
  (req: Request, res: Response) => {
    const validation = z.array(z.number()).nonempty().safeParse(req.body)
    if (!validation.success)
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "order list validation failed",
            validation.error.issues
          )
        )

    getOrders()
  }
)
