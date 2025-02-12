import { Navigate } from "react-router"
import useUserStore from "../store/user-store"

const AdminCheck = ({ children }: { children: React.ReactNode }) => {
  const authStatus = useUserStore(state => state.authStatus)
  const role = useUserStore(state => state.user.role)
  console.log("adminckeck ran", authStatus)

  return authStatus && role ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/register" />
  )
}

export default AdminCheck
