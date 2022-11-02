import React from "react";
import { Flex, Text } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { CoreTagIcon } from "components/Pancake-uikit"

interface StakeActionProps {
    tokenStake?:any
    tokenEarn?:any
}

const CardHeading: React.FC<StakeActionProps> = ({tokenStake, tokenEarn}) => {
    const imgTokenStaked = `/images/coins/${tokenStake.address[56]}.png`
    const imgTokenEarn = `/images/coins/${tokenEarn.address[56]}.png`
    return(
        <Container>
            <Flex width="40%" justifyContent="center">
                <ContainerImg>
                    <TokenStake src={imgTokenStaked} alt="token staked"/>
                    <TokenEarn src={imgTokenEarn} alt="token earn"/>
                </ContainerImg>
            </Flex>
            <Flex width="60%" flexDirection="column" justifyContent="flex-start">
                <Flex width="100%">
                    <CoreTagIcon/>
                </Flex>
                <Text color="#fff" bold fontSize="20px">Stake {tokenStake.symbol}</Text>
                <Text color="#fff" >Earn {tokenEarn.symbol}</Text>
            </Flex>
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
    background:url("/images/Pools/bg_card_heading.png");
    background-size:cover;
    background-repeat:no-repeat;
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