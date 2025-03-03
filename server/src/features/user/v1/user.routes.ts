import { Request, Response, Router } from "express"
import {
  updateCartController,
  updateProfileController,
  loginUserController,
  registerUserController,
  updateOrdersController,
} from "./user.controllers"
import { ApiError } from "../../../utils/standards"

const userRouter = Router()

userRouter.route("/regitser").post(registerUserController)
userRouter.route("/login").post(loginUserController)
userRouter.route("/update-profile").patch(updateProfileController)
userRouter.route("/update-cart").patch(updateCartController)
userRouter.route("/update-orders").patch(updateOrdersController)

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
