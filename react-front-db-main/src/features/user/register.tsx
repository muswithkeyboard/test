import type React from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../components/input"
import { Button} from "@nextui-org/react"
import { useRegisterMutation } from "../../app/service/userApi"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"


type Register = {
  login: string
  surname: string
  firstname: string
  secondname: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Register: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      login: "",
      surname: "",
      firstname: "",
      secondname: "",
      password: "",
    },
  })
  const [register, {isLoading}] = useRegisterMutation();
  const [error, setError] = useState("")


  const onSubmit = async (data: Register) => {
    try {
        await register(data).unwrap();
        setSelected('login')
    } catch (error) {
      if(hasErrorField(error)){
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="login"
        label="Логин"
        type="text"
        required="Обязательное поле"
      />
        <Input
        control={control}
        name="surname"
        label="Фамилия"
        type="text"
        required="Обязательное поле"
      />
       <Input
        control={control}
        name="firstname"
        label="Имя"
        type="text"
        required="Обязательное поле"
      />
       <Input
        control={control}
        name="secondname"
        label="Отчество"
        type="text"
        required="Обязательное поле"
      />
      
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <div className="flex gap=2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
