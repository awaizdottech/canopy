import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LoginIcon from "@mui/icons-material/Login"
import { Badge, IconButton, Menu, MenuItem } from "@mui/material"
import { Link } from "react-router"
import useUserStore from "../../store/user-store"

type propsType = {
  mobileMoreAnchorEl: HTMLElement | null
  mobileMenuId: string
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
  handleMobileMenuClose: () => void
}
const MobileMenu = ({
  mobileMoreAnchorEl,
  mobileMenuId,
  handleProfileMenuOpen,
  handleMobileMenuClose,
}: propsType) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const authStatus = useUserStore(state => state.authStatus)

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <Link to="/cart">
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit">
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Link>
      {authStatus ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <Link to="/register">
          <MenuItem>
            <IconButton size="large" aria-label="login button" color="inherit">
              <LoginIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>
        </Link>
      )}
    </Menu>
  )
}

export default MobileMenu
