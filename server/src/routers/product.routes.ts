import { Router } from "express"

const productRouter = Router()

productRouter.route("/product/:id")
productRouter.route("/products") // will default send a set of products but can also take an array of ids to send only that
