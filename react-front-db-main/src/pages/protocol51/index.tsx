import { useFieldArray, useForm } from "react-hook-form"
import {
  ElementsIsHas,
  Sostoyanie,
  TypeAntennaRSS,
  TypeAntennasBS,
  TypeCablePower,
  TypeCombainers,
  TypeFider,
  TypeOutBlock,
  TypeVOK,
} from "../../app/myStore"
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { hasErrorField } from "../../utils/has-error-field"
import { useParams } from "react-router-dom"
import { useGetToByIdQuery, useUpdateToMutation } from "../../app/service/toApi"
import { useState } from "react"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { TemplateHandler } from "easy-template-x"
import { saveFile } from "../../features/saveFile"
import { RiDeleteBinLine } from "react-icons/ri"
import { FaPlus } from "react-icons/fa"

type FormValues = {
  checkAntennas: {
    sector: string
    typeAntennaBs: string
    count: string
    azimut: string
    tilt: string
    ret: string
    typeBlock: string
  }[]
  checkRRC: {
    sector: string
    typeAntennaRRC: string
    count: string
    azimut: string
  }[]
  useDevices: {
    name: string
    number: string
    dateCalib: string
    numberSvid: string
  }[]
  resultBS: string
  resultRF: string
  resultFider: string
  resultGermetiz: string
  resultVOK: string
  resultCombainers: string
  resultCabelRost: string
  typeFiderBS: string
  typeVOKtoRF: string
  typeACRF: string
  typeGrozCombainer: string
}

