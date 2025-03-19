import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ApiError } from "../helpers/api-generics.helpers"
import { StatusCodes } from "../config/error-codes.config"
import { envVariableConfig } from "../config/env-variables.config"

export const asyncHandler = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(requestHandler(req, res, next)).catch(err => next(err))
}

export const errorHandler: ErrorRequestHandler = (
  error: Error & { statusCode: number },
  req: Request,
  res: Response
) => {
  console.error(error)

  if (!(error instanceof ApiError)) {
    const message = error.message || "something went wrong"
    error = new ApiError(message, StatusCodes.InternalError, [], error.stack)
  }

  const { statusCode, stack, ...strippedError } = error

  const response: { message: string } = {
    ...strippedError,
    ...(envVariableConfig.nodeEnv === "development"
      ? { stack: error.stack }
      : {}),
  }
  res.status(statusCode).json(response)
}
