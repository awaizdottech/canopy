import React from "react"

interface AdminCheckProps {
  children: React.ReactNode
}

const AdminCheck = ({ children }: AdminCheckProps) => {
  return <div>{children}</div>
}

export default AdminCheck
