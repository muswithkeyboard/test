import { useParams } from "react-router-dom"
import { useGetPlaceByIdQuery } from "../../app/service/placeApi"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { FiEdit } from "react-icons/fi"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react"
import { CreateTo } from "../../components/create-to"
import { DeleteTo } from "../../components/delete-to"
import { FaDownload } from "react-icons/fa6"

export const CurrentPlace = () => {
  const params = useParams<{ id: any }>()
  const { data } = useGetPlaceByIdQuery(params.id ?? "")
  if (!data) {
    return <h2> </h2>
  }
  const { number, id, to, address } = data
  return (
    <>
      <div className="flex max-w-screen-xl mx-auto mt-20">
        <div className="flex-1 p-4">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Площадка</TableColumn>
              <TableColumn>ФИО ответственного за ТО</TableColumn>
              <TableColumn>Дата проведения</TableColumn>
              <TableColumn>Действия</TableColumn>
            </TableHeader>
            <TableBody>
              {to.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.placeNumber}</TableCell>
                    <TableCell>{item.fio}</TableCell>
                    <TableCell>{formatToClientDate(item.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex justify-between ">
                        <div>
                          <FaDownload className="text-xl" />
                        </div>
                        <div>
                          <Link href={`/to/${item.id}`}>
                            <FiEdit className="text-xl" />
                          </Link>
                        </div>
                        <div>
                          <DeleteTo id={item.id} />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <div className="mr-10">
          <Card className="w-[250px] p-2">
            <CardHeader className="flex gap-3">
              <div className="">
                <p>Площадка</p>
                <p className="text-big text-bold text-3xl">{number}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Адрес</p>
              <p className="text-big text-bold">{address}</p>
            </CardBody>
            <Divider />
            <CreateTo number={number} id={id} address={address} />
            <Divider />
            <CardFooter>
              {/* <Link isExternal showAnchorIcon href="#">
                Неиспарвности
              </Link> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
