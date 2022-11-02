import React from "react";
import styled from "styled-components";
import { Text, Heading, Flex } from "@phamphu19498/runtogether-uikit"
import Container from "components/Layout/Container";

interface PropsHeader {
    pagetitle?:string
    title?:string
    subtitle?:string
    image?:string
  }

  
const Header: React.FC<PropsHeader> = ({ pagetitle, title, subtitle, image }) => {
    return (
        <Wrapper>
            <ContainerBanner>
                <CustomContainer height="100%">
                    <Col style={{alignItems:"flex-start"}}>
                        <PageTitle>{pagetitle}</PageTitle>
                        <TextTitle>{title}</TextTitle>
                        <TextSubtle>{subtitle}</TextSubtle>
                    </Col>
                    <ContainerImg style={{alignItems:"flex-end"}}>
                        <Img src={image} alt="mask-banner"/>
                    </ContainerImg>
                </CustomContainer>
            </ContainerBanner>
        </Wrapper>
    )
}
export default Header

const Wrapper = styled.div`
    width:100%;
    background:${({ theme }) => theme.colors.background};
    display:flex;
    justify-content:center;
    flex-direction: column;
`
const ContainerBanner = styled.div`
    width:100%;
    background:  url("/images/mask-bg-exchange.svg"), ${({ theme }) => theme.colors.gradients.bgSecondary} fixed;
    height: 222px;
`
const CustomContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    @media only screen and (max-width: 600px) {
        padding-left:10px;
        padding-right:10px;
    }
`
const Col = styled.div`
    width:50%;
    height:100%;
    display:flex;
    justify-content:center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
        width:100%;
    }
`
const ContainerImg = styled(Col)`
    @media only screen and (max-width: 600px) {
        display:none;
    }
`
const PageTitle = styled(Text)`
    font-weight: bold;
    font-size: 48px;
    line-height: 65px;
    color:${({ theme }) => theme.colors.primaryBright};
`
const TextTitle = styled(Text)`
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    color:${({ theme }) => theme.colors.textSecondary};
    @media only screen and (max-width: 600px) {
        font-size: 20px; 
    }
`
const TextSubtle = styled(Text)`
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color:${({ theme }) => theme.colors.textThird};
    @media only screen and (max-width: 600px) {
        font-size: 16px; 
    }
`
const Img = styled.img`
    height:100%;
    width: auto;
`