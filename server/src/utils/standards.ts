class ApiResponse {
  statusCode: number
  data: JSON
  message: string
  success: boolean

  constructor(statusCode: number, data: JSON, message = "Success") {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
  }
}

class ApiError extends Error {
  statusCode: number
  errors: Error[]
  data: JSON | null
  success: boolean

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    this.data = null
    this.success = false

    if (stack) this.stack = stack
    else Error.captureStackTrace(this, this.constructor)
  }
}
export { ApiError, ApiResponse }
