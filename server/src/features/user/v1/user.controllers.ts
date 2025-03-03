// validation

import { Request, Response } from "express"
import { cartType, loginSchema, registerSchema } from "./user.schemas"
import { ApiError } from "../../../utils/standards"
import { asyncHandler } from "../../../middlewares/error.middlewares"
import { loginUser, regitserUser, updateCart } from "./user.services"

export const registerUserController = asyncHandler(
  (req: Request, res: Response) => {
    const validation = registerSchema.safeParse(req.body)
    if (!validation.success)
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "register input validation failed",
            validation.error.issues
          )
        )

    regitserUser(validation.data)
  }
)

export const loginUserController = asyncHandler(
  (req: Request, res: Response) => {
    const validation = loginSchema.safeParse(req.body)
    if (!validation.success)
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "login input validation failed",
            validation.error.issues
          )
        )

    loginUser(validation.data)
  }
)

export const updateProfileController = asyncHandler(
  (req: Request, res: Response) => {}
)

export const updateCartController = asyncHandler(
  // decide whether u want to replace the whole cart array or edit it, which depends on how u r going to store it
  (req: Request, res: Response) => {
    const validation = cartType.safeParse(req.body)
    if (!validation.success)
      return res
        .status(400)
        .json(new ApiError(400, "cart items Validation failed"))

    updateCart()
  }
)

export const updateOrdersController = asyncHandler(
  (req: Request, res: Response) => {}
)
