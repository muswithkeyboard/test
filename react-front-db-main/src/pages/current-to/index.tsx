import { Outlet, useParams } from "react-router-dom"
import { useGetToByIdQuery } from "../../app/service/toApi"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { Card, CardBody } from "@nextui-org/react"
import { NavBar } from "../../components/nav-bar"
import { Container } from "../../components/container"

export const CurrentTo = () => {
  const params = useParams<{ id: any }>()
  const { data } = useGetToByIdQuery(params.id ?? "")
  if (!data) {
    return <h2> </h2>
  }
  const { placeNumber, createdAt, updatedAt, fio } = data
  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-10">
        <Card>
          <CardBody>
            <div className="flex justify-between">
              <div>Площадка ТО: {placeNumber}</div>
              <div>Дата создания: {formatToClientDate(createdAt)}</div>
              <div>Дата обновления: {formatToClientDate(updatedAt)}</div>
              <div>ФИО: {fio}</div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex max-w-screen-xl mx-auto mt-5">
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Container>
            <Outlet  />
          </Container>
        </div>
      </div>
    </>
  )
}
