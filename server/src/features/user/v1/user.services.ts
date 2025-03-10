// business logic

import { ApiError } from "../../../helpers/api-standards"
import { getCurrentDate } from "../../../helpers/date"
import {
  addToAddresses,
  addToCart,
  addToOrders,
  addToPaymentMethods,
  createUser,
  getAddresses,
  getCart,
  getOrders,
  getPaymentMethods,
  getRole,
  getUserIfExists,
  removeFromAddresses,
  removeFromCart,
  removeFromPaymentMethods,
  updateUser,
} from "./user.repo"
import {
  addressType,
  cartType,
  loginInputsType,
  ordersType,
  paymentMethodType,
  registerInputsType,
  updateUserInputsType,
} from "./user.schemas"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const regitserUserService = async (
  registerInputs: registerInputsType
) => {
  try {
    console.log(await getUserIfExists("email", registerInputs.email), "hello")

    if (await getUserIfExists("email", registerInputs.email))
      throw new ApiError(400, "user already exists")

    const { cart, ...user } = registerInputs

    let savedUser = await createUser({
      ...user,
      password: await hashPassword(user.password),
    })
    const { id, email, username } = savedUser

    const refreshToken = generateRefreshToken(id)
    const { updateQuery, values } = updateUserQueryGenerator({
      id,
      refresh_token: refreshToken,
    })
    const updatedFields = await updateUser(updateQuery, values)

    let savedCart
    if (registerInputs.cart?.length) {
      const { insertQuery, values } = addToCartQueryGenerator(
        id,
        registerInputs.cart
      )
      savedCart = await addToCart(insertQuery, values)
    }

    return {
      user: {
        ...savedUser,
        ...updatedFields,
        cart: savedCart ?? [],
        role: (await getRole("1")).role,
      },
      accessToken: generateAccessToken({ id, email, username }),
    }
  } catch (error) {
    throw error
  }
}

export const loginUserService = async (loginInputs: loginInputsType) => {
  try {
    let user
    if (loginInputs.email)
      user = await getUserIfExists("email", loginInputs.email)
    else if (loginInputs.mobile)
      user = await getUserIfExists("mobile", loginInputs.mobile)
    console.log("user from loginUserService", user)

    if (!user) throw new ApiError(400, "user doesnt exist")

    const { id, email, username, password } = user
    if (
      !(await isPasswordCorrect({
        inputPassword: loginInputs.password,
        dbPassword: password,
      }))
    )
      throw new ApiError(400, "password didnt match")

    const refreshToken = generateRefreshToken(id)
    const { updateQuery, values } = updateUserQueryGenerator({
      id,
      refresh_token: refreshToken,
    })
    const updatedRefreshToken = await updateUser(updateQuery, values)

    if (loginInputs.cart?.length) {
      const { insertQuery, values } = addToCartQueryGenerator(
        id,
        loginInputs.cart
      )
      await addToCart(insertQuery, values)
    }

    return {
      user: {
        ...user,
        cart: await getCart(id),
        orders: await getOrders(id),
        addresses: await getAddresses(id),
        paymentMethods: await getPaymentMethods(id),
        role: (await getRole(user.role_id)).role,
        ...updatedRefreshToken,
      },
      accessToken: generateAccessToken({ id, email, username }),
    }
  } catch (error) {
    throw error
  }
}

export const refreshTokensService = async (incomingRefreshToken: string) => {
  if (!process.env.REFRESH_TOKEN_SECRET)
    throw new ApiError(500, "refresh token secret is undefined")

  let decodedToken
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
  } catch (error) {
    throw new ApiError(401, "invalid refresh token. it probably expired")
  }

  if (typeof decodedToken === "string" || !decodedToken)
    throw new ApiError(401, "invalid refresh token")

  try {
    const user = await getUserIfExists("id", decodedToken.id)
    if (!user) throw new ApiError(400, "user doesnt exist")

    if (incomingRefreshToken !== user.data.refreshToken)
      throw new ApiError(401, "invalid refresh token")

    return {
      user: user.data,
      accessToken: generateAccessToken({
        id: user.data.id,
        username: user.data.username,
        email: user.data.email,
      }),
    }
  } catch (error) {
    throw error
  }
}

