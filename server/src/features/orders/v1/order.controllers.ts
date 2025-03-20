import { asyncHandler } from "../../../middlewares/error.middlewares"
import { Request, Response } from "express"
import { ApiError, ApiResponse } from "../../../helpers/api-generics.helpers"
import { getAllOrdersService, updateOrderService } from "./order.services"
import { updateOrderSchema } from "./order.schemas"
import { StatusCodes } from "../../../config/status-codes.config"

export const getOrdersController = asyncHandler(async (_, res: Response) => {
  return res.status(200).json(
    new ApiResponse(
      "orders sent successfully",
      JSON.parse(
        JSON.stringify({
          orders: await getAllOrdersService(),
        })
      )
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
            "update order input validation failed",
            StatusCodes.BadRequest,
            validation.error.issues
          )
        )

    return res.status(200).json(
      new ApiResponse(
        "orders updated successfully",
        JSON.parse(
          JSON.stringify({
            order: await updateOrderService(validation.data),
          })
        )
      )
    )
  }
)
