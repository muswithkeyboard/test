import {Checkbox} from "@nextui-org/react";


export const CheckBox = ({name, desc, defaultSelected, value}: {name: string, desc: string, defaultSelected: boolean, value:string}  ) => {
  return (
    <Checkbox className="ml-5" name={name} defaultSelected={defaultSelected} value={value}>{desc} </Checkbox>
  )
}
