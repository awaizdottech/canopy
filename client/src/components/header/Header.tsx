import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
} from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LoginIcon from "@mui/icons-material/Login"
import MoreIcon from "@mui/icons-material/MoreVert"
import { useCallback, useState } from "react"
import Search from "./Search"
import useUserStore from "../../store/user-store"
import { Link } from "react-router"
import MobileMenu from "./MobileMenu"
import AvatarMenu from "./AvatarMenu"

const Header = () => {
  console.log("header rendered")

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)
  const menuId: string = "primary-search-account-menu"
  const mobileMenuId: string = "primary-search-account-menu-mobile"
  const authStatus = useUserStore(state => state.authStatus)
  const cartCount = useUserStore(state => state.user.cart).length

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    []
  )

  const handleMobileMenuClose = useCallback(
    () => setMobileMoreAnchorEl(null),
    []
  )

  const handleMobileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      setMobileMoreAnchorEl(event.currentTarget),
    []
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: "none", sm: "block" } }}
              color="textPrimary">
              Canopy
            </Typography>
          </Link>
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/cart">
              <IconButton size="large" aria-label="show cart">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            {authStatus ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <Link to="/register">
                <IconButton size="large" edge="end" aria-label="login button">
                  <LoginIcon />
                </IconButton>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        mobileMenuId={mobileMenuId}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
      />
      <AvatarMenu
        anchorEl={anchorEl}
        handleMobileMenuClose={handleMobileMenuClose}
        menuId={menuId}
        setAnchorEl={setAnchorEl}
      />
    </Box>
  )
}

export default Header
