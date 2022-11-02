import React from "react";
import styled from "styled-components";
import { Text, Flex } from "@phamphu19498/runtogether-uikit";
import { Wallet } from "components/Pancake-uikit"
import { GetListBalance } from "state/mybalance";
import { DecryptsUserInfo } from "config/api/decrypts";
import { useTranslation } from "contexts/Localization";



const CardOffChain = () => {
    const { t } = useTranslation()
    const [ mainBalance, earnBalance ] = GetListBalance()
    const data:any = DecryptsUserInfo() || "";
    return(
        <Container>
            <Flex width="100%" alignItems="center">
                <Wallet filterColor="#60E18D" />
                <Text bold fontSize="18px" ml="10px" color="#fff">Off-chain</Text>
            </Flex>
            <Flex width="100%">
                
                <Flex width="50%" flexDirection="column">
                    <Text fontSize="18px" bold color="#fff">Main wallet</Text>
                    <Flex alignItems="center">
                        <Text bold color="#fff" mr="5px">
                        { data ?
                            <>
                                { mainBalance ?
                            
                                    
                                    <Text bold color="#fff">{`${Number(mainBalance[0].balance).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Text>
                                :
                                <Text bold color="#fff">0.00</Text>
                                }
                            </>
                        :
                            <Text color="#fff">{t("No Data")}</Text>
                        }
                        </Text>
                        <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                    </Flex>
                </Flex>
                <Flex flexDirection="column">
                    <Text fontSize="18px" bold color="#fff">Earn wallet</Text>
                    <Flex alignItems="center">
                        <Text bold color="#fff" mr="5px">
                        { data ?
                            <>
                                { !earnBalance ?
                            
                                    <Text bold color="#fff">0.00</Text>
                                :
                                    <Text bold color="#fff">{`${Number(earnBalance[0].balance).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Text>
                                }
                            </>
                        :
                            <Text color="#fff">{t("No Data")}</Text>
                        }
                        </Text>
                        <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    )
}

export default CardOffChain

const Container = styled(Flex)`
    justify-content: space-around;
    align-items: center;
    flex-direction:column;
    height: 160px;
    width:100%;
    border-radius:12px;
    background:#45C672;
    padding:18px 22px 18px 22px;
`