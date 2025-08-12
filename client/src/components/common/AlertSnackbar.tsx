import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { SyntheticEvent } from "react"
import useUIstore from "../../stores/ui-store"
import { envVariablesConfig } from "../../config/env-variablesConfig"

const AlertSnackbar = () => {
  const snackbar = useUIstore(state => state.snackbar)
  const closeSnackbar = useUIstore(state => state.closeSnackbar)

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return
    }

    closeSnackbar()
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(snackbar)}
      autoHideDuration={envVariablesConfig.snackbarAutoHideDuration}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}>
        {snackbar?.message}
      </Alert>
    </Snackbar>
  )
}

export default AlertSnackbar
