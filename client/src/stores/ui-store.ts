import { create } from "zustand"
import { devtools } from "zustand/middleware"

type UIstore = {
  isLoginDialogOpen: boolean
  isRegisterDialogOpen: boolean
  snackbar: { message: string } | null
  theme: "light" | "dark"
  openLoginDialog: () => void
  closeRegisterDialog: () => void
  closeLoginDialog: () => void
  closeSnackbar: () => void
  changeTheme: () => void
}

const useUIstore = create<UIstore>()(
  devtools(
    set => ({
      isLoginDialogOpen: false,
      isRegisterDialogOpen: false,
      snackbar: null,
      theme: "dark",
      openLoginDialog: () =>
        set(
          {
            isLoginDialogOpen: true,
          },
          false,
          "openLoginDialog"
        ),
      closeRegisterDialog: () =>
        set(
          {
            isRegisterDialogOpen: false,
          },
          false,
          "closeRegisterDialog"
        ),
      closeLoginDialog: () =>
        set(
          {
            isLoginDialogOpen: false,
          },
          false,
          "closeLoginDialog"
        ),
      closeSnackbar: () =>
        set(
          {
            snackbar: null,
          },
          false,
          "closeSnackbar"
        ),
      changeTheme: () =>
        set(
          state => ({
            theme: state.theme == "dark" ? "light" : "dark",
          }),
          false,
          "changeTheme"
        ),
    }),
    { name: "uiStore" }
  )
)

export default useUIstore
