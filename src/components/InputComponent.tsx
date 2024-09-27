import React from 'react'
import { Input } from 'antd'

type InputProps = {
    text?: string, 
    placeholder?: string,
    setPost?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?:string,
    readOnly?:boolean
}

const InputComponent: React.FC<InputProps> = (props) => {
  return (
    <Input {...props} className={props.className} />
  )
}

export default InputComponent