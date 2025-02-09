import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import PasswordInput from "./PasswordInput"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerSchema } from "../../schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"

type registerInputsType = z.infer<typeof registerSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerInputsType>({
    resolver: zodResolver(registerSchema),
  })
  const registerUser = (data: object) => {
    console.log(data)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(registerUser)}>
      <TextField id="username" label="username" variant="standard" required />
      <TextField
        id="email"
        type="email"
        label="email"
        variant="standard"
        required
        {...register("email")}
        helperText={errors.email && errors.email.message}
      />
      <TextField
        id="mobile"
        type="tel"
        label="mobile number"
        variant="standard"
        required
      />
      <PasswordInput />
      <PasswordInput label="Confirm Password" id="confirmPassword" />
      <Button disabled={isSubmitting} onClick={registerUser}>
        {isSubmitting ? "Loading..." : "Register"}
      </Button>
    </Box>
  )
}

export default Register
