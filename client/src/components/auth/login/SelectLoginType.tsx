import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { useState } from "react"
import { UseFormRegister } from "react-hook-form"
import { loginInputsType } from "./Login"

const SelectLoginType = (
  register: UseFormRegister<loginInputsType>,
  error?: boolean
) => {
  const [loginType, setLoginType] = useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setLoginType(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error}>
        <InputLabel id="loginTypeLabel">Login Type</InputLabel>
        <Select
          labelId="loginTypeLabel"
          id="loginType"
          value={loginType}
          label="Login Type"
          {...register("loginType")}
          onChange={handleChange}>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="mobile">Mobile</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectLoginType
