import WbSunnyIcon from "@mui/icons-material/WbSunny"
import IconButton from "@mui/material/IconButton"
import useUIstore from "../../stores/ui-store"
import NightsStayIcon from "@mui/icons-material/NightsStay"

const ChangeThemeIcon = () => {
  const changeTheme = useUIstore(state => state.changeTheme)
  const theme = useUIstore(state => state.theme)

  return (
    <IconButton onClick={changeTheme}>
      {theme == "dark" ? <WbSunnyIcon /> : <NightsStayIcon />}
    </IconButton>
  )
}

export default ChangeThemeIcon
