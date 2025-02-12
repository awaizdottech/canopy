import { ReactNode } from "react"
import useUserStore from "../store/user-store"
import { Navigate } from "react-router"

const AuthCheck = ({ children }: { children: ReactNode }) => {
  const authStatus = useUserStore(state => state.authStatus)
  console.log("authckeck ran", authStatus)

  return authStatus ? <div>{children}</div> : <Navigate to="/register" />
}

export default AuthCheck
