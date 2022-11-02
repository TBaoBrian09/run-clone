import React from "react"
import styled from "styled-components"

const ContainerFlex = styled.div`
    text-align: center;
    position: relative;
    background: transparent;
    padding-bottom: 30px;
    margin: 20px;
    margin-top: 0;

    @media only screen and (max-width: 480px){
        margin-top: 5px;
    }
`
const Background = styled.img`
    display: block;
    top: 0px;
    left: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;

    @media only screen and (max-width: 1025px){
        display: none;
    }
`
const Logo = styled.img`
    margin-bottom: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 100;
    width: 6%;
    @media only screen and (max-width: 480px){
        width: 30%;
    }
    @media only screen and (min-width: 481px) and (max-width: 768px){
        width: 15%;
    }
`
const Title = styled.h1`
    margin: 0px auto;
    position: relative;
    z-index: 100;
    color: #fff;
    font-weight: 600;
    line-height: 1.5;
    font-size: 38px;
    @media only screen and (max-width: 1025px) {
        font-size: 20px;
        color: ${({ theme }) => theme.colors.textSubtle};
      }
`
const SubTitle = styled.p`
    color: #fff;
    font-size: 24px;
    z-index: 100;
    margin: 0px auto;
    position: relative;
    font-weight: normal;
    line-height: 1.5;
    font-weigth:400;
    @media only screen and (max-width: 1025px) {
        font-size: 15px;
        color: ${({ theme }) => theme.colors.textSubtle};
    }
`
export interface Proptype {
    title: string
    subTitle: string
  }
const BannerFarm:React.FC<Proptype> = ({title, subTitle}) => {
  return (
    <ContainerFlex>
        <Background src="/images/backgroundBanner.jpg" alt="Livetrade" />
        <Logo src="/logo.png" alt="Livetrade" />
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle> }
        
    </ContainerFlex>
  )
}

export default BannerFarm
