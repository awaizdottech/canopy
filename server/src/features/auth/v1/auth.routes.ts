import { Router } from "express"
import { asyncHandler } from "../../../middlewares/error.middlewares"
import {
  loginUser,
  logout,
  refreshTokens,
  registerUser,
} from "./auth.controllers"
import { checkUserAccess } from "../../../middlewares/auth.middlewares"

const authRouter = Router()

authRouter.route("/register").post(asyncHandler(registerUser))
authRouter.route("/login").post(asyncHandler(loginUser))
authRouter.route("/refresh").get(asyncHandler(refreshTokens))
authRouter
  .route("/logout")
  .get(asyncHandler(checkUserAccess), asyncHandler(logout))

export default authRouter
