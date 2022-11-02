import React from "react";
import styled from "styled-components";
import { Text, Flex, Input } from "@phamphu19498/runtogether-uikit";

interface Props{
    text?:string,
    btncopy?:any
}

const InputReferal:React.FC<Props> = ({text,btncopy})=>{
    return (
        <>
       <CustomInput>{text}</CustomInput>
       {btncopy && <BtnCopy>COPIED</BtnCopy> }
       </>
    ) 
}

const CustomInput = styled.div`
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 1rem;
    font-weight: 600;
    border-radius: 8px;
    &:focus{
      border: 2px solid #6C5DD3;
      border-radius: 8px;
      background:#fff;
    }
`
const BtnCopy = styled.button`
  padding: 8px 8px 6px;
  gap: 10px;
  background: #23262F;
  border-radius: 4px;
`
export default InputReferal