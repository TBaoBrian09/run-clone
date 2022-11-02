import React from "react"
import styled from "styled-components"

const ContainerFlex = styled.div`
    text-align: center;
    position: relative;
    margin-bottom: 20px;
     @media only screen and (max-width: 480px){
        margin-top: 5px;
    }
`
const Background = styled.img`
    display: block;
    top: 0px;
    left: 0px;
    // position: absolute;
    positon:relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    @media only screen and (max-width: 1024px){
        display: none;
    }
    @supports not ((-webkit-backdrop-filter: blur(3em)) or (backdrop-filter: blur(3em))) {
        background-color: rgba(16,17,51,0.9);
        -webkit-backdrop-filter: blur(3em);
        backdrop-filter: blur(3em);
        border-radius:20px;
        border: 1px solid rgba(255, 255, 255, 0.1)
    }
`
const Logo = styled.img`
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
const Wrapper = styled.div`
    display: block;
    top: 0px;
    left: 0px;
    // position: absolute;
    positon:relative;
    background-image: url("images/backgroundBanner.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
    padding-top:30px;
    padding-bottom:30px;
    @media only screen and (max-width: 1024px){
        background-image:none;
    }
    @media only screen and (min-width: 1920px){
        heigth:300px;
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
      color: ${({ theme }) => (theme.isDark ? '#fff' : '#101133')};
    }
    @media only screen and (max-width: 600px) {
        font-size: 21px;
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
      color: ${({ theme }) => (theme.isDark ? '#fff' : '#101133')};
    }
    
    @media only screen and (max-width: 600px) {
        font-size: 15px;
      }
`
const BannerHeader = () => {
    return(
        <ContainerFlex>
            <Wrapper>
                <Logo src="/images/logo-icon.png" alt="LiveTrade"/>
                <Title>Non-term saving</Title>
                <SubTitle>Stake tokens to earn. No-risk investment.</SubTitle>
           </Wrapper>
        
        </ContainerFlex>
    )
}

export default BannerHeader