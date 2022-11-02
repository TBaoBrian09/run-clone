import React, { useState } from "react";
import { Text, Flex, Button, useModal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { GetDataUser, GetDataUserStaked } from "state/poolrun";
import { useWeb3React } from "@web3-react/core";
import { useHavest } from "../hook/useHavert"

interface HarvestActionProps {
    tokenEarnName?: string
    totalEarn?:string
}
const HarvestAction: React.FC<HarvestActionProps> = ({tokenEarnName, totalEarn}) => {
    const { account } = useWeb3React()
    const [ refresh, setRefresh ] = useState(Date.now())
    const [ dataUser ] = GetDataUser(account)
    const [ dataUserStaked ] = GetDataUserStaked(account, refresh)
    function onRefresh(value){
        setRefresh(value)
    }
    const { handleHarvest, requestedHarvest, pendingHarvestd } = useHavest(onRefresh)
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
            <Flex flexDirection="column">
                <Text><span style={{color:"#FF592C"}}>{tokenEarnName}</span> Earned</Text>
                <Text color="#B2B3BD">{dataUserStaked?.pendingReward.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </Flex>
            <HarvestButton
                disabled={pendingHarvestd || dataUserStaked.pendingReward === 0 }
                onClick={handleHarvest}
                endIcon={pendingHarvestd ? <AutoRenewIcon spin color="textDisable" /> : null}
            > 
                Harvest
            </HarvestButton>
        </Flex>
    )
}
export default HarvestAction

const HarvestButton = styled(Button)`
    background: transparent;
    height: 50px;
    border: 2px solid #E6E8EC;
    border-radius: 90px;
    color: #000;
    box-shadow:none;
`