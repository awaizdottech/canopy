import { db } from "../../.."
import { ApiError } from "../../../helpers/api-standards"
import { paymentMethodType } from "./user.schemas"

// db operations

export const getUserIfExists = async (
  identifier: "email" | "mobile" | "id",
  value: string
) => {
  try {
    if (identifier == "id")
      return await db.oneOrNone("select * from users where id=$1", [value])
    else if (identifier == "email")
      return await db.oneOrNone("select * from users where email=$1", [value])
    else
      return await db.oneOrNone("select * from users where mobile=$1", [value])
  } catch (error) {
    throw new ApiError(500, "failed to getUserIfExists")
  }
}

export const createUser = async (newUser: {
  username: string
  email: string
  password: string
  mobile: string
}) => {
  try {
    console.log("reached user repo createuser")

    return await db.one(
      "insert into users(username, email, password, mobile, role_id) values ($1, $2, $3,$4, $5) returning id,username, email, mobile;",
      [newUser.username, newUser.email, newUser.password, newUser.mobile, 1]
    )
  } catch (error) {
    throw new ApiError(500, "failed to createUser.")
  }
}

export const updateUser = async (updateQuery: string, values: string[]) => {
  try {
    return await db.one(updateQuery, values)
  } catch (error) {
    throw new ApiError(500, "failed to updateUser")
  }
}

export const getCart = async (userId: string) => {
  try {
    return await db.any("select * from cart_items where user_id=$1", [userId])
  } catch (error) {
    throw new ApiError(500, "failed to getcart")
  }
}

export const addToCart = async (
  insertQuery: string,
  values: (string | number)[]
) => {
  try {
    console.log(insertQuery, values)

    return await db.any(insertQuery, values)
  } catch (error) {
    throw new ApiError(500, "failed to addToCart")
  }
}

export const removeFromCart = async (cartItemId: number) => {
  // TODO: temp in param
  try {
    return await db.one("delete from cart_items where id=$1 returning *", [
      cartItemId,
    ])
  } catch (error) {
    throw new ApiError(500, "failed to removeFromCart")
  }
}

export const getRole = async (roleId: string) => {
  try {
    return await db.one("select role from roles where id=$1", [roleId])
  } catch (error) {
    throw new ApiError(500, "failed to getAddresses")
  }
}

export const getOrders = async (userId: string) => {
  try {
    return await db.any("select * from orders where user_id=$1", [userId])
  } catch (error) {
    throw new ApiError(500, "failed to getOrders")
  }
}

export const addToOrders = async (
  insertQuery: string,
  values: (string | number)[]
) => {
  try {
    return await db.any(insertQuery, values)
  } catch (error) {
    throw new ApiError(500, "failed to addToOrders")
  }
}

export const getAddresses = async (userId: string) => {
  try {
    return await db.any("select * from addresses where user_id=$1", [userId])
  } catch (error) {
    throw new ApiError(500, "failed to getAddresses")
  }
}

export const addToAddresses = async (details: {
  userId: string
  address: string
}) => {
  try {
    return await db.any(
      "insert into addresses(user_id,address) values ($1,$2) returning *",
      [details.userId, details.address]
    )
  } catch (error) {
    throw new ApiError(500, "failed to addToAddresses")
  }
}

export const removeFromAddresses = async (addressId: string) => {
  try {
    return await db.one("delete from addresses where id=$1 returning *", [
      addressId,
    ])
  } catch (error) {
    throw new ApiError(500, "failed to removeFromAddresses")
  }
}

export const getPaymentMethods = async (userId: string) => {
  try {
    return await db.any("select * from payment_methods where user_id=$1", [
      userId,
    ])
  } catch (error) {
    throw new ApiError(500, "failed to getPaymentMethods")
  }
}

export const addToPaymentMethods = async (
  details: paymentMethodType & {
    userId: string
  }
) => {
  try {
    return await db.any(
      "insert into payment_methods(user_id,card_number,expiry_date,cvv,name_on_card) values ($1,$2,$3,$4,$5) returning *",
      [
        details.userId,
        details.cardNumber,
        details.expiryDate,
        details.cvv,
        details.nameOnCard,
      ]
    )
  } catch (error) {
    throw new ApiError(500, "failed to addToPaymentMethods")
  }
}

export const removeFromPaymentMethods = async (paymentMethodId: string) => {
  try {
    return await db.one("delete from payment_methods where id=$1 returning *", [
      paymentMethodId,
    ])
  } catch (error) {
    throw new ApiError(500, "failed to removeFromPaymentMethods")
  }
}