export const Protocol51To = () => {
  const params = useParams<{ id: any }>()
  const { data } = useGetToByIdQuery(params.id ?? "")
  const [to] = useUpdateToMutation()
  const [error, setError] = useState("")

  if (!data) {
    return <h2>Протокола не существует</h2>
  }
  const { placeNumber, createdAt, fio, protocol51, address } = data
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormValues>({
    defaultValues: {
      checkAntennas: protocol51.checkAntennas,
      checkRRC: protocol51.checkRRC,
      useDevices: protocol51.useDevices,
      resultBS: protocol51.resultBS,
      resultRF: protocol51.resultRF,
      resultFider: protocol51.resultFider,
      resultGermetiz: protocol51.resultGermetiz,
      resultVOK: protocol51.resultVOK,
      resultCombainers: protocol51.resultCombainers,
      resultCabelRost: protocol51.resultCabelRost,
      typeFiderBS: protocol51.typeFiderBS,
      typeVOKtoRF: protocol51.typeVOKtoRF,
      typeACRF: protocol51.typeACRF,
      typeGrozCombainer: protocol51.typeGrozCombainer,
    },
  })
  const {
    fields: antennasFields,
    append: antennasAppend,
    remove: antennasRemove,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFieldArray({ control, name: "checkAntennas" })
  const {
    fields: rrcFields,
    append: rrckAppend,
    remove: rrcRemove,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFieldArray({ control, name: "checkRRC" })
  const {
    fields: devFields,
    append: devAppend,
    remove: devRemove,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFieldArray({ control, name: "useDevices" })

  const onSubmit = async (result: FormValues) => {
    try {
      await to({ toData: { protocol51: result }, id: params.id }).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
    window.location.reload()
  }
  const DownloadDocFile = async () => {
    const request = await fetch("/template51.docx")
    const templateFile = await request.blob()
    const data = JSON.parse(JSON.stringify(protocol51))
    data.fio = fio
    data.placeNumber = placeNumber
    data.address = address
    data.createdAt = formatToClientDate(createdAt)
    console.log(data)
    const handler = new TemplateHandler()
    const doc = await handler.process(templateFile, data)
    saveFile(
      `BTS_${placeNumber}_Протокол_5_1_от_${formatToClientDate(createdAt)}.docx`,
      doc,
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button onClick={DownloadDocFile}>Преобразовать в .doc</Button>
        <p className="text-center text-3xl mb-5 mt-5">
          Приложение 5.1. Акт проверки АФУ
        </p>
        <p className="text-xl mb-5 mt-10">
          Проверка антенн БС, радиоблоков БС распределенной архитектуры:
        </p>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="w-1">Сектор</TableColumn>
            <TableColumn>Тип антенн БС</TableColumn>
            <TableColumn className="w-1">Кол-во</TableColumn>
            <TableColumn className="w-5">Азимут</TableColumn>
            <TableColumn className="w-5">
              Угол наклона
              <br /> мех/эл
            </TableColumn>
            <TableColumn>Наличие RET</TableColumn>
            <TableColumn>Тип выносного блока</TableColumn>
            <TableColumn className="w-1">1</TableColumn>
          </TableHeader>
          <TableBody>
            {antennasFields.map((field: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(
                        `checkAntennas.${index}.sector` as const,
                        {},
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      key={index}
                      defaultSelectedKeys={[field.typeAntennaBs]}
                      {...register(
                        `checkAntennas.${index}.typeAntennaBs` as const,
                        {},
                      )}
                    >
                      {TypeAntennasBS.map((value: any) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(`checkAntennas.${index}.count` as const, {})}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(
                        `checkAntennas.${index}.azimut` as const,
                        {},
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(`checkAntennas.${index}.tilt` as const, {})}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      key={index}
                      defaultSelectedKeys={[field.ret]}
                      {...register(`checkAntennas.${index}.ret` as const, {})}
                    >
                      {ElementsIsHas.map((value: any) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      key={index}
                      defaultSelectedKeys={[field.typeBlock]}
                      {...register(
                        `checkAntennas.${index}.typeBlock` as const,
                        {},
                      )}
                    >
                      {TypeOutBlock.map((value: any) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <button type="button" onClick={() => antennasRemove(index)}>
                      <RiDeleteBinLine />
                    </button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Button
          type="button"
          onClick={() =>
            antennasAppend({
              sector: "",
              typeAntennaBs: "",
              count: "",
              azimut: "",
              tilt: "",
              ret: "",
              typeBlock: "",
            })
          }
          className="mt-2"
        >
          <FaPlus />
        </Button>
        <div className="mt-5">
          <Select
            label="Результат проверки антенн базовой станции, RET"
            {...register("resultBS")}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2">
          <Select
            label="Результат проверки радиоблоков БС распределенной архитектуры"
            {...register("resultRF")}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-2 mt-2">
          <Select
            label="Тип фидера БС"
            placeholder="Выбери тип фидера БС"
            selectionMode="multiple"
            {...register("typeFiderBS")}
          >
            {TypeFider.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Тип ВОК до радиоблока"
            placeholder="Выбери тип ВОК до радиоблока"
            selectionMode="multiple"
            {...register("typeVOKtoRF")}
          >
            {TypeVOK.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Тип кабеля питания радиоблока"
            placeholder="Выбери тип кабеля питания радиоблока"
            selectionMode="multiple"
            {...register("typeACRF")}
          >
            {TypeCablePower.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2">
          <Select
            label="Результат проверки фидера, джамп-кабеля"
            {...register("resultFider")}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2">
          <Select
            label="Проверка герметизации"
            {...register("resultGermetiz")}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2">
          <Select
            label="Результат проверки кабельной оптической сборки ВОК"
            {...register("resultVOK")}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2">
          <Select
            label="Тип грозозащиты, комбайнеров, МШУ и др"
            placeholder="Выбери тип грозозащиты, комбайнеров, МШУ и др"
            selectionMode="multiple"
               {...register("typeGrozCombainer")}
          >
            {TypeCombainers.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2">
          <Select
            label="Результат проверки грозозащиты, комбайнеров, МШУ, заземления и др."
            {...register("resultCombainers")}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2">
          <Select
            label="Результат проверки кабель-ростов"

            {...register("resultCabelRost")}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <p className="text-xl mb-5 mt-10">Проверка антенн РРС</p>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Направление</TableColumn>
            <TableColumn>Тип антенн</TableColumn>
            <TableColumn>Кол-во</TableColumn>
            <TableColumn>Азимут</TableColumn>
            <TableColumn>1</TableColumn>
          </TableHeader>
          <TableBody>
            {rrcFields.map((field: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(`checkRRC.${index}.sector` as const, {})}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      key={index}
                      defaultSelectedKeys={[field.typeAntennaBs]}
                      {...register(
                        `checkRRC.${index}.typeAntennaRRC` as const,
                        {},
                      )}
                    >
                      {TypeAntennaRSS.map((value: any) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(`checkRRC.${index}.count` as const, {})}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(`checkRRC.${index}.azimut` as const, {})}
                    />
                  </TableCell>
                  <TableCell>
                    <button type="button" onClick={() => rrcRemove(index)}>
                      <RiDeleteBinLine />
                    </button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Button
          type="button"
          onClick={() =>
            rrckAppend({
              sector: "",
              typeAntennaRRC: "",
              count: "",
              azimut: "",
            })
          }
          className="mt-2"
        >
          <FaPlus />
        </Button>
        <div className="mt-5">
          <Select
            label="Результат проверки антенн РРС"
            defaultSelectedKeys={""}
          >
            {Sostoyanie.map((value: any) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <p className="text-xl mb-5 mt-10">Используемые средства измерений</p>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Наименование прибора</TableColumn>
            <TableColumn>Заводской №</TableColumn>
            <TableColumn>
              Дата поверки <br />
              (калибровки)
            </TableColumn>
            <TableColumn>№ Свидетельства о поверке</TableColumn>
            <TableColumn>1</TableColumn>
          </TableHeader>
          <TableBody>
            {devFields.map((field: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(`useDevices.${index}.name` as const, {})}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(`useDevices.${index}.number` as const, {})}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(
                        `useDevices.${index}.dateCalib` as const,
                        {},
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      {...register(
                        `useDevices.${index}.numberSvid` as const,
                        {},
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <button type="button" onClick={() => devRemove(index)}>
                      <RiDeleteBinLine />
                    </button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Button
          type="button"
          onClick={() =>
            devAppend({
              name: "",
              number: "",
              dateCalib: "",
              numberSvid: "",
            })
          }
          className="mt-2"
        >
          <FaPlus />
        </Button>
        <div className="flex gap-2 justify-end mb-10">
          <Button type="submit" className="mt-5">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