export const updateUserService = async (
  updateUserInputs: updateUserInputsType,
  userId: string
) => {
  try {
    const { updateQuery, values } = updateUserQueryGenerator({
      ...updateUserInputs,
      id: userId,
    })

    return (await updateUser(updateQuery, values)).data
  } catch (error) {
    throw error
  }
}

export const updateCartService = async (
  action: "add" | "remove",
  cart: cartType,
  userId: string
) => {
  if (action == "add") {
    const { insertQuery, values } = addToCartQueryGenerator(userId, cart)
    return await addToCart(insertQuery, values)
  } else {
    if (cart[0].id) return await removeFromCart(cart[0].id)
  }
}

export const updateOrdersService = async (
  action: "confirm" | "cancel",
  orders: ordersType,
  userId: string
) => {
  if (action == "confirm") {
    const { insertQuery, values } = addToOdersQueryGenerator(userId, orders)
    return await addToOrders(insertQuery, values)
  }
}

export const updateAddressesService = async (
  action: "add" | "remove",
  address: addressType,
  userId: string
) => {
  if (action == "add") {
    return await addToAddresses({ userId, address: address.address })
  } else if (address.id) return await removeFromAddresses(address.id)
}

export const updatePaymentMethodsService = async (
  action: "add" | "remove",
  paymentMethod: paymentMethodType,
  userId: string
) => {
  if (action == "add") {
    return await addToPaymentMethods({ userId, ...paymentMethod })
  } else if (paymentMethod.id)
    return await removeFromPaymentMethods(paymentMethod.id)
}

// helpers

const generateAccessToken = (user: {
  id: string
  username: string
  email: string
}) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new ApiError(500, "access secret is not defined")
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env
        .ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    }
  )
}

const generateRefreshToken = (id: string) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new ApiError(500, "refresh secret is not defined")
  }

  return jwt.sign(
    {
      id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env
        .REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    }
  )
}
// TODO: why is the type predicate needed here

const hashPassword = async (password: string) => await bcrypt.hash(password, 10)

const isPasswordCorrect = async (passwords: {
  inputPassword: string
  dbPassword: string
}) => {
  return await bcrypt.compare(passwords.inputPassword, passwords.dbPassword)
}

const updateUserQueryGenerator = (modifiedUser: {
  [key: string]: string | undefined
  id: string
  username?: string
  email?: string
  mobile?: string
  password?: string
  refresh_token?: string
}) => {
  const updates: string[] = []
  const values: string[] = [modifiedUser.id]
  const returning: string[] = []
  let paramIndex = 2

  for (const key in modifiedUser) {
    if (key !== "id" && modifiedUser[key]) {
      updates.push(`${key}=$${paramIndex}`)
      values.push(modifiedUser[key])
      if (key !== "password") returning.push(key)
      paramIndex += 1
    }
  }

  if (updates.length === 0) throw new ApiError(400, "No fields to update")

  return {
    updateQuery: `update users set ${updates.join(
      ", "
    )} where id=$1 returning ${returning.join(", ")};`,
    values,
  }
}

const addToCartQueryGenerator = (userId: string, cart: cartType) => {
  const insertions: string[] = []
  const values: (string | number)[] = [userId]
  let paramIndex = 2

  for (const cartItem of cart) {
    insertions.push(`($${paramIndex},$${paramIndex + 1},$1)`)
    values.push(cartItem.id, cartItem.quantity)
    paramIndex += 2
  }

  return {
    insertQuery: `insert into cart_items(product_id,quantity,user_id) values ${insertions.join(
      ", "
    )} returning *`,
    values,
  }
}

const addToOdersQueryGenerator = (userId: string, orders: ordersType) => {
  const insertions: string[] = []
  const values: (string | number)[] = [userId]
  let paramIndex = 2

  for (const order of orders) {
    insertions.push(
      `($${paramIndex},$${paramIndex + 1},$${paramIndex + 2},$${
        paramIndex + 3
      },$${paramIndex + 4},$${paramIndex + 5},$${paramIndex + 6},$1)`
    )
    values.push(
      order.id,
      order.quantity,
      getCurrentDate(),
      "pending",
      order.total,
      order.paymentMethodId,
      order.addressId
    )
    paramIndex += 7
  }

  return {
    insertQuery: `insert into cart_items(product_id,quantity,order_date,status,total,payment_method_id,address_id,user_id) values ${insertions.join(
      ", "
    )} returning *`,
    values,
  }
}
