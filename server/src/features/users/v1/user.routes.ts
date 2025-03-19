import { Router } from "express"
import {
  updateCartController,
  updateOrdersController,
  updateUserController,
  updateAddressesController,
  updatePaymentMethodsController,
} from "./user.controllers"
import { checkUserAccess } from "../../../middlewares/auth.middlewares"

const userRouter = Router()

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

export default userRouter
