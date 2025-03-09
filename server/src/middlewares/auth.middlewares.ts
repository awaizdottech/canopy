import { getUserIfExists } from "../features/user/v1/user.repo"
import { ApiError } from "../helpers/api-standards"
import { asyncHandler } from "./error.middlewares"
import jwt from "jsonwebtoken"

declare module "express-serve-static-core" {
  interface Request {
    user?: any
  }
}

export const checkUserAccess = asyncHandler(async (req, _, next) => {
  const accessToken =
    req.signedCookies.accessToken ||
    req.body.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "")
  if (!accessToken) throw new ApiError(401, "access token missing")

  let decodedToken
  try {
    if (!process.env.ACCESS_TOKEN_SECRET)
      throw new ApiError(500, "access token secret is undefined")

    decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    throw new ApiError(401, "invalid refresh token. it probably expired")
  }

  if (typeof decodedToken === "string" || !decodedToken)
    throw new ApiError(401, "unauthorised")

  try {
    const user = await getUserIfExists("id", decodedToken.id)
    if (!user) throw new ApiError(401, "user doesnt exist")

    req.user = user.data

    next()
  } catch (error) {
    throw new ApiError(401, "something went wrong while checking user in db")
  }
})
