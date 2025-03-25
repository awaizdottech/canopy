import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ApiError } from "../helpers/api-generics.helpers"
import { StatusCodes } from "../config/status-codes.config"
import { envVariableConfig } from "../config/env-variables.config"

export const asyncHandler = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(requestHandler(req, res, next)).catch(err => next(err))
}

export const errorHandler: ErrorRequestHandler = (
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error)

  if (error instanceof ApiError) {
    const { statusCode, stack, ...filteredError } = error

    const response: { message: string } = {
      ...filteredError,
      ...(envVariableConfig.nodeEnv === "development" ? { stack } : {}),
    }
    res.status(statusCode).json(response)
  } else {
    const { stack, ...filteredError } = error

    res.status(StatusCodes.InternalError).json({
      message: error.message ?? "something went wrong",
      data: filteredError,
      ...(envVariableConfig.nodeEnv === "development" ? { stack } : {}),
    })
  }
}
