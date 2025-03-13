export class ApiResponse {
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

export class ApiError extends Error {
  statusCode: number
  errors: any[]
  data: JSON | null
  success: boolean
  message: string

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any[] = [],
    stack = ""
  ) {
    super()
    this.statusCode = statusCode
    this.errors = errors
    this.data = null
    this.success = false
    this.message = message

    if (stack) this.stack = stack
    else Error.captureStackTrace(this, this.constructor)
  }
}
