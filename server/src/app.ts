import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./features/users/v1/user.routes"
import productRouter from "./features/products/v1/product.routes"
import orderRouter from "./features/orders/v1/order.routes"
import { errorHandler } from "./middlewares/error.middlewares"
import morgan from "morgan"
import authRouter from "./features/auth/v1/auth.routes"

export const app = express()
app.use(express.json({ limit: "16kb" })) // should be in a env var
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "production" ? process.env.CORS_ORIGIN : "*",
    credentials: true,
  }) // check with multiple urls
)
app.use(morgan("dev"))

app.get("/api/v1/healthcheck", (_, res) => {
  res.json({ message: "server is working!" })
})
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
// app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/orders", orderRouter)

app.use(errorHandler)
