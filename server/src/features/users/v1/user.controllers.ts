// validation

import { Request, Response } from "express"
import {
  addressSchema,
  cartItemSchema,
  orderItemSchema,
  paymentMethodSchema,
  updateUserSchema,
} from "./user.schemas"
import { ApiError, ApiResponse } from "../../../helpers/api-generics.helpers"
import { asyncHandler } from "../../../middlewares/error.middlewares"
import {
  updateAddressesService,
  updateCartService,
  updateOrdersService,
  updatePaymentMethodsService,
  updateUserService,
} from "./user.services"

declare module "express-serve-static-core" {
  interface Request {
    action?: "add" | "remove"
    orderAction?: "confirm" | "cancel"
  }
}

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = updateUserSchema.safeParse(req.body)
    if (!validation.success)
      return res
        .status(400)
        .json(
          new ApiError(
            "user update input validation failed",
            validation.error.issues
          )
        )

    return res.status(200).json(
      new ApiResponse(
        JSON.parse(
          JSON.stringify({
            user: await updateUserService(validation.data, req.user.id),
          })
        ),
        "user updated successfully"
      )
    )
  }
)

export const updateCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = cartItemSchema.safeParse(req.body.cart)
    if (!validation.success)
      return res.status(400).json(new ApiError("cart items Validation failed"))

    if (req.action)
      return res
        .status(200)
        .json(
          new ApiResponse(
            await updateCartService(req.action, req.body.cart, req.user.id),
            "cart updated successfully"
          )
        )

    throw new ApiError("missing action!")
  }
)

export const updateOrdersController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = orderItemSchema.safeParse(req.body.orders)
    if (!validation.success)
      return res.status(400).json(new ApiError("orders Validation failed"))

    if (req.orderAction)
      return res
        .status(200)
        .json(
          new ApiResponse(
            JSON.parse(
              JSON.stringify(
                await updateOrdersService(
                  req.orderAction,
                  req.body.orders,
                  req.user.id
                )
              )
            ),
            "orders updated successfully"
          )
        )

    throw new ApiError("missing action!")
  }
)

export const updateAddressesController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = addressSchema.safeParse(req.body.address)
    if (!validation.success)
      return res.status(400).json(new ApiError("address Validation failed"))

    if (req.action)
      return res
        .status(200)
        .json(
          new ApiResponse(
            await updateAddressesService(
              req.action,
              req.body.address,
              req.user.id
            ),
            `address ${req.action == "add" ? "added" : "removed"} successfully`
          )
        )

    throw new ApiError("missing action!")
  }
)

export const updatePaymentMethodsController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = paymentMethodSchema.safeParse(req.body.paymentMethod)
    if (!validation.success)
      return res
        .status(400)
        .json(new ApiError("payment method Validation failed"))

    if (req.action)
      return res
        .status(200)
        .json(
          new ApiResponse(
            await updatePaymentMethodsService(
              req.action,
              req.body.paymentMethod,
              req.user.id
            ),
            `paymentMethod ${
              req.action == "add" ? "added" : "removed"
            } successfully`
          )
        )

    throw new ApiError("missing action!")
  }
)
