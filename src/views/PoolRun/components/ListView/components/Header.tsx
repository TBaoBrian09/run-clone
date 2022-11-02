import React from "react";
import { Text, Flex } from "@phamphu19498/runtogether-uikit";
import { CoreTagIcon } from "components/Pancake-uikit";
import styled from "styled-components";

interface StakeActionProps {
    tokenStake?:any
    tokenEarn?:any
}
const HeaderListView: React.FC<StakeActionProps> = ({tokenStake, tokenEarn}) => {
    const imgTokenStaked = `/images/coins/${tokenStake.address[56]}.png`
    const imgTokenEarn = `/images/coins/${tokenEarn.address[56]}.png`
    return (
        <ContainerHeaer>
            <ContainerImg>
                <TokenStake src={imgTokenStaked} alt="token staked"/>
                <TokenEarn src={imgTokenEarn} alt="token earn"/>
            </ContainerImg>
            <Flex flexDirection="column">
                <Text bold fontSize="20px">Stake {tokenStake.symbol}</Text>
                <Text>Earn {tokenEarn.symbol}</Text>
            </Flex>
            <CoreTagIcon/>
        </ContainerHeaer>
    )
}
export default HeaderListView

const ContainerHeaer = styled(Flex)`
    width: 30%;
    justify-content: center;
    align-items: center;
    height:70px;
    gap:20px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:40%;
    }
    @media screen and (max-width: 600px) {
        width:100%;
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