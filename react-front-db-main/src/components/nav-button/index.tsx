import { Button } from "../button"
import { Link } from "react-router-dom"
import type React from "react"

type Probs = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

export const NavButton: React.FC<Probs> = ({ children, icon, href }) => {
  return (
    <Link to={href}>
      <Button className="flex justify-start text-x1" icon={icon}>
        {children}
      </Button>
    </Link>
  )
}
