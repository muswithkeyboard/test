import { useCreateToMutation } from "../../app/service/toApi"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../error-message"
import { Button } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { Protocol11Data, Protocol12Data, Protocol32Data, Protocol51Data } from "../../app/myStore"

export const CreateTo = ({
  number,
  id,
  address,
}: {
  number: string
  id: any
  address: string
}) => {
  const [createTo] = useCreateToMutation()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.to?.message as string
  const onSubmit = handleSubmit(async data => {
    try {
      await createTo({
        placeNumber: number,
        address: address,
        protocol11: Protocol11Data,
        protocol12: Protocol12Data,
        protocol32: Protocol32Data,
        protocol51: Protocol51Data,
        protocol52: Protocol11Data,
        protocol61: Protocol11Data,
        protocol10: Protocol11Data,
      }).unwrap()
      //
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <form onSubmit={onSubmit}>
      {errors && <ErrorMessage error={error} />}
      <div className="p-2">
        <Button endContent={<IoMdCreate />} type="submit" className="w-full">
          Добавить ТО
        </Button>
      </div>
    </form>
  )
}
