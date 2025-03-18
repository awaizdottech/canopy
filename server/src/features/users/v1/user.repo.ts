import pgPromise from "pg-promise"
import { db } from "../../../db/db"
import { ApiError } from "../../../helpers/api-generics.helpers"
import { paymentMethodType, updateUserInputsType } from "./user.schemas"

class UserRepoLayer {
  private db: pgPromise.IDatabase<any>

  constructor(db: pgPromise.IDatabase<any>) {
    this.db = db
  }

  updateUser = (updates: updateUserInputsType) => {}
}

// generic way to skip NULL/undefined values for strings:
// function str(column) {
//   return {
//       name: column,
//       skip: c => c.value === null || c.value === undefined
//   };
// }

// // Creating a reusable ColumnSet for all updates:
// const csGeneric = new pgp.helpers.ColumnSet([
//   str('string1'), str('string2'), str('string3'), str('string4'), str('string5'),
//   str('string6'), int('integer1'), int('integer2'), int('integer3'),
//   str('date1'), str('date2'), str('date3')
// ], {table: 'generic1'});

// // Your new request handler:
// async function updateRecord(req, res, next) {

//   const update = pgp.helpers.update(req.body, csGeneric) + ' WHERE id = ' +
//       parseInt(req.params.id);

//   try {
//           await db.none(update);
//           res.status(200);
//   } catch(err) {
//       return next(err);
//   }
// }

export const userRepoLayer = new UserRepoLayer(db)

// db operations
//  redone
export const getUser = async (
  identifier: "email" | "mobile" | "id", // unnecessary
  value: string
) => {
  try {
    if (identifier == "id")
      return await db.oneOrNone(`select * from users where id=$1`, [value])
    else if (identifier == "email")
      return await db.oneOrNone("select * from users where email=$1", [value])
    else
      return await db.oneOrNone("select * from users where mobile=$1", [value])
  } catch (error) {
    throw new ApiError(500, "failed to getUser")
  }
}

// redone
export const createUser = async (newUser: {
  username: string
  email: string
  password: string
  mobile: string
}) => {
  try {
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

// redone
export const getCart = async (userId: string) => {
  try {
    return await db.manyOrNone("select * from cart_items where user_id=$1", [
      userId,
    ])
  } catch (error) {
    throw new ApiError(500, "failed to getcart")
  }
}

// redone
export const addToCart = async (
  insertQuery: string,
  values: (string | number)[]
) => {
  try {
    console.log(insertQuery, values)

    return await db.manyOrNone(insertQuery, values)
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
    ]) // never delete any data
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
