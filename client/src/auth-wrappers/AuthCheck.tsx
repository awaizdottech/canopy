import React from "react"

interface AuthCheckProps {
  children: React.ReactNode
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  return <div>{children}</div>
}

export default AuthCheck
