import { StatusCodes } from "../config/status-codes.config"

export class ApiResponse {
  data: object | any[]
  message: string

  constructor(message = "Success", data = {}) {
    this.data = data
    this.message = message
  }
}

export class ApiError extends Error {
  statusCode: number
  data: object | any[]
  message: string

  constructor(
    message = "something went wrong",
    statusCode = StatusCodes.InternalError,
    data = {},
    stack = ""
  ) {
    super()
    this.statusCode = statusCode
    this.data = data
    this.message = message

    if (stack) this.stack = stack
    else Error.captureStackTrace(this, this.constructor)
  }
}
