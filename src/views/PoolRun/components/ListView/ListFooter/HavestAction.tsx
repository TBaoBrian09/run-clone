import React, { useState } from "react";
import { Text, Flex, Button, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { GetDataUser, GetDataUserStaked } from "state/poolrun";
import { useWeb3React } from "@web3-react/core";
import { useHavest } from "../../../hook/useHavert"

interface HavestProps {
    tokenEarn?:any
    totalEarn?:string
}
const HavestAction: React.FC<HavestProps> = ({tokenEarn, totalEarn}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const renderImg = `/images/coins/${tokenEarn.address[56]}.png` 
    const [ refresh, setRefresh ] = useState(Date.now())
    const [ dataUserStaked ] = GetDataUserStaked(account, refresh)
    function onRefresh(value){
        setRefresh(value)
    }
    const { handleHarvest, requestedHarvest, pendingHarvestd } = useHavest(onRefresh)
    return (
        <ContainerHavestActions>
            <Text><span style={{color:"#FF592C"}}>{tokenEarn.symbol}</span> EARNED</Text>
            <Row>
                <Flex alignItems="center" style={{gap:"10px"}}>
                    <img src={renderImg} alt="logo token earn" style={{height:"30px", width:"30px"}}/>
                    <Text fontSize="20px" bold>{dataUserStaked?.pendingReward.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </Flex>
                <HarvestButton
                    disabled={pendingHarvestd || dataUserStaked.pendingReward === 0 || !account}
                    onClick={handleHarvest}
                    endIcon={pendingHarvestd ? <AutoRenewIcon spin color="textDisable" /> : null}
                > 
                    Harvest
                </HarvestButton>
            </Row>
        </ContainerHavestActions>
    )
}
export default HavestAction

const ContainerHavestActions = styled(Flex)`
    width: 30%;
    flex-direction:column;
    justify-content: center;
    align-items: start;
    height:100%;
    gap:20px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:50%;
        height:100px;
    }
    @media screen and (max-width: 600px) {
        width:100%;
        height:100px;
        margin-top:1.25rem;
    }
`
const HarvestButton = styled(Button)`
    background: transparent;
    height: 50px;
    border: 2px solid #E6E8EC;
    border-radius: 90px;
    color: #000;
    box-shadow:none;
`
const Row = styled(Flex)`
    gap:20px;
    width:100%;
    @media screen and (max-width: 600px) {
        width:100%;
        justify-content:space-between
    }
`