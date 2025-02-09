import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type userStoreType = {
  user: {
    username: string
    mobile: number
    tokens: []
    authStatus: boolean
    cart: []
    orders: []
  }
  loginUser(): void
  logoutUser(): void
}

export const useUserStore = create<userStoreType>()(
  devtools(
    persist(
      set => ({
        user: {
          username: "",
          mobile: 0,
          tokens: [],
          authStatus: false,
          cart: [],
          orders: [],
        },
        loginUser: () =>
          set(state => ({ user: { ...state.user, authStatus: true } })),
        logoutUser: () =>
          set(state => ({ user: { ...state.user, authStatus: false } })),
      }),
      { name: "canopyUser" }
    )
  )
)
