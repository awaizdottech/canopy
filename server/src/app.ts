import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import userRouter from "./features/users/v1/user.routes"
import productRouter from "./features/products/v1/product.routes"
import orderRouter from "./features/orders/v1/order.routes"
import { errorHandler } from "./middlewares/error.middlewares"
import authRouter from "./features/auth/v1/auth.routes"
import { envVariableConfig } from "./config/env-variables.config"

export const app = express()
app.use(express.json({ limit: envVariableConfig.dataLimit }))
app.use(cookieParser(envVariableConfig.cookieSecret))
app.use(
  cors({
    origin:
      envVariableConfig.nodeEnv == "production"
        ? envVariableConfig.corsOrigin
        : true,
    credentials: true,
  })
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
