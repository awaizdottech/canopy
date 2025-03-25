import { z } from "zod"
import { loginSchema } from "../../../schemas/user.schemas"
import {
  loginUser,
  openRegisterFromLogin,
} from "../../../services/user.services"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import LoginPasswordInput from "./LoginPasswordInput"
import SlideTransition from "../SlideTransition"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import LoginIcon from "@mui/icons-material/Login"
import useUIstore from "../../../stores/ui-store"
import Stack from "@mui/material/Stack"

export type LoginInputs = z.infer<typeof loginSchema>

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  })

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="login button"
        onClick={useUIstore(state => state.openLoginDialog)}>
        <LoginIcon />
      </IconButton>

      <Dialog
        open={useUIstore(state => state.isLoginDialogOpen)}
        onClose={useUIstore(state => state.closeLoginDialog)}
        slots={{ transition: SlideTransition }}
        keepMounted
        aria-describedby="login dialog"
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit(loginUser),
          },
        }}>
        <DialogTitle>Login Form</DialogTitle>
        <DialogContent>
          <p>All required fields are indicated by *</p>
          <Stack>
            <TextField
              id="emailOrMobile"
              type="emailOrMobile"
              label="Email or Mobile no.*"
              variant="standard"
              {...register("emailOrMobile")}
              helperText={errors.emailOrMobile?.message}
              error={Boolean(errors.emailOrMobile)}
            />
            <LoginPasswordInput
              register={register}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={openRegisterFromLogin}>Register</Button>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Login
