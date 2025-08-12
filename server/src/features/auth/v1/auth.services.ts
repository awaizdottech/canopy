import { z } from "zod"
import { loginSchema, registerSchema } from "./auth.schemas"
import bcrypt from "bcrypt"
import { ApiError } from "../../../helpers/api-generics.helpers"
import jwt from "jsonwebtoken"
import { authRepoLayer } from "./auth.repo"
import { userRepoLayer } from "../../users/v1/user.repo"
import { cartRepoLayer } from "../../cart/v1/cart.repo"
import { envVariableConfig } from "../../../config/env-variables.config"
import { StatusCodes } from "../../../config/status-codes.config"

type RegisterInputs = z.infer<typeof registerSchema>
export const registerUser = async (registerInputs: RegisterInputs) => {
  if (await authRepoLayer.getUserByEmailOrMobile(registerInputs.email))
    throw new ApiError(
      "user exists with the given email",
      StatusCodes.BadRequest
    )

  const { cart, ...user } = registerInputs

  let savedUser = await authRepoLayer.createUser({
    ...user,
    password: await hashPassword(user.password),
  })

  if (registerInputs.cart.length)
    await cartRepoLayer.addToCart(
      registerInputs.cart.map(cartItem => ({
        ...cartItem,
        userId: savedUser.id,
      }))
    )
} // TODO: should I make getuser dynamic in the sense I can tell it what to return(login) or not(register)

type LoginInputs = z.infer<typeof loginSchema>
export const loginUser = async (loginInputs: LoginInputs) => {
  const userInDb = await authRepoLayer.getUserByEmailOrMobile(
    loginInputs.emailOrMobile
  )

  if (!userInDb) throw new ApiError("bad request", StatusCodes.BadRequest)

  if (
    !(await isPasswordCorrect({
      inputPassword: loginInputs.password,
      dbPassword: userInDb.password,
    }))
  )
    throw new ApiError("bad request", StatusCodes.BadRequest)

  const savedRefreshToken = await authRepoLayer.updateRefreshToken({
    userId: userInDb.id,
    value: generateRefreshToken(userInDb.id),
  })

  if (loginInputs.cart.length) {
    await cartRepoLayer.addToCart(
      loginInputs.cart.map(cartItem => ({ ...cartItem, userId: userInDb.id }))
    )
  } // TODO: should I modify addToCart to either return(default) or not return based on some argument as we're not using the returning value in this & register service

  const { roleId, password, refreshToken, ...user } = userInDb

  return {
    user: {
      ...user,
      role: (await userRepoLayer.getRole(roleId)).role,
    },
    accessToken: generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    }),
    ...savedRefreshToken,
  }
}

export const refreshTokens = async (incomingRefreshToken: string) => {
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    envVariableConfig.refreshTokenSecret
  ) as jwt.JwtPayload

  const user = await authRepoLayer.getUserById(decodedToken.id)
  if (!user) throw new ApiError("bad request", StatusCodes.BadRequest)

  if (incomingRefreshToken !== user.refreshToken)
    throw new ApiError("unauthorised", StatusCodes.Unauthorised)

  const newRefreshToken = await authRepoLayer.updateRefreshToken({
    userId: user.id,
    value: generateRefreshToken(user.id),
  })

  return {
    accessToken: generateAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
    }),
    ...newRefreshToken,
  }
}

export const logout = async (incomingRefreshToken: string) => {
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    envVariableConfig.refreshTokenSecret
  ) as jwt.JwtPayload

  await authRepoLayer.updateRefreshToken({
    userId: decodedToken.id,
    value: null,
  })
}

// helpers

const hashPassword = async (password: string) => bcrypt.hash(password, 10)

const isPasswordCorrect = async (passwords: {
  inputPassword: string
  dbPassword: string
}) => bcrypt.compare(passwords.inputPassword, passwords.dbPassword)

const generateAccessToken = (user: {
  id: number
  username: string
  email: string
}) =>
  jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    envVariableConfig.accessTokenSecret,
    {
      expiresIn:
        envVariableConfig.accessTokenExpiry as jwt.SignOptions["expiresIn"],
    }
  )

const generateRefreshToken = (id: number) =>
  jwt.sign(
    {
      id,
    },
    envVariableConfig.refreshTokenSecret,
    {
      expiresIn:
        envVariableConfig.refreshTokenExpiry as jwt.SignOptions["expiresIn"],
    }
  )
