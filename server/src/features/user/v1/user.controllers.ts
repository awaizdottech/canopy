// validation

import { Request, Response } from "express"
import {
  addressSchema,
  cartSchema,
  cartType,
  loginSchema,
  ordersSchema,
  paymentMethodSchema,
  registerSchema,
  updateUserSchema,
} from "./user.schemas"
import { ApiError, ApiResponse } from "../../../helpers/api-standards"
import { asyncHandler } from "../../../middlewares/error.middlewares"
import {
  loginUserService,
  refreshTokensService,
  regitserUserService,
  updateAddressesService,
  updateCartService,
  updateOrdersService,
  updatePaymentMethodsService,
  updateUserService,
} from "./user.services"
import jwt from "jsonwebtoken"

declare module "express-serve-static-core" {
  interface Request {
    action?: "add" | "remove"
    orderAction?: "confirm" | "cancel"
  }
}

const options = {
  httpsOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  // signed: true,
  ...(process.env.NODE_ENV === "production" && {
    domain: process.env.FRONTEND_URL,
  }),
  // domain & path options lets us decide where the cookie is accessible in frontend to be sent to backend
}

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
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

    try {
      const { user, accessToken, refreshToken } = await regitserUserService(
        validation.data
      )

      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          ...options,
          maxAge: eval(process.env.ACCESS_TOKEN_COOKIE_EXPIRY ?? "1d"),
        })
        .cookie("refreshToken", refreshToken, {
          ...options,
          maxAge: eval(process.env.REFRESH_TOKEN_COOKIE_EXPIRY ?? "1w"),
        })
        .json(
          new ApiResponse(
            200,
            JSON.parse(JSON.stringify({ user, accessToken, refreshToken })),
            "user registered successfully"
          )
        )
    } catch (error) {
      throw error
    }
  }
)

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
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

    try {
      const { user, accessToken, refreshToken } = await loginUserService(
        validation.data
      )

      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          ...options,
          maxAge: eval(process.env.ACCESS_TOKEN_COOKIE_EXPIRY ?? "1d"),
        })
        .cookie("refreshToken", refreshToken, {
          ...options,
          maxAge: eval(process.env.REFRESH_TOKEN_COOKIE_EXPIRY ?? "1w"),
        })
        .json(
          new ApiResponse(
            200,
            JSON.parse(JSON.stringify({ user, accessToken, refreshToken })),
            "user logged in successfully"
          )
        )
    } catch (error) {
      throw error
    }
  }
)

export const refreshTokensController = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.signedCookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken)
      return res.status(400).json(new ApiError(401, "refresh token missing"))

    const { user, accessToken } = await refreshTokensService(
      incomingRefreshToken
    )

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: eval(process.env.ACCESS_TOKEN_COOKIE_EXPIRY ?? "1d"),
      })
      .json(
        new ApiResponse(
          200,
          JSON.parse(JSON.stringify({ user, accessToken })),
          "token generated successfully"
        )
      )
  }
)

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = updateUserSchema.safeParse(req.body)
    if (!validation.success)
      return res
        .status(400)
        .json(
          new ApiError(400, "input validation failed", validation.error.issues)
        )

    return res.status(200).json(
      new ApiResponse(
        200,
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
    const validation = cartSchema.safeParse(req.body.cart)
    if (!validation.success)
      return res
        .status(400)
        .json(new ApiError(400, "cart items Validation failed"))

    if (req.action)
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await updateCartService(req.action, req.body.cart, req.user.id),
            "cart updated successfully"
          )
        )
  }
)

export const updateOrdersController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = ordersSchema.safeParse(req.body.orders)
    if (!validation.success)
      return res.status(400).json(new ApiError(400, "orders Validation failed"))

    if (req.orderAction)
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
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
  }
)

export const updateAddressesController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = addressSchema.safeParse(req.body.address)
    if (!validation.success)
      return res
        .status(400)
        .json(new ApiError(400, "address Validation failed"))

    if (req.action)
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            await updateAddressesService(
              req.action,
              req.body.address,
              req.user.id
            ),
            `address ${req.action == "add" ? "added" : "removed"} successfully`
          )
        )
  }
)

export const updatePaymentMethodsController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = paymentMethodSchema.safeParse(req.body.paymentMethod)
    if (!validation.success)
      return res
        .status(400)
        .json(new ApiError(400, "payment method Validation failed"))

    if (req.action)
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
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
  }
)
