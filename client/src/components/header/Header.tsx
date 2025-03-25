import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MoreIcon from "@mui/icons-material/MoreVert"
import { useCallback, useState } from "react"
import Search from "./Search"
import useUserStore from "../../stores/user-store"
import { Link } from "react-router"
import MobileMenu from "./MobileMenu"
import ProfileMenu from "./ProfileMenu"
import Login from "../auth/login/Login"
import Register from "../auth/register/Register"
import CartIcon from "./CartIcon"
import ChangeThemeIcon from "./ChangeThemeIcon"

const Header = () => {
  console.log("header rendered")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)
  const authStatus = useUserStore(state => state.authStatus)

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    []
  )

  const handleProfileMenuClose = useCallback(() => setAnchorEl(null), [])

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
              component="span"
              noWrap
              color="textPrimary">
              Canopy
            </Typography>
          </Link>
          <Search />
          <Box style={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <ChangeThemeIcon />
            <CartIcon />
            {authStatus ? (
              <IconButton
                size="large"
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <Login />
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Register />
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
      />
      <ProfileMenu
        anchorEl={anchorEl}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuClose={handleProfileMenuClose}
      />
    </Box>
  )
}

export default Header
