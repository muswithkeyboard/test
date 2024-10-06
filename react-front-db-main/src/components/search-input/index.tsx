import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useGetAllPlaceQuery } from "../../app/service/placeApi"
import { Input } from "@nextui-org/react"

export const SearchInput = ({ setResults }:{ setResults:any }) => {
  const [input, setInput] = useState("")
  const { data: places } = useGetAllPlaceQuery()
  // const onBlur = () => setResults([])

  const fetchData = (value: string) => {
    const result = places?.filter(place => {
      return (
        value &&
        place &&
        place.number &&
        place.number.toLowerCase().includes(value)
      )
    })
      setResults(result)
    
  }

  const handleChange = (value: string) => {
    setInput(value)
    fetchData(value)
  }

  return (
    <>
      <div className="input wrapper">
        <Input
          // onBlur={onBlur}
          startContent={<FaSearch className="mr-1" />}
          placeholder="Введите № площадки"
          value={input}
          onChange={e => handleChange(e.target.value)}
        />
      </div>
      <div></div>
    </>
  )
}
