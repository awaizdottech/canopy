import { LoginInputs } from "../components/auth/login/Login"
import { RegisterInputs } from "../components/auth/register/Register"
import { StatusCodes } from "../config/status-codes.config"
import restApi from "../helpers/rest-api"
import { dbUserSchema } from "../schemas/user.schemas"
import useCartStore from "../stores/cart-store"
import useProductStore, { productType } from "../stores/products-store"
import useUIstore from "../stores/ui-store"
import useUserStore from "../stores/user-store"

export const registerUser = async (data: RegisterInputs) => {
  const { confirmPassword, ...rest } = data

  const response = await restApi("/auth/register", "post", {
    ...rest,
    cart: [...useCartStore.getState().cart],
  })

  if (response?.status == StatusCodes.Success) openLoginFromRegister()
}

export const loginUser = async (data: LoginInputs) => {
  console.log("loginUser data", data)

  const response = await restApi("/auth/login", "post", {
    ...data,
    cart: [...useCartStore.getState().cart],
  })

  if (response?.status == StatusCodes.Success) {
    const validation = dbUserSchema.safeParse(response?.data.data)
    console.log(response)
    if (validation.success) {
      useUserStore.setState(
        {
          authStatus: true,
          user: validation.data,
        },
        false,
        "login"
      )
      useUIstore.setState({ isLoginDialogOpen: false })
    }
  }
}

export const logoutUser = async () => {
  await restApi("/auth/logout")
  useUserStore.setState(
    {
      authStatus: false,
      user: {
        username: "dummy",
        email: "dummy",
        mobile: "dummy",
        role: "customer",
      },
    },
    false,
    "logoutUser"
  )
}

export const openLoginFromRegister = () => {
  useUIstore.setState({
    isRegisterDialogOpen: false,
    isLoginDialogOpen: true,
  })
}

export const openRegisterFromLogin = () => {
  useUIstore.setState({
    isRegisterDialogOpen: true,
    isLoginDialogOpen: false,
  })
}

export const getCartItems = (
  cartItems: { productId: number; quantity: number }[]
) => {
  return cartItems.map(item =>
    useProductStore.getState().products.get(item.productId)
  )
}

export const getCartItemsTotal = (cartItems: productType[]) => {
  return cartItems.reduce((total, product) => {
    if (product.availabilityStatus !== "Out of Stock")
      return total + product.price
    else return total
  }, 0)
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

export const getOrderedItems = async () => {
  const allOrders = JSON.parse(localStorage.getItem("allOrders") ?? "[]")
  const allOrdersIDs = Object.keys(allOrders)
  console.log(await restApi("/orders"))
  return {
    orderedItems: allOrdersIDs.map((orderId: string) =>
      useProductStore.getState().products.get(Number(orderId))
    ),
    allOrders,
  }
}

export const isProductInCart = (
  id: number,
  cart: { id: number; quantity: number }[]
): boolean => {
  let check = false
  cart.forEach(item => (item.id == id ? (check = true) : (check = false)))
  return check
}

// export const updateCartItemQuantity=(action:'increase'|'decrease',itemID:number)=>{
//   const cart=useUserStore.getState().user.cart
//   if(action=='increase') cart.forEach(item=>item.)
// }
