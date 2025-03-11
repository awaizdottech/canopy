import { getRole, getUser } from "../features/users/v1/user.repo"
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
    req.header("Authorization")?.replace("Bearer ", "")
  if (!accessToken) throw new ApiError(401, "access token missing")

  if (!process.env.ACCESS_TOKEN_SECRET)
    // check mandatory env variables ryt after serving start
    throw new ApiError(500, "access token secret is undefined")

  let decodedToken
  try {
    decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    throw new ApiError(401, "invalid access token. it probably expired")
  }

  if (typeof decodedToken === "string" || !decodedToken)
    throw new ApiError(401, "unauthorised")

  const user = await getUser("id", decodedToken.id)
  if (!user) throw new ApiError(401, "user doesnt exist")

  req.user = user

  next()
})

export const checkAdminAccess = asyncHandler(async (req, _, next) => {
  const role = (await getRole(req.user.role_id)).role
  if (role !== "admin") throw new ApiError(401, "unauthorised")
  next()
})
