import { Outlet } from "react-router"
import "./App.css"
import { Header } from "./components"
import { Box, CssBaseline } from "@mui/material"

const App = () => {
  console.log("app rendered")

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}>
      <CssBaseline />
      <Header />
      <Outlet />
    </Box>
  )
}

export default App
