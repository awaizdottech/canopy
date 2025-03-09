import { Request, Response, Router } from "express"
import { getOrdersController } from "./order.controllers"
import { ApiError } from "../../../helpers/api-standards"

const orderRouter = Router()

orderRouter.route("/").post(getOrdersController)

orderRouter.use((req: Request, res: Response) => {
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
