import { GiStabbedNote } from "react-icons/gi";
import { NavButton } from '../nav-button'

export const NavBar = () => {
  return (
    <nav>
        <ul className='flex  flex-col mt-10'>
            <li>
                <NavButton href='protocol11' icon={<GiStabbedNote />}>
                   Приложение 1.1
                </NavButton>
            </li>
            <li>
                <NavButton href='protocol12' icon={<GiStabbedNote />}>
                   Приложение 1.2
                </NavButton>
            </li>
            <li>
                <NavButton href='protocol32' icon={<GiStabbedNote />}>
                    Приложение 3.2
                </NavButton>
            </li>
            <li>
                <NavButton href='protocol51' icon={<GiStabbedNote />}>
                    Приложение 5.1
                </NavButton>
            </li>
        </ul>

    </nav>
  )
}
