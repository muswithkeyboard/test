import { useForm } from "react-hook-form"
import { ElementsIsHas, Sostoyanie } from "../../app/myStore"
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
  checkInventary: {
    label: string
    nalichie: string
  }[]
  checkMarkirov: {
    label: string
    nalichie: string
  }[]
  checkNakleek: {
    label: string
    nalichie: string
  }[]
  checkDocuments: {
    label: string
    nalichie: string
  }[]
}

export const Protocol11To = () => {
  const params = useParams<{ id: any }>()
  const { data } = useGetToByIdQuery(params.id ?? "")
  const [to] = useUpdateToMutation()
  const [error, setError] = useState("")

  if (!data) {
    return <h2>Протокола не существует</h2>
  }
  const { placeNumber, createdAt, fio, protocol11, address } = data
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormValues>({
    defaultValues: {
      checkSostoyania: protocol11.checkSostoyania,
      checkInventary: protocol11.checkInventary,
      checkMarkirov: protocol11.checkMarkirov,
      checkNakleek: protocol11.checkNakleek,
      checkDocuments: protocol11.checkDocuments,
    },
    mode: "onBlur",
  })

  const onSubmit = async (result: FormValues) => {
    try {
      await to({ toData: { protocol11: result }, id: params.id }).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
    window.location.reload()
  }
  const DownloadDocFile = async () => {
    const request = await fetch("/template11.docx")
    const templateFile = await request.blob()
    const data = JSON.parse(JSON.stringify(protocol11))
    data.fio = fio
    data.placeNumber = placeNumber
    data.address = address
    data.createdAt = formatToClientDate(createdAt)
    const handler = new TemplateHandler()
    const doc = await handler.process(templateFile, data)
    saveFile(
      `BTS_${placeNumber}_Протокол_1_1_от_${formatToClientDate(createdAt)}.docx`,
      doc,
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button onClick={DownloadDocFile}>Преобразовать в .doc</Button>
        <p className="text-center text-3xl mb-5 mt-5">
          Приложение 1.1. Сводный протокол проверки инфраструктуры
        </p>

        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>№ п/п</TableColumn>
            <TableColumn>Наименование работ</TableColumn>
            <TableColumn>Отметка о состоянии</TableColumn>
            <TableColumn>Замечания</TableColumn>
          </TableHeader>
          <TableBody>
            {protocol11.checkSostoyania.map((field: any, index: number) => {
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
            })}
          </TableBody>
        </Table>
        <p className="text-center text-2xl m-5">Проверка инвентаря</p>
        <div className="grid grid-cols-3 gap-1">
          {protocol11.checkInventary.map((item: any, index: number) => {
            return (
              <Select
                key={index}
                label={item.label}
                defaultSelectedKeys={[item.nalichie]}
                {...register(`checkInventary.${index}.nalichie` as const, {})}
                className="mt-1"
              >
                {ElementsIsHas.map((value: any) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </Select>
            )
          })}
        </div>
        <p className="text-center text-2xl m-5">
          Проверка маркировки оборудования
        </p>
        <div className="grid grid-cols-3 gap-1">
          {protocol11.checkMarkirov.map((item: any, index: number) => {
            return (
              <Select
                key={index}
                label={item.label}
                defaultSelectedKeys={[item.nalichie]}
                {...register(`checkMarkirov.${index}.nalichie` as const, {})}
                className="mt-1"
              >
                {ElementsIsHas.map((value: any) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </Select>
            )
          })}
        </div>
        <p className="text-center text-2xl m-5">
          Проверка наличия информационных наклеек
        </p>
        <div className="grid grid-cols-2 gap-1">
          {protocol11.checkNakleek.map((item: any, index: number) => {
            return (
              <Select
                key={index}
                label={item.label}
                defaultSelectedKeys={[item.nalichie]}
                {...register(`checkNakleek.${index}.nalichie` as const, {})}
                className="mt-1"
              >
                {ElementsIsHas.map((value: any) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </Select>
            )
          })}
        </div>
        <p className="text-center text-2xl m-5">Проверка документации</p>
        <div className="grid grid-cols-2 gap-1">
          {protocol11.checkDocuments.map((item: any, index: number) => {
            return (
              <Select
                key={index}
                label={item.label}
                defaultSelectedKeys={[item.nalichie]}
                {...register(`checkDocuments.${index}.nalichie` as const, {})}
                className="mt-1"
              >
                {ElementsIsHas.map((value: any) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </Select>
            )
          })}
        </div>
        <div className="flex gap=2 justify-end mb-10">
          <Button type="submit" className="mt-5">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
