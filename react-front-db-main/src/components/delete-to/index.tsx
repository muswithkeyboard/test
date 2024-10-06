import React from "react"
import { useDeleteToMutation } from "../../app/service/toApi"
import { RiDeleteBinLine } from "react-icons/ri"

export const DeleteTo = ({ id }:{ id:any }) => {
  const [deleteTo] = useDeleteToMutation()

  const handleDelete = async () => {
    try {
      await deleteTo(id).unwrap();
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="cursor-pointer text-xl" onClick={handleDelete}>
      {<RiDeleteBinLine />}
    </div>
  )
}
