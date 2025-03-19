import { z } from "zod"
import { loginSchema, registerSchema } from "./auth.schemas"
import bcrypt from "bcrypt"
import { ApiError } from "../../../helpers/api-generics.helpers"
import jwt from "jsonwebtoken"
import { authRepoLayer } from "./auth.repo"
import { userRepoLayer } from "../../users/v1/user.repo"
import { cartRepoLayer } from "../../cart/v1/cart.repo"
import { envVariableConfig } from "../../../config/env-variables.config"
import { StatusCodes } from "../../../config/error-codes.config"

export const registerUser = async (
  registerInputs: z.infer<typeof registerSchema>
) => {
  if (await authRepoLayer.getUser(registerInputs.email))
    throw new ApiError("bad request", StatusCodes.BadRequest)

  const { cart, ...user } = registerInputs

  let savedUser = await authRepoLayer.createUser({
    ...user,
    password: await hashPassword(user.password),
  })
  const { id, email, username } = savedUser

  let savedCart = []
  if (registerInputs.cart.length)
    savedCart = await cartRepoLayer.addToCart(
      registerInputs.cart.map(cartItem => ({ ...cartItem, userId: id }))
    )

  return {
    user: {
      ...savedUser,
      cart: savedCart,
      role: (await userRepoLayer.getRole("1")).role,
    },
    accessToken: generateAccessToken({ id, email, username }),
  }
}

export const loginUser = async (loginInputs: z.infer<typeof loginSchema>) => {
  let user
  if (loginInputs.email) user = await authRepoLayer.getUser(loginInputs.email)
  else if (loginInputs.mobile)
    user = await authRepoLayer.getUser(loginInputs.mobile)
  console.log("user from loginUserService", user)

  if (!user) throw new ApiError("bad request", StatusCodes.BadRequest)

  const { id, email, username, password } = user
  if (
    !(await isPasswordCorrect({
      inputPassword: loginInputs.password,
      dbPassword: password,
    }))
  )
    throw new ApiError("bad request", StatusCodes.BadRequest)

  const refreshToken = generateRefreshToken(id)
  const updatedRefreshToken = await userRepoLayer.()

  if (loginInputs.cart.length) {
    await cartRepoLayer.addToCart(
      loginInputs.cart.map(cartItem => ({ ...cartItem, userId: id }))
    )
  }

  return {
    user: {
      ...user,
      role: (await userRepoLayer.getRole(user.role_id)).role,
      ...updatedRefreshToken,
    },
    accessToken: generateAccessToken({ id, email, username }),
  }
}

export const refreshTokens = async (incomingRefreshToken: string) => {
  const decodedToken= jwt.verify(
      incomingRefreshToken,
      envVariableConfig.refreshTokenSecret
    ) as jwt.JwtPayload
  // TODO: invalidate old token on logout & create & store new refresh token every time access token is refreshed/generated

  const user = await authRepoLayer.getUser(decodedToken.id)
  if (!user) throw new ApiError("bad request", StatusCodes.BadRequest)

  if (incomingRefreshToken !== user.data.refreshToken)
    throw new ApiError("bad request", StatusCodes.BadRequest)

  return {
    user: user.data,
    accessToken: generateAccessToken({
      id: user.data.id,
      username: user.data.username,
      email: user.data.email,
    }),
  }
}

export const logout = async (incomingRefreshToken: string) => {
  const decodedToken= jwt.verify(
      incomingRefreshToken,
      envVariableConfig.refreshTokenSecret
    ) as jwt.JwtPayload
  // TODO: invalidate old token on logout & create & store new refresh token every time access token is refreshed/generated

  
  if (await authRepoLayer.updateRefreshToken({userId:decodedToken.id,value:null})) throw new ApiError("bad request", StatusCodes.BadRequest)
}

const hashPassword = async (password: string) => bcrypt.hash(password, 10)

const isPasswordCorrect = async (passwords: {
  inputPassword: string
  dbPassword: string
}) => bcrypt.compare(passwords.inputPassword, passwords.dbPassword)

const generateAccessToken = (user: {
  id: string
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

const generateRefreshToken = (id: string) =>
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

// TODO: why is the type predicate needed here
