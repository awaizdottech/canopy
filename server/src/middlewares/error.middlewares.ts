import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ApiError } from "../helpers/api-standards"

export const asyncHandler = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(requestHandler(req, res, next)).catch(err => next(err))
}

interface ErrorResponse {
  statusCode?: number
  message: string
  stack?: string
  errors?: any[]
}

export const errorHandler: ErrorRequestHandler = (
  error: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ?? 500
    const message = error.message || "something went wrong"
    error = new ApiError(statusCode, message, [], error.stack)
  }

  const response: ErrorResponse = {
    ...error,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  }
  res.status(error.statusCode ?? 500).json(response)
}
