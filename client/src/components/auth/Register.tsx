import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import PasswordInput from "./PasswordInput"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerSchema } from "../../schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"

type registerInputsType = z.infer<typeof registerSchema>

const Register = () => {
  console.log("register rendered")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerInputsType>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })
  console.log("register rendering", errors)
  const registerUser = (data: registerInputsType) => {
    try {
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <TextField
        id="username"
        label="Username"
        variant="standard"
        {...register("username")}
        helperText={errors.username?.message}
        error={Boolean(errors.username)}
      />
      <TextField
        id="email"
        type="email"
        label="Email"
        variant="standard"
        {...register("email")}
        helperText={errors.email?.message}
        error={Boolean(errors.email)}
      />
      <TextField
        id="mobile"
        type="tel"
        label="Mobile"
        variant="standard"
        {...register("mobile")}
        helperText={errors.mobile?.message}
        error={Boolean(errors.mobile)}
      />
      <PasswordInput
        {...register("password")}
        helperText={errors.password?.message}
        error={Boolean(errors.password)}
      />
      <PasswordInput
        label="Confirm Password"
        id="confirmPassword"
        {...register("confirmPassword")}
        helperText={errors.confirmPassword?.message}
        error={Boolean(errors.confirmPassword)}
      />
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Register"}
      </Button>
    </form>
  )
}

export default Register
