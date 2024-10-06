import type React from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../components/input"
import { Button, Link } from "@nextui-org/react"
import { useLazyCurrentQuery, useLoginMutation } from "../../app/service/userApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"

type Login = {
  login: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Login: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      login: "",
      password: "",
    },
  })
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery().unwrap()
      navigate('/')
    } catch (error) {
      if (hasErrorField(error)) {
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
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <div className="flex gap=2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
