import React from "react";
import { Flex, Text } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { CoreTagIcon } from "components/Pancake-uikit"

interface StakeActionProps {
    tokenStake?:any
    tokenEarn?:any
    tokenStore?:any
}

const CardHeading: React.FC<StakeActionProps> = ({ tokenStore,tokenStake, tokenEarn}) => {
    const imgTokenStaked = `/images/coins/${tokenStake.address[56]}.png`
    const imgTokenEarn = `/images/coins/${tokenEarn.address[56]}.png`
    return(
        <Container>
            <Wrap>
                <Flex justifyContent="center">
                    <ContainerImg>
                        <TokenStake src={imgTokenStaked} alt="token staked"/>
                        <TokenEarn src={imgTokenEarn} alt="token earn"/>
                    </ContainerImg>
                </Flex>
                <Content justifyContent='space-between' paddingRight='10px' marginRight='10px'>
                    <Flex  flexDirection="column" justifyContent="flex-start">
                        <Text color="#fff" bold fontSize="20px">{tokenStore}</Text>
                        <Text color="#fff" bold fontSize="16px">Stake {tokenStake.symbol}</Text>
                        <Text color="#fff" >Earn {tokenEarn.symbol} and more</Text>
                    </Flex>
                </Content>
            </Wrap>
        </Container>
    )
}  
export default CardHeading

const Container = styled(Flex)`
    flex-direction:row;
    height: 140px;
    width: 100%;
    align-items:center;
    justify-content:center; 
    background:url("/images/invest/bg_card_heading.png");
    background-size:cover;
    background-size: 100% 100%;
    background-repeat:no-repeat;
    @media screen and (max-width: 600px) {
        height: 160px;
    }
`
const ContainerImg = styled(Flex)`
    width: 70px;
    height: 70px;
    position:relative;
`
const TokenStake = styled.img`
    width: 70px;
    height: 70px;
`
const TokenEarn = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0px;
    bottom:0px;
`

const CsFlex = styled(Flex)`
    background-color: #FDC24F;
    padding: 15px 10px;
    border-radius: 50px;
    height: 24px;
`

const Wrap = styled(Flex)`
    width: 100%;
    display: grid;
    grid-template-columns: 25% 75%;
    margin-bottom: 20px;
    @media screen and (max-width: 900px) {
        gap: 10px;
    }
    @media screen and (max-width: 600px) {
        gap: 20px;
    }
`

const TextCenter = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #FFF;
`

const Content = styled(Flex)`
  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 6px;
  }
`