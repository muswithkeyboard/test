import { Textarea } from "@nextui-org/react"

export const TextAreaTo = ({ name, defaultValue, onChange }: { name:string, defaultValue:string, onChange: any }) => {
  return (
    <div>
      <Textarea
        name={name}
        placeholder="Введите замечание"
        defaultValue={defaultValue}
        onChange = {onChange}
      
      ></Textarea>
    </div>
  )
}
