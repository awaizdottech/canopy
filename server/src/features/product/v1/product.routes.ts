import { Request, Response, Router } from "express"
import { getProducts } from "./product.services"
import { ApiError } from "../../../utils/standards"

const productRouter = Router()

productRouter.route("/:id").get(getProducts)
productRouter.route("/").get(getProducts).post(getProducts)

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
