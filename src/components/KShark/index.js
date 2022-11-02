import styled from 'styled-components'
import { Text } from '../Pancake-uikit'

export const Hero = styled.div`
  margin-bottom: 22px;
  > h1 {
    font-weight: 900;
    font-size: 30px;
    line-height: 41px;
    /* identical to box height */
    letter-spacing: -0.114286px;
  }
  > div {
    line-height: 22px;
    font-weight: 600;
  }
`

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 10px;
  background:transparent;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  
  @media only screen and (max-width: 480px){
    width: 100%;
    padding-left:2px;
    padding-right:2px;
    justify-content: center;
  }
  @media only screen and (max-width: 768px){
    flex-wrap: wrap;
    justify-content: center;
  }

  @media only screen and (min-width: 481px) and (max-width: 1269px){
    justify-content: center;
    
  }
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Text} {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.3px;
    color: #fff;
    @media only screen and (max-width: 480px){
      margin-left: 0px;
      font-size: 13px !important;
    }
  }

  @media only screen and (max-width: 480px){
   font-size:13px !important;
  }
`

export const LabelWrapper = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  > ${Text} {
    font-size: 12px;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
  @media only screen and (max-width: 480px){
    justify-content: center !important;
    padding:0px !important;
  }
`

export const ViewControls = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 40%;
  flex-direction: row;
  > div {
    padding: 8px 0px;
  }
  @media only screen and (min-width: 600px) and (max-width: 1080px) {
    width:60%;
    justify-content: space-around;
  }
  @media only screen and (max-width: 768px){
    width:100% !important;
    margin-bottom:1rem;
  }
  @media only screen and (max-width: 480px){
    justify-content: space-between !important;
    margin-bottom:1rem;
  }

`

export const SortText = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: #fff;
  min-width: 50px;
  /* text-transform: uppercase; */
`
