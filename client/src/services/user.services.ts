import { loginInputsType } from "../components/auth/login/Login"
import { registerInputsType } from "../components/auth/register/Register"
import useProductStore, { productType } from "../store/products-store"
import useUserStore from "../store/user-store"
import { superAxios } from "../utils"

export const registerAndLoginUser = async (data: registerInputsType) => {
  const { confirmPassword, ...rest } = data
  try {
    const response = await superAxios("post", "/users/register", {
      ...rest,
      cart: [...useUserStore.getState().user.cart],
    })
    const dbUser = response.data.data.user

    useUserStore.setState({
      authStatus: true,
      user: { ...dbUser, refreshToken: dbUser.refresh_token },
    })
  } catch (error) {
    console.error(error)
  }
}

export const loginUser = async (data: loginInputsType) => {
  try {
    const { emailOrMobile, ...passwordObj } = data

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const mobileRegex = /^(\+?91|0)?[6-9]\d{9}$/

    type loginDataType = {
      password: string
      loginType?: "email" | "mobile"
      email?: string
      mobile?: string
    }
    const loginData = passwordObj as loginDataType

    if (emailRegex.test(emailOrMobile)) {
      loginData.loginType = "email"
      loginData.email = emailOrMobile
    }
    if (mobileRegex.test(emailOrMobile)) {
      loginData.loginType = "mobile"
      loginData.mobile = emailOrMobile
    }

    const response = await superAxios("post", "/users/login", loginData)
    const dbUser = response.data.data.user
    console.log(dbUser)
    useUserStore.setState({
      authStatus: true,
      user: { ...dbUser, refreshToken: dbUser.refresh_token },
    })
  } catch (error) {
    console.error(error)
  }
}

export const getCartItems = (
  cartItems: { product_id: string; quantity: number }[]
) => {
  return cartItems.map(item =>
    useProductStore.getState().products.get(item.product_id)
  )
}

export const getCartItemsTotal = (cartItems: productType[]) => {
  return cartItems.reduce((total, product) => {
    if (product.availabilityStatus !== "Out of Stock")
      return total + product.price
    else return total
  }, 0)
}

export const getOrderItems = (orderItemsIDs: string[]) => {
  return orderItemsIDs.map(id => useProductStore.getState().products.get(id))
}

export const confirmOrder = (orderItemsIDs: number[], username: string) => {
  try {
    if (localStorage.getItem("allOrders")) {
      const allOrders = JSON.parse(localStorage.getItem("allOrders")!)
      orderItemsIDs.forEach(orderId => {
        if (allOrders[orderId]) allOrders[orderId].push(username)
        else allOrders[orderId] = [username]
      })
      localStorage.setItem("allOrders", JSON.stringify(allOrders))
    } else {
      const allOrders: { [key: number]: string[] } = {}
      orderItemsIDs.forEach(orderId => (allOrders[orderId] = [username]))
      localStorage.setItem("allOrders", JSON.stringify(allOrders))
    }

    alert("orders placed")
    useUserStore.setState(
      state => ({
        user: {
          ...state.user,
          orders: [],
        },
      }),
      false,
      "emptyPlacedOrders"
    )
  } catch (error) {
    console.error("Error updating orders:", error)
    alert("Error updating orders:")
  }
}

export const getOrderedItems = () => {
  const allOrders = JSON.parse(localStorage.getItem("allOrders") ?? "[]")
  const allOrdersIDs = Object.keys(allOrders)
  return {
    orderedItems: allOrdersIDs.map((orderId: string) =>
      useProductStore.getState().products.get(orderId)
    ),
    allOrders,
  }
}

export const isProductInCart = (
  id: string,
  cart: { id: string; quantity: number }[]
): boolean => {
  let check = false
  cart.forEach(item => (item.id == id ? (check = true) : (check = false)))
  return check
}
