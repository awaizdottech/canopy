import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Badge, IconButton, Menu, MenuItem } from "@mui/material"
import { Link } from "react-router"
import useUserStore from "../../stores/user-store"
import Login from "../auth/login/Login"
import useCartStore from "../../stores/cart-store"

type propsType = {
  mobileMoreAnchorEl: HTMLElement | null
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
  handleMobileMenuClose: () => void
}
const MobileMenu = ({
  mobileMoreAnchorEl,
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
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <Link to="/cart">
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Badge
              badgeContent={useCartStore(state => state.cart).length}
              color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Link>
      {authStatus ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <Link to="/profile">
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </Link>
        </MenuItem>
      ) : (
        <MenuItem>
          <Login />
          <p>Login</p>
        </MenuItem>
      )}
    </Menu>
  )
}

export default MobileMenu
