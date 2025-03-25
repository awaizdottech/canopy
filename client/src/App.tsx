import { Outlet } from "react-router"
import "./App.css"
import { Header } from "./components"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import AlertSnackbar from "./components/common/AlertSnackbar"
import useUIstore from "./stores/ui-store"

const App = () => {
  console.log("app rendered")
  const theme = useUIstore(state => state.theme)

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: theme,
        },
      })}>
      <main>
        <CssBaseline />
        <Header />
        <Outlet />
        <AlertSnackbar />
      </main>
    </ThemeProvider>
  )
}

export default App
