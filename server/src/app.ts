import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./features/user/v1/user.routes"
import productRouter from "./features/product/v1/product.routes"
import orderRouter from "./features/order/v1/order.routes"
import { errorHandler } from "./middlewares/error.middlewares"
import morgan from "morgan"

export const app = express()
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "production" ? process.env.CORS_ORIGIN : "*",
    credentials: true,
  })
)
app.use(morgan("dev"))

app.get("/api/v1/healthcheck", (_, res) => {
  res.json({ message: "server is working!" })
})
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/orders", orderRouter)

app.use(errorHandler)
