import { Request, Response } from "express"
import { ApiResponse } from "../../../helpers/api-generics.helpers"
import { loginSchema, registerSchema } from "./auth.schemas"
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
  refreshTokens as refreshTokensService,
  logout as logoutService,
} from "./auth.services"
import { envVariableConfig } from "../../../config/env-variables.config"
import { StatusCodes } from "../../../config/status-codes.config"

const cookieOptions = {
  httpsOnly: true,
  secure: envVariableConfig.nodeEnv === "production",
  sameSite: "lax" as const,
  signed: true,
  ...(envVariableConfig.nodeEnv === "production" && {
    domain: envVariableConfig.corsOrigin,
  }),
  // domain & path Options lets us decide where the cookie is accessible in frontend to be sent to backend
}
// TODO: do they help with if cookies get stolen/ to avoid getting the cookies stealen?

export const registerUser = async (req: Request, res: Response) => {
  const validation = registerSchema.safeParse(req.body)
  if (!validation.success) return res.status(StatusCodes.BadRequest)

  await registerUserService(validation.data)

  return res
    .status(StatusCodes.Success)
    .json(new ApiResponse("user registered successfully"))
}

export const loginUser = async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body)
  if (!validation.success) return res.status(StatusCodes.BadRequest)

  const { user, accessToken, refreshToken } = await loginUserService(
    validation.data
  )

  return res
    .status(StatusCodes.Success)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: envVariableConfig.accessTokenExpiry,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: envVariableConfig.refreshTokenExpiry,
    })
    .json(new ApiResponse("user logged in successfully", user))
}

export const refreshTokens = async (req: Request, res: Response) => {
  const incomingRefreshToken = req.signedCookies.refreshToken
  if (!incomingRefreshToken) return res.status(StatusCodes.BadRequest)

  const { accessToken, refreshToken } = await refreshTokensService(
    incomingRefreshToken
  )

  return res
    .status(StatusCodes.Success)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: envVariableConfig.accessTokenExpiry,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: envVariableConfig.refreshTokenExpiry,
    })
    .json(new ApiResponse("token generated successfully"))
}

export const logout = async (req: Request, res: Response) => {
  const incomingRefreshToken = req.signedCookies.refreshToken
  if (!incomingRefreshToken) return res.status(StatusCodes.BadRequest)

  await logoutService(incomingRefreshToken)

  return res
    .status(StatusCodes.Success)
    .clearCookie("accessToken", {
      ...cookieOptions,
    })
    .clearCookie("refreshToken", {
      ...cookieOptions,
    })
    .json(new ApiResponse("user logged out successfully"))
}
