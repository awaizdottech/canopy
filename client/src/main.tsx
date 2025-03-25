import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { RouterProvider, createBrowserRouter } from "react-router"
import {
  AdminPortal,
  Cart,
  Checkout,
  Home,
  ErrorPage,
  ProductDetails,
  Profile,
  UserDashboard,
} from "./components/pages/index.ts"
import AuthCheck from "./components/auth/wrappers/AuthCheck.tsx"
import AdminCheck from "./components/auth/wrappers/AdminCheck.tsx"

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />, // doesnt catch errors thrown in event handlers or useEffect
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "dashboard",
        element: (
          <AuthCheck>
            <UserDashboard />
          </AuthCheck>
        ),
      },
      {
        path: "checkout",
        element: (
          <AuthCheck>
            <Checkout />
          </AuthCheck>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminCheck>
            <AdminPortal />
          </AdminCheck>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthCheck>
            <Profile />
          </AuthCheck>
        ),
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
