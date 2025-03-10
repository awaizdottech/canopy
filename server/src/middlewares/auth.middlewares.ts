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

  if (!process.env.ACCESS_TOKEN_SECRET)
    throw new ApiError(500, "access token secret is undefined")

  let decodedToken
  try {
    decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    throw new ApiError(401, "invalid refresh token. it probably expired")
  }

  if (typeof decodedToken === "string" || !decodedToken)
    throw new ApiError(401, "unauthorised")

  const user = await getUserIfExists("id", decodedToken.id)
  if (!user) throw new ApiError(401, "user doesnt exist")
  console.log("uesr from checkUserAccess", user)

  req.user = user.data

  next()
})

export const checkAdminAccess = asyncHandler((req, _, next) => {
  if (req.user.role !== "admin") throw new ApiError(401, "unauthorised")
  next()
})
