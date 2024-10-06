import { useForm } from "react-hook-form"
import { Sostoyanie } from "../../app/myStore"
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react"
import { hasErrorField } from "../../utils/has-error-field"
import { useParams } from "react-router-dom"
import { useGetToByIdQuery, useUpdateToMutation } from "../../app/service/toApi"
import { useState } from "react"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { TemplateHandler } from "easy-template-x"
import { saveFile } from "../../features/saveFile"

type FormValues = {
  checkSostoyania: {
    pp: string
    desc: string
    sostoyanie: string
    zamechanie: string
  }[]
}

export const Protocol12To = () => {
  const params = useParams<{ id: any }>()
  const { data } = useGetToByIdQuery(params.id ?? "")
  const [to] = useUpdateToMutation()
  const [error, setError] = useState("")

  if (!data) {
    return <h2>Протокола не существует</h2>
  }
  const { placeNumber, createdAt, fio, protocol12, address } = data
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormValues>({
    defaultValues: {
      checkSostoyania: protocol12.checkSostoyania,
    },
    mode: "onBlur",
  })

  const onSubmit = async (result: FormValues) => {
    try {
      await to({ toData: { protocol12: result }, id: params.id }).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
    window.location.reload()
  }
  const DownloadDocFile = async () => {
    const request = await fetch("/template12.docx")
    const templateFile = await request.blob()
    const data = JSON.parse(JSON.stringify(protocol12))
    data.fio = fio
    data.placeNumber = placeNumber
    data.address = address
    data.createdAt = formatToClientDate(createdAt)
    const handler = new TemplateHandler()
    const doc = await handler.process(templateFile, data)
    saveFile(
      `BTS_${placeNumber}_Протокол_1_2_от_${formatToClientDate(createdAt)}.docx`,
      doc,
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button onClick={DownloadDocFile}>Преобразовать в .doc</Button>
        <p className="text-center text-3xl mb-5 mt-5">
          Приложение 1.2. Сводный протокол проверки инфраструктуры ТКШ 
        </p>

        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>№ п/п</TableColumn>
            <TableColumn>Наименование работ</TableColumn>
            <TableColumn>Отметка о состоянии</TableColumn>
            <TableColumn>Замечания</TableColumn>
          </TableHeader>
          <TableBody>
            {protocol12.checkSostoyania.map(
              (field: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell width={10}>{field.pp}</TableCell>
                    <TableCell width={480}>{field.desc}</TableCell>
                    <TableCell>
                      <Select
                        label="выберите состояние"
                        defaultSelectedKeys={[field.sostoyanie]}
                        {...register(
                          `checkSostoyania.${index}.sostoyanie` as const,
                          {},
                        )}
                      >
                        {Sostoyanie.map((value: any) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="Введите замечание"
                        defaultValue={field.zamechanie}
                        {...register(
                          `checkSostoyania.${index}.zamechanie` as const,
                          {},
                        )}
                      ></Textarea>
                    </TableCell>
                  </TableRow>
                )
              },
            )}
          </TableBody>
        </Table>
       
        <div className="flex gap=2 justify-end mb-10">
          <Button type="submit" className="mt-5">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
