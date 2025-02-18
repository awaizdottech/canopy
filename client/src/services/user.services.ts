import { loginInputsType } from "../components/auth/Login"
import { registerInputsType } from "../components/auth/Register"
import useProductStore from "../store/products-store"
import useUserStore from "../store/user-store"
import { superAxios } from "../utils"

export const registerAndLoginUser = async (data: registerInputsType) => {
  const { confirmPassword, ...rest } = data
  try {
    const response = await superAxios("post", "/users/add", rest)
    console.log(response.data)
    useUserStore.setState(state => ({
      authStatus: true,
      user: {
        ...rest,
        role:
          localStorage.getItem("admin") == data.email ? "admin" : "customer",
        tokens: {},
        cart: [...state.user.cart],
        orders: [],
      },
    }))
  } catch (error) {
    console.error(error)
  }
}

export const loginUser = async (data: loginInputsType) => {
  try {
    const response = await superAxios("post", "/user/login", data)
    console.log(response.data)
    useUserStore.setState(state => ({
      authStatus: true,
      user: {
        email: data.email ? data.email : "nice@dummy.com",
        mobile: data.mobile ? data.mobile : "9876543210",
        username: "awaiz",
        role:
          localStorage.getItem("admin") == data.email ? "admin" : "customer",
        tokens: {},
        cart: state.user.cart,
        orders: [],
      },
    }))
  } catch (error) {
    console.error(error)
  }
}

// export const getCart = () => {
//   // in both header & product details components I dont have to implement this kinda logic but because I'm using this basically static function I'm not able to do stuff dynamically like not able to update badge on cart icon, not able to disable & change add to cart button etc
//   if (useUserStore.getState().authStatus)
//     return useUserStore.getState().user?.cart
//   return JSON.parse(sessionStorage.getItem("cart") || "[]")
// }

// export const addToCart = (productId: string) => {
//   if (useUserStore.getState().authStatus) {
//     useUserStore.setState(state => ({
//       user: { ...state.user!, cart: [...state.user!.cart, productId] },
//     }))
//   } else {
//     const cart = JSON.parse(sessionStorage.getItem("cart") || "[]")
//     cart.push(productId)
//     sessionStorage.setItem("cart", JSON.stringify(cart))
//   }
// }

export const getCartItems = (cartItemsIDs: number[]) => {
  return cartItemsIDs.map(id => useProductStore.getState().products.get(id))
}

export const getOrderItems = (orderItemsIDs: number[]) => {
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
