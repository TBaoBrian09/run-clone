import { Button, Flex, InputGroup, Text } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -18px;
  flex-direction: column;
  max-width: 1200px;
  @media screen and (max-width: 1024px) {
    padding: 0 50px; 
  }
  @media screen and (max-width: 600px) {
    padding: 0 16px;    
  }
`

export const Wrapper = styled.div`
  position: relative;
  padding: 0px 2rem 2rem 2rem;
  border-radius: 20px;
  box-shadow: 0px 10px 14px -48px rgb(31 47 70 / 12%);
  background: #FCFCFD;

  @media screen and (max-width: 1024px) {
    padding: 2rem 30px;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem 0px;    
  }
`


export const WrapAppBody = styled.div`
  position: relative;
  /* max-width: 600px; */
  width: 100%;
  z-index: 5;
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0px 54px 54px -48px rgba(31, 47, 70, 0.12);
  @media only screen and (max-width: 600px) {
    margin-left: 16px;
    margin-right: 16px;
    width: 98%;
    /* padding: 0px; */
  }
`

export const ViewControls = styled(Flex)`
width: 50%;
height: 70px;
align-items: center;
justify-content: space-between;
flex-wrap:wrap;
@media screen and (min-width: 769px) and (max-width: 1080px) {
    height: auto;
    width: 55%;
}
@media screen and (min-width: 601px) and (max-width: 768px) {
    height: auto;
    width: 100%;
}
@media screen and (max-width: 768px) {
    height: auto;
}

@media screen and (max-width: 600px) {
    height: auto;
    flex-direction: column-reverse;
    width: 100%;
}
`

export const IconButton = styled(Button)<{isActive?:boolean}>`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background: ${({ isActive }) => isActive ? "#FF592C" : "transparent" };
    box-shadow:none;
    border:2px solid ${({ isActive }) => isActive ? "none" : "#E6E8EC" };
`

export const CustomInputGroup = styled(InputGroup)`
    width: 305px;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius:12px;
    background: transparent !important;
    > input {
        background: transparent !important;
        border: none;
        height: 48px;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export const TextCard = styled(Text)`
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`