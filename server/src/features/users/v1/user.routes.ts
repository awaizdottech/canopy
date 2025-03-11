import { Request, Response, Router } from "express"
import {
  updateCartController,
  loginUserController,
  registerUserController,
  updateOrdersController,
  updateUserController,
  refreshTokensController,
  updateAddressesController,
  updatePaymentMethodsController,
} from "./user.controllers"
import { ApiError } from "../../../helpers/api-standards"
import { checkUserAccess } from "../../../middlewares/auth.middlewares"

const userRouter = Router()

userRouter.route("/register").post(registerUserController)
userRouter.route("/login").post(loginUserController)
userRouter.route("/refresh").get(refreshTokensController)
userRouter.route("/update-profile").patch(checkUserAccess, updateUserController)
userRouter.route("/update-cart").patch(checkUserAccess, updateCartController)
userRouter
  .route("/update-orders")
  .patch(checkUserAccess, updateOrdersController)
userRouter
  .route("/update-addresses")
  .patch(checkUserAccess, updateAddressesController)
userRouter
  .route("/update-payment-methods")
  .patch(checkUserAccess, updatePaymentMethodsController)

userRouter.use((_, res: Response) => {
  res
    .status(404)
    .json(
      new ApiError(
        404,
        "Oops! u might wanna check the route or request method!"
      )
    )
})

export default userRouter
