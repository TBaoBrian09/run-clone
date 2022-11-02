import React, { useState } from "react";
import { Text, Flex, Button, useModal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import ConnectWalletButton from "components/ConnectWalletButton";
import { GetDataUser, GetDataUserStaked, GetStartTime, GetEndTimePool } from "state/poolrun";
import { useWeb3React } from "@web3-react/core";
import { PlusIcon, MinusIcon } from "components/Pancake-uikit";
import StakeModal from "../../StakeModal"
import UnStakeModal from "../../UnStakeModal";
import { IconButton } from "../../../style"
import { useApproveTokenStake } from "../../../hook/useApprovedTokenStake"

interface StakeProps {
    tokenStake?:string
    totalStaked?:string
}
const StakeAction: React.FC<StakeProps> = ({tokenStake, totalStaked}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const currentTime = Date.now()
    const [ startTime ] = GetStartTime()
    const [ endTimePool ] = GetEndTimePool()
    const isTimeStake = currentTime > startTime*1000 && currentTime < endTimePool*1000
    const [ refresh, setRefresh ] = useState(Date.now())
    const { handleApprove, requestedApprovalTokenStake, pendingTx } = useApproveTokenStake()
    const [ dataUser ] = GetDataUser(account, requestedApprovalTokenStake)
    const [ dataUserStaked ] = GetDataUserStaked(account, refresh)
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
        <ContainerStakeActions>
            <Text textTransform="uppercase">Start Pooling</Text>
            { account ?
                <Flex width="100%">
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
                                            <MinusIcon />
                                        </CustomIconButton>
                                        <CustomIconButton
                                            disabled={!isTimeStake}
                                            onClick={openModalStake}
                                        >
                                            <PlusIcon />
                                        </CustomIconButton>
                                    </Flex>
                                </Container>
                            :
                                <ButtonStaked disabled={!isTimeStake} onClick={openModalStake}>
                                    Stake
                                </ButtonStaked>
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
            :
                <CustomButtonConnectWallet/>
            }
        </ContainerStakeActions>
    )
}
export default StakeAction

const ContainerStakeActions = styled(Flex)`
    width: 40%;
    flex-direction:column;
    justify-content: center;
    align-items: start;
    height:auto;
    @media screen and (min-width: 601px) and (max-width: 1000px) {
        width:100%;
        height:100px;
        margin-top:1rem;
    }
    @media screen and (max-width: 600px) {
        margin-top:1rem;
        height:100px;
        width:100%;
    }
`
const CustomButtonConnectWallet = styled(ConnectWalletButton)`
    background: #FF592C;
    border-radius: 90px;
    color: #FFF;
    box-shadow:none;
    width: 100%;
    height: 55px;
`
const ButtonStaked = styled(Button)`
    background: #FF592C;
    border-radius: 90px;
    color: #FFF;
    box-shadow:none;
    width: 100%;
    height: 55px;
`
const Container = styled(Flex)`
    border: 2px solid #E6E8EC;
    border-radius: 12px;
    padding:20px;
`
const CustomIconButton = styled(IconButton)`
    background: #FF592C;
    box-shadow:none;
    display: flex;
    justify-content:center;
    align-items:center;
`
const ApprovedButton = styled(Button)`
    width: 100%;
    background: #FF592C;
    border-radius: 90px;
    color:#fff;;
    box-shadow:none;
    height:55px;
`
