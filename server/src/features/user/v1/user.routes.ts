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
userRouter.use(checkUserAccess)
userRouter.route("/update-profile").patch(updateUserController)
userRouter.route("/update-cart").patch(updateCartController)
userRouter.route("/update-orders").patch(updateOrdersController)
userRouter.route("/update-addresses").patch(updateAddressesController)
userRouter
  .route("/update-payment-methods")
  .patch(updatePaymentMethodsController)

userRouter.use((req: Request, res: Response) => {
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
