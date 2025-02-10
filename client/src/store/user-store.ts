import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type userStoreType = {
  user: {
    username: string
    mobile: number
    tokens: {}
    authStatus: boolean
    cart: string[]
    orders: []
  }
  loginUser(): void
  logoutUser(): void
  addToCart(productId: string): void
}

const useUserStore = create<userStoreType>()(
  devtools(
    persist(
      set => ({
        user: {
          username: "",
          mobile: 0,
          tokens: {},
          authStatus: false,
          cart: [],
          orders: [],
        },
        loginUser: () =>
          set(state => ({ user: { ...state.user, authStatus: true } })),
        logoutUser: () =>
          set(state => ({ user: { ...state.user, authStatus: false } })),
        addToCart: (productId: string) =>
          set(state => ({
            user: { ...state.user, cart: [...state.user.cart, productId] },
          })),
      }),
      {
        name: "canopyUser",
        partialize: state => ({ tokens: state.user.tokens }),
      }
    )
  )
)

export default useUserStore
