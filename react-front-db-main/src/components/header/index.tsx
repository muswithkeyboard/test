import { useContext } from "react"
import { FaDatabase } from "react-icons/fa6"
import { ImExit } from "react-icons/im"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { LuSunMedium } from "react-icons/lu"
import { FaRegMoon } from "react-icons/fa"
import { Profile } from "../profile"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { SearchInput } from "../search-input"
import { SearchResultList } from "../search-result-list"

export const Header = () => {
  const [results, setResults] = useState([])
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }
  return (
    <Navbar>
      <div>
        <Link to={"/"}>
          <NavbarBrand>
            <FaDatabase className="text-xl" />
            <p className="font-bold text-inherit pl-3 text-xl"> База ТО</p>
          </NavbarBrand>
        </Link>
      </div>
      <div className="ml-10">
        <div style={{ position: "relative" }} className="max-w-full w-[450px]">
          <SearchInput setResults={setResults} />
        </div>
        <div style={{ position: "absolute" }}>
          <SearchResultList results={results} setResults={setResults} />
        </div>
      </div>

      <NavbarContent justify="end">
        <Profile />
        <NavbarItem
          className="lg:flex text-2xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <Button onClick={handleLogout}>
          {isAuthenticated && (
            <ImExit className="text-2xl cursor-pointer"></ImExit>
          )}
          Выход
        </Button>
      </NavbarContent>
    </Navbar>
  )
}
