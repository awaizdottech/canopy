import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "../../../schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "../../../services/user.services"
import { Button, TextField } from "@mui/material"
import LoginPasswordInput from "./LoginPasswordInput"
import SelectLoginType from "./SelectLoginType"

export type loginInputsType = z.infer<typeof loginSchema>

const Login = () => {
  console.log("login rendered")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInputsType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  })

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <SelectLoginType register={register} error={Boolean(errors.loginType)} />
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
      <LoginPasswordInput
        register={register}
        helperText={errors.password?.message}
        error={Boolean(errors.password)}
      />
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Login"}
      </Button>
    </form>
  )
}

export default Login
