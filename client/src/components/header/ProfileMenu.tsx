import { Menu, MenuItem, Typography } from "@mui/material"
import { useCallback } from "react"
import useUserStore from "../../stores/user-store"
import { Link } from "react-router"
import { logoutUser } from "../../services/user.services"

type propsType = {
  anchorEl: HTMLElement | null
  handleProfileMenuClose: () => void
  handleMobileMenuClose: () => void
}

const ProfileMenu = ({
  anchorEl,
  handleProfileMenuClose,
  handleMobileMenuClose,
}: propsType) => {
  const handleLogout = useCallback(() => {
    logoutUser().then(() => handleMenuClose())
  }, [])

  const handleMenuClose = useCallback(() => {
    handleProfileMenuClose()
    handleMobileMenuClose()
  }, [])

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile">
          <Typography color="text.primary">Profile</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {useUserStore(state => state.user.role) == "admin" ? (
          <Link to="/admin">Dashboard</Link>
        ) : (
          "My Orders"
        )}
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )
}

export default ProfileMenu
