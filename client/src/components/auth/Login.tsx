import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import PasswordInput from "./PasswordInput"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema, registerSchema } from "../../schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "../../services/user.services"

export type loginInputsType = z.infer<typeof loginSchema>

const Register = () => {
  console.log("register rendered")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInputsType>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  return (
    <form onSubmit={handleSubmit(loginUser)}>
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
        register={register}
        helperText={errors.password?.message}
        error={Boolean(errors.password)}
      />
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Register"}
      </Button>
    </form>
  )
}

export default Register
