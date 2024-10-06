import { useEffect } from "react"
import { Header } from "../header"
import { Container } from "../container"
import { useSelector } from "react-redux"
import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/user/userSlice"
import { Outlet, useNavigate } from "react-router-dom"

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
