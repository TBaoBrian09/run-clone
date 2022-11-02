import React, { useState } from "react";
import { Text, Flex, Button, useModal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { GetDataUser, GetDataUserStaked } from "state/poolrun";
import { useWeb3React } from "@web3-react/core";

import { TextCard } from "../styles";
import { useHavest } from "../hook/useHarvestPoolProposals"

interface HarvestActionProps {
    tokenEarnName?: string
    totalEarn?:string
    contractProposals?:string
    onRefresh?:(newValue) => void
    refresh?:number
    penddingReward?:number
}
const HarvestAction: React.FC<HarvestActionProps> = ({tokenEarnName, totalEarn, contractProposals, penddingReward, onRefresh}) => {
    const { account } = useWeb3React()
    const { handleHarvest, requestedHarvest, pendingHarvestd } = useHavest(contractProposals, penddingReward, account, onRefresh)
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
            <Flex flexDirection="column">
                <TextCard><span style={{color:"#FF592C"}}>{tokenEarnName}</span> Earned</TextCard>
                <TextCard color="#B2B3BD">{totalEarn}</TextCard>
            </Flex>
            <HarvestButton
                disabled={pendingHarvestd || Number(penddingReward) === 0 }
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