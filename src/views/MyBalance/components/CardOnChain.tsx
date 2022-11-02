import React from "react";
import styled from "styled-components";
import { Text, Flex } from "@phamphu19498/runtogether-uikit";
import { Wallet } from "components/Pancake-uikit"
import { GetTokenBalance } from "utils/getTokenBalance";
import tokens from "config/constants/tokens";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "contexts/Localization";

const CardOnChain = () => {
    const { t } = useTranslation()
    const { balance } = GetTokenBalance(tokens.Run.address)
    const { account } = useWeb3React()
    return(
        <Container>
            <Flex width="100%" alignItems="center">
                <Wallet filterColor="#F86F61" />
                <Text bold fontSize="18px" ml="10px" color="#fff"> On-chain</Text>
            </Flex>
            <Flex flexDirection="column" width="100%">
                <Text fontSize="18px" bold color="#fff">On-wallet</Text>
                <Flex alignItems="center">
                    { account ?
                        <Text bold color="#fff" mr="10px">{balance.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    :
                        <Text color="#fff" mr="10px" >{t("No Data")}</Text>    
                    }
                    <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                </Flex>
            </Flex>
        </Container>
    )
}

export default CardOnChain

const Container = styled(Flex)`
    justify-content: space-around;
    align-items: center;
    flex-direction:column;
    height: 160px;
    width:100%;
    border-radius:12px;
    background:#E75243;
    padding:18px 22px 18px 22px;
`