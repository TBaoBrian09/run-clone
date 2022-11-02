import React, { useEffect, useState } from "react";
import { Text, Flex, Button, useModal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { GetDataUser, GetDataUserStaked, GetStartTime, GetEndTimePool } from "state/poolrun";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from 'contexts/Localization'
import { PlusIcon, MinusIcon } from "components/Pancake-uikit";
import { useApproveTokenStake } from "../hook/useApprovedTokenStake";
import StakeModal from "./StakeModal"
import UnStakeModal from "./UnStakeModal";
import { IconButton } from "../style"

interface HarvestActionProps {
    tokenStake?: string
    totalStaked?:string
}
const StakeAction: React.FC<HarvestActionProps> = ({tokenStake, totalStaked}) => {
    const { t } = useTranslation()
    const [ refresh, setRefresh ] = useState(Date.now())
    const { account } = useWeb3React()
    const { handleApprove, requestedApprovalTokenStake, pendingTx } = useApproveTokenStake()
    const [ dataUser ] = GetDataUser(account, requestedApprovalTokenStake)
    const [ dataUserStaked ] = GetDataUserStaked(account, refresh)
    const currentTime = Date.now()
    const [ startTime ] = GetStartTime()
    const [ endTimePool ] = GetEndTimePool()
    const isTimeStake = currentTime > startTime*1000 && currentTime < endTimePool*1000
    const [ openModalUnStake ] = useModal(
        <UnStakeModal
            title="UnStake"
            totalStaked={dataUserStaked.amount}
            onRefresh={(newValue)=>setRefresh(newValue)}
        />,
        true,
        true,
        'UnStakeModal',
    )
    const [ openModalStake ] = useModal(
        <StakeModal
            title="Stake"
            onRefresh={(newValue)=>setRefresh(newValue)}
        />,
        true,
        true,
        'StakeModal',
    )
    return (
        <Flex width="100%" flexDirection="column" mt="1rem">
            <Flex width="100%" mt="1rem">
                { dataUser.allowance !== 0 ?
                    <>
                        { dataUserStaked.amount !== 0 ?
                            <Container width="100%" justifyContent="space-between">
                                <Flex flexDirection="column">
                                    <Text><span style={{color:"#FF592C"}}>{tokenStake}</span> Staked</Text>
                                    <Text mt="6px" fontSize="18px" bold>{((Math.floor(dataUserStaked.amount * 100) / 100)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                </Flex>
                                <Flex style={{gap:"15px"}}>
                                    <CustomIconButton
                                        disabled={!isTimeStake}
                                        onClick={openModalUnStake}
                                    >
                                        <MinusIcon/>
                                    </CustomIconButton>
                                    <CustomIconButton
                                        disabled={!isTimeStake}
                                        onClick={openModalStake}
                                    >
                                        <PlusIcon/>
                                    </CustomIconButton>
                                </Flex>
                            </Container>
                        :
                            <StakeButton disabled={!isTimeStake} onClick={openModalStake}>
                                Stake
                            </StakeButton>
                        }
                    </>
                :
                    <ApprovedButton
                        disabled={pendingTx || !isTimeStake}
                        onClick={handleApprove}
                        endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                    >
                        {t("Approve")}
                    </ApprovedButton>
                }
                
            </Flex>
            
        </Flex>
    )
}
export default StakeAction

const StakeButton = styled(Button)`
    width: 100%;
    background: #FF592C;
    border-radius: 90px;
    color:#fff;;
    box-shadow:none;
    height:55px;
`
const CustomIconButton = styled(IconButton)`
    background: #FF592C;
    box-shadow:none;
    display: flex;
    justify-content:center;
    align-items:center;
`
const Container = styled(Flex)`
    border: 2px solid #E6E8EC;
    border-radius: 12px;
    padding:20px;
`
const ApprovedButton = styled(Button)`
    width: 100%;
    background: #FF592C;
    border-radius: 90px;
    color:#fff;;
    box-shadow:none;
    height:55px;
`
