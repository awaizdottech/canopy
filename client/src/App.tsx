import { Outlet } from "react-router"
import "./App.css"
import { Footer, Header } from "./components"
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
      <Footer />
    </Box>
  )
}

export default App
