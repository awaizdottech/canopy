import { asyncHandler } from "../../../middlewares/error.middlewares"
import { Request, Response } from "express"
import { ApiError, ApiResponse } from "../../../helpers/api-standards"
import { getAllOrdersService, updateOrderService } from "./order.services"
import { updateOrderSchema } from "./order.schemas"

export const getOrdersController = asyncHandler(async (_, res: Response) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      JSON.parse(
        JSON.stringify({
          orders: await getAllOrdersService(),
        })
      ),
      "orders sent successfully"
    )
  )
})

export const updateOrderStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = updateOrderSchema.safeParse(req.body)
    if (!validation.success)
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "update order input validation failed",
            validation.error.issues
          )
        )

    return res.status(200).json(
      new ApiResponse(
        200,
        JSON.parse(
          JSON.stringify({
            order: await updateOrderService(validation.data),
          })
        ),
        "orders updated successfully"
      )
    )
  }
)
