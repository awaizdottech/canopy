import { NextFunction, Request, Response } from "express"
import { envVariableConfig } from "../config/env-variables.config"
import { userRepoLayer } from "../features/users/v1/user.repo"
import { ApiError } from "../helpers/api-generics.helpers"
import { asyncHandler } from "./error.middlewares"
import jwt from "jsonwebtoken"
import { authRepoLayer, User } from "../features/auth/v1/auth.repo"
import { StatusCodes } from "../config/status-codes.config"

declare module "express-serve-static-core" {
  interface Request {
    user?: User
  }
}

export const checkUserAccess = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const accessToken =
    req.signedCookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "")
  if (!accessToken) throw new ApiError("bad request", StatusCodes.BadRequest)

  let decodedToken = jwt.verify(
    accessToken,
    envVariableConfig.accessTokenSecret
  ) as jwt.JwtPayload

  const user = await authRepoLayer.getUser(decodedToken.id)
  if (!user) throw new ApiError("bad request", StatusCodes.BadRequest)

  req.user = user

  next()
}

export const checkAdminAccess = asyncHandler(async (req, _, next) => {
  const role = (await userRepoLayer.getRole(req.user!.roleId)).role
  if (role !== "admin") throw new ApiError("unauthorised")
  next()
})
