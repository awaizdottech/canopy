import { db } from "../../.."

// db operations
let user

export const getUserIfExists = async (
  identifier: "email" | "mobile",
  value: string
) => {
  try {
    if (identifier == "email")
      return db.oneOrNone("select * from where email=$1", [value])
    else return db.oneOrNone("select * from where mobile=$1", [value])
  } catch (error) {
    throw error
  }
}

export const createUser = async (newUser: {
  uesrname: string
  email: string
  password: string
  mobile: string
  refresh_token: string
}) => {
  try {
    return db.one(
      "insert into users(uesrname, email, password, mobile, role_id, refresh_token) values ($1, $2, $3,$4, $5, $6) returning (uesrname, email, mobile, role_id)",
      [
        newUser.uesrname,
        newUser.email,
        newUser.password,
        newUser.mobile,
        1,
        newUser.refresh_token,
      ]
    )
  } catch (error) {
    throw error
  }
}

export const updateUserDetails = async () => {
  try {
    return db.one("update users set $2=$3 where id=$1", [])
  } catch (error) {
    throw error
  }
}

export const addToCart = async () => {
  try {
  } catch (error) {
    throw error
  }
}

export const removeFromCart = async () => {
  try {
  } catch (error) {
    throw error
  }
}

export const addToOrders = async () => {
  try {
  } catch (error) {
    throw error
  }
}
