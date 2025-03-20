// business logic

import { ApiError } from "../../../helpers/api-generics.helpers"
import { getCurrentDate } from "../../../helpers/date.helpers"
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
  getUser,
  removeFromAddresses,
  removeFromCart,
  removeFromPaymentMethods,
  updateUser,
} from "./user.repo"
import {
  addressType,
  // cartType,
  ordersType,
  paymentMethodType,
  updateUserInputsType,
} from "./user.schemas"

export const updateUserService = async (
  updateUserInputs: updateUserInputsType,
  userId: string
) => {
  try {
    // const { updateQuery, values } = updateUserQueryGenerator({
    //   ...updateUserInputs,
    //   id: userId,
    // })
    // return (await updateUser(updateQuery, values)).data
  } catch (error) {
    throw error
  }
}

export const updateCartService = async (
  action: "add" | "remove",
  // cart: cartType,
  userId: string
) => {
  if (action == "add") {
    // const { insertQuery, values } = addToCartQueryGenerator(userId, cart)
    // return await addToCart(insertQuery, values)
  } else {
    // if (cart[0].id) return await removeFromCart(cart[0].id)
  }
}

export const updateOrdersService = async (
  action: "confirm" | "cancel",
  orders: ordersType,
  userId: string
) => {
  if (action == "confirm") {
    // const { insertQuery, values } = addToOdersQueryGenerator(userId, orders)
    // return await addToOrders(insertQuery, values)
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
