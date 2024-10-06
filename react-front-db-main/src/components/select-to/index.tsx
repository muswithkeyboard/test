import { Select, SelectItem } from "@nextui-org/react"
import { Sostoyanie } from "../../app/myStore"



export const SelectTo = ({defaultvalue}:{defaultvalue:string}) => {
  const selectValues=Sostoyanie 
  return (
    <>

      <Select label="выберите состояние" defaultSelectedKeys={[defaultvalue]} >
      {selectValues.map((value:any) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>))}
      </Select>
    </>
  )
}



