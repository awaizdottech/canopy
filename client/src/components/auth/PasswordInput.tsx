import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Input from "@mui/material/Input"
import InputAdornment from "@mui/material/InputAdornment"
import { useCallback, useState } from "react"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

type propsType = { label?: string; id?: string }

const PasswordInput = ({ label = "Password", id = "password" }: propsType) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = useCallback(
    () => setShowPassword(show => !show),
    []
  )
  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(),
    []
  )
  const handleMouseUpPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(),
    []
  )

  return (
    <>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  )
}

export default PasswordInput
