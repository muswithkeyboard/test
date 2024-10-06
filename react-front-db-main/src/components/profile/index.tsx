import React from "react"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { MdAlternateEmail } from "react-icons/md"

export const Profile = () => {
  const current = useSelector(selectCurrent)

  if (!current) {
    return null
  }
  const { login, id } = current
  return (
    <div>
      <p className="text-default-bold flex items-center gap-2">{login}</p>
    </div>
  )
}
