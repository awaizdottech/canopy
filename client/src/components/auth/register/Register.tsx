import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import RegisterPasswordInput from "./RegisterPasswordInput"
import { z } from "zod"
import { registerSchema } from "../../../schemas/user.schemas"
import {
  openLoginFromRegister,
  registerUser,
} from "../../../services/user.services"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import SlideTransition from "../SlideTransition"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useUIstore from "../../../stores/ui-store"
import { Stack } from "@mui/material"

export type RegisterInputs = z.infer<typeof registerSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  return (
    <Dialog
      open={useUIstore(state => state.isRegisterDialogOpen)}
      onClose={useUIstore(state => state.closeRegisterDialog)}
      slots={{ transition: SlideTransition }}
      keepMounted
      aria-describedby="login dialog"
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit(registerUser),
        },
      }}>
      <DialogTitle>Register Form</DialogTitle>
      <DialogContent>
        <p>
          All required fields are indicated by * <br />
          and password must follow the following guidelines:
        </p>
        <ul>
          <li>6-18 characters long</li>
          <li>Include at least one lowercase letter</li>
          <li>Include at least one uppercase letter</li>
          <li>Include at least one special character from (@,$,!,%,*,?,&)</li>
          <li>Include at least one number</li>
        </ul>

        <Stack>
          <TextField
            id="username"
            label="Username*"
            variant="standard"
            {...register("username")}
            helperText={errors.username?.message}
            error={Boolean(errors.username)}
          />
          <TextField
            id="email"
            type="email"
            label="Email*"
            variant="standard"
            {...register("email")}
            helperText={errors.email?.message}
            error={Boolean(errors.email)}
          />
          <TextField
            id="mobile"
            type="tel"
            label="Mobile*"
            variant="standard"
            {...register("mobile")}
            helperText={errors.mobile?.message}
            error={Boolean(errors.mobile)}
          />
          <RegisterPasswordInput
            register={register}
            helperText={errors.password?.message}
            error={Boolean(errors.password)}
          />
          <RegisterPasswordInput
            register={register}
            label="Confirm Password*"
            id="confirmPassword"
            helperText={errors.confirmPassword?.message}
            error={Boolean(errors.confirmPassword)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={openLoginFromRegister}>Login</Button>
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Register
