import React, { useState } from "react";
import { Flex, Button, useModal, Text, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useTranslation } from 'contexts/Localization'
import { IconButton } from "views/PoolRun/style";
import { AMOUNT_FULL_POOL } from "config";
import { MinusIcon, PlusIcon } from "components/Pancake-uikit";
import StakeModalPoolStore from "./StakeModal";
import UnStakeModalPoolStore from "./UnStakeModal";
import { GetDataUser } from "../hook/fetachDataUser";
import { useApprove } from "../hook/useApproveStake"


interface StaketActionProps {
    tokenStakeSymbol?:any
    tokenStakeAddress?: any
    contractAddress?:any
    onRefresh?:(newValue) => void
    refresh?:number
    totalStaked?:number,
    tvlstake?:any,
    endTimePool?:any
    totalTokenStake?:string
    startTimePool:number
}
const StakeAction: React.FC<StaketActionProps> = ({
    tokenStakeSymbol, 
    tokenStakeAddress, 
    contractAddress, 
    onRefresh, 
    refresh,
    totalStaked,
    tvlstake,
    endTimePool,
    totalTokenStake,
    startTimePool
}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const { handleApprove, requestedApproval, pendingTxApproval } = useApprove(tokenStakeAddress, contractAddress, onRefresh)
    const { dataUser } = GetDataUser(tokenStakeAddress, contractAddress, refresh)
    const currentTime = Date.now();
    const timeCanStake = currentTime > startTimePool
    const checkTimeStake =  currentTime > endTimePool
    const converAmountFullPool = new BigNumber(AMOUNT_FULL_POOL)
    const converAmountTvl = new BigNumber(totalTokenStake)
    const isFullPool = converAmountTvl.isGreaterThanOrEqualTo(converAmountFullPool)
    const convertTotal = new BigNumber(totalStaked)
    const partTotalStake = convertTotal.decimalPlaces(2,1)
    const [ openModalStake ] = useModal(
        <StakeModalPoolStore
            title="Stake"
            contractAddress={contractAddress}
            totalStaked={totalStaked}
            tvlstake={totalTokenStake}
            tokenAddress={tokenStakeAddress}
            onRefresh={onRefresh}
        />
    )
    const [ openModalUnStake ] = useModal(
        <UnStakeModalPoolStore
            title="UnStake"
            contractAddress={contractAddress}
            onRefresh={onRefresh}
        />
    )
    return (
        <Flex width="100%" flexDirection="column">
            <Flex width="100%" mt="1rem" flexDirection="column">
                { dataUser.allowance !== 0 ?
                    <>
                        <Container width="100%" justifyContent="space-between" flexDirection="column" mb="1rem">
                            <Flex width="100%" justifyContent="space-between"> 
                                <Flex flexDirection="column">
                                    <Text><span style={{color:"#FF592C"}}>{tokenStakeSymbol}</span> Staked</Text>
                                    <Flex alignItems="center" flexWrap="wrap">
                                        <Text fontSize="18px" bold>
                                            { totalStaked ?                                             
                                            Number(((partTotalStake.multipliedBy(100)).dividedBy(100))).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                            :
                                                "0.00"
                                            }
                                        </Text>
                                        <CustomText fontSize="14px">
                                            { totalStaked !== 0 && Number(totalTokenStake)!== 0                                            
                                            ? `(~ ${Number(((convertTotal.dividedBy((converAmountTvl)).multipliedBy(100)))).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% of pool) `
                                            : `(~ 0.00% of pool)`
                                            }
                                        </CustomText>
                                    </Flex>
                                </Flex>
                                <Flex style={{gap:"15px"}}>
                                    <CustomIconButton
                                        disabled={Number(totalStaked) === 0}
                                        onClick={openModalUnStake}
                                    >
                                        <MinusIcon/>
                                    </CustomIconButton>
                                    <CustomIconButton
                                        disabled={checkTimeStake || !timeCanStake || isFullPool || dataUser.balance === 0 }
                                        onClick={openModalStake}
                                    >
                                        <PlusIcon/>
                                    </CustomIconButton>
                                </Flex>
                            </Flex>
                            <Flex flexDirection="column">
                                {dataUser.balance === 0 && <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >Your RUN balance is not enough</div>}
                                {isFullPool && <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >Pool is full</div>}     
                            </Flex>
                        </Container>
                    </>
                :
                    <ApprovedButton
                        disabled={pendingTxApproval || isFullPool }
                        onClick={handleApprove}
                        endIcon={pendingTxApproval ? <AutoRenewIcon spin color="textDisable" /> : null}
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
const CustomText = styled(Text)`
     margin-left:8px;
    @media screen and (max-width: 600px) {
        margin-left:0px;
    }
`