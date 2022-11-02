
import React from "react";
import styled from "styled-components";
import { Text, Heading, Flex } from "@phamphu19498/runtogether-uikit"
import Container from "components/Layout/Container";
import { useTranslation } from "contexts/Localization";
import CountDownBlock from "../CountDown/CountDownBlock"

interface PropsHeader {
    pagetitle?:string
    title?:string
    subtitle?:string
  }

  const MembershipHeader: React.FC<PropsHeader> = ({ pagetitle, title, subtitle}) => {
      const { t } = useTranslation()
    return (
        <Wrapper>
            <ContainerBanner>
                <CustomContainer height="100%">
                    <Col style={{alignItems:"flex-start"}}>
                        <PageTitle>{pagetitle}</PageTitle>
                        <TextTitle>{title}</TextTitle>
                        <TextSubtle>{subtitle}</TextSubtle>
                    </Col>
                    {/* <ContainerCountDown>
                        <Flex flexDirection="column" justifyContent="center" alignItems="center">
                            <Text fontSize="24px" bold color="text" mb='0.5rem'>{t("STARTS IN")}</Text>
                            <CountDownBlock/>
                        </Flex>
                    </ContainerCountDown> */}
                </CustomContainer>
            </ContainerBanner>
        </Wrapper>
    )
}
export default MembershipHeader

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
    @media only screen and (max-width: 600px) {
        height: 333px;
    }
`
const CustomContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    @media only screen and (max-width: 600px) {
        padding-left:10px;
        padding-right:10px;
        flex-direction: column;
    }
`
const Col = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
        width:100%;
    }
`
const ContainerCountDown = styled(Col)`
    justify-content:center;
    align-items:flex-end;
    @media only screen and (max-width: 600px) {
        justify-content:center;
        align-items:center;
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
    width:auto;
`