import { Menu, MenuItem } from "@mui/material"
import { useCallback } from "react"
import useUserStore from "../../store/user-store"

type propsType = {
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  handleMobileMenuClose: () => void
  menuId: string
}

const AvatarMenu = ({
  anchorEl,
  setAnchorEl,
  handleMobileMenuClose,
  menuId,
}: propsType) => {
  const isMenuOpen = Boolean(anchorEl)
  const logout = useUserStore(state => state.logoutUser)

  const handleLogout = useCallback(() => {
    logout()
    sessionStorage.clear()
    handleMenuClose()
  }, [])

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }, [])

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )
}

export default AvatarMenu
