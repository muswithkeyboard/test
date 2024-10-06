import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
// import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Auth } from "./pages/auth"
import { Layout } from "./components/layout"
import { AuthGuard } from "./features/user/authGuard"
import { CurrentPlace } from "./pages/current-place"
import { CurrentTo } from "./pages/current-to"
import { Protocol11To } from "./pages/protocol11"
import { Protocol32To } from "./pages/protocol32"
import { Protocol12To } from "./pages/protocol12"
import { Protocol51To } from "./pages/protocol51"


const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "places/:id",
        element: < CurrentPlace />
      },
      {
        path: "to/:id",
        element: <CurrentTo />,
        children: [
          {
            path: "protocol11",
            element: <Protocol11To />
          },
          {
            path: "protocol12",
            element: <Protocol12To />
          },
          {
            path: "protocol32",
            element: <Protocol32To />
          },
          {
            path: "protocol51",
            element: <Protocol51To />
          },
        ]
      },
    ]
  }
 
])
if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
