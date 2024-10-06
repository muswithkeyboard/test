import { Card } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

export const SeachResult = ({ result, setResults }:{ result:any, setResults:any }) => {
  const navigate = useNavigate()
  const handleChangeResults = () => {
    navigate(`places/${result.id}`)
    setResults([])
  }
  return (
    <Card>
    <div className="cursor-pointer pl-10 pr-10 pb-2 pt-2 " onClick={handleChangeResults}>
      {result.number} {result.address}
    </div>
    </Card>
  )
}
