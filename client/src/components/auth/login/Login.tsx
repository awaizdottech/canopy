import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "../../../schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "../../../services/user.services"
import { Button, TextField } from "@mui/material"
import LoginPasswordInput from "./LoginPasswordInput"

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
      <TextField
        id="emailOrMobile"
        type="emailOrMobile"
        label="Email or Mobile no."
        variant="standard"
        {...register("emailOrMobile")}
        helperText={errors.emailOrMobile?.message}
        error={Boolean(errors.emailOrMobile)}
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
