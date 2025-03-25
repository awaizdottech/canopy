import { create } from "zustand"
import { devtools } from "zustand/middleware"

type UserStore = {
  user: {
    username: string
    email: string
    mobile: string
    role: "admin" | "customer"
  }
  authStatus: boolean
}

const useUserStore = create<UserStore>()(
  devtools(
    () => ({
      authStatus: false,
      user: {
        username: "dummy",
        email: "dummy",
        mobile: "dummy",
        role: "customer",
      },
    }),
    { name: "users" }
  )
)

export default useUserStore
