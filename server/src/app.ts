import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/standards"

export const app = express()
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "production" ? process.env.CORS_ORIGIN : "*",
    credentials: true,
  })
)

app.get("/api/v1/user")
app.get("/api/v1/healthcheck", (req, res) => {
  res.json({ message: "server is working!" })
})

app.use((req, res, next) => {
  res.status(404).json(new ApiError(404, "internal server error"))
})
