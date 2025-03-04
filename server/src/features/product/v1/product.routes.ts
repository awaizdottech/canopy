import { Request, Response, Router } from "express"
import { ApiError } from "../../../utils/standards"
import { getProductsController } from "./product.controllers"

const productRouter = Router()

productRouter.route("/:id").get(getProductsController)
productRouter.route("/").get(getProductsController).post(getProductsController)

productRouter.use((req: Request, res: Response) => {
  res
    .status(404)
    .json(
      new ApiError(
        404,
        "Oops! u might wanna check the route or request method!"
      )
    )
})

export default productRouter
