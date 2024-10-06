import type React from 'react'

type Props = {
    children: React.ReactElement[] | React.ReactElement
}

export const Container: React.FC<Props> = ({children}) => {
  return (
    <div>{children}</div>
  )
}
