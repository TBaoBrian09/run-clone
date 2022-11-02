import React from "react"
import styled from "styled-components"

const ContainerFlex = styled.div`
    text-align: center;
    position: relative;
    margin-bottom: 30px;
     @media only screen and (max-width: 480px){
        margin-top: 5px;
    }
    width:100%;
`
const Logo = styled.img`
    position: relative;
    z-index: 100;
    width: 6%;
    @media only screen and (max-width: 480px){
        width: 36%;
    }
    @media only screen and (min-width: 481px) and (max-width: 768px){
        width: 10%;
    }
`
const Wrapper = styled.div`
    display: flex;
    top: 0px;
    left: 0px;
    positon:relative;
    background-image: url("images/backgroundBanner.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
    padding-top:50px;
    padding-bottom:50px;
    @media only screen and (max-width: 1080px){
        background-image:none;
    }
    @media only screen and (min-width: 1920px){
        heigth:300px;
    }
    @media only screen and (max-width: 500px){
        background-size:auto;
        padding-top:50px;
        padding-bottom:50px;
    }
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const Title = styled.h1`
    margin: 0px auto;
    position: relative;
    z-index: 100;
    color: #fff;
    font-weight: 600;
    line-height: 1.5;
    font-size: 38px;
    @media only screen and (max-width: 1024px) {
        font-size: 28px;
        color: ${({ theme }) => theme.colors.text};
        margin-top:20px;
      }
`
interface HeaderPropTyle {
    title:string
  }
const Header: React.FC<HeaderPropTyle> = ({title}) => {
    return(
        <ContainerFlex>
            <Wrapper>
                <Logo src="/images/logo-icon.png" alt="LiveTrade"/>
                <Title>Exchange</Title>
           </Wrapper> 
        
        </ContainerFlex>
    )
}

export default Header