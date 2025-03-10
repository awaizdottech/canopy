import { Response, Router } from "express"
import {
  getOrdersController,
  updateOrderStatusController,
} from "./order.controllers"
import { ApiError } from "../../../helpers/api-standards"
import {
  checkAdminAccess,
  checkUserAccess,
} from "../../../middlewares/auth.middlewares"

const orderRouter = Router()

orderRouter
  .route("/")
  .get(checkUserAccess, checkAdminAccess, getOrdersController)
orderRouter
  .route("/update-status")
  .post(checkUserAccess, checkAdminAccess, updateOrderStatusController)

orderRouter.use((_, res: Response) => {
  res
    .status(404)
    .json(
      new ApiError(
        404,
        "Oops! u might wanna check the route or request method!"
      )
    )
})

export default orderRouter
