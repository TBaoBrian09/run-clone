import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Modal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import { BalanceInput } from "components/Pancake-uikit";
import styled from "styled-components";
import BigNumber from "bignumber.js";

import { formatNumber } from 'utils/formatBalance'
import { AMOUNT_FULL_POOL } from "config/index"
import useToast from "hooks/useToast";
import tokens from "config/constants/tokens";
import { useTranslation } from "contexts/Localization";
import { usePriceRunBusd } from 'state/farms/hooks'
import { NUMBER2S5M } from "config/constants";
import { useStaked } from "../hook/useStake"
import { GetDataUser } from "../hook/fetachDataUser";
import { GetTotalStaked } from "../hook/fetchDataPool"


interface StakeModalProps {
    onDismiss?: () => void
    title?:string
    contractAddress?:string,
    totalStaked?:number,

    tvlstake?:string
    tokenAddress?:string
    onRefresh?:(newValue) => void
  }

const StakeModalPoolStore: React.FC<StakeModalProps> = ({onDismiss, title, contractAddress,totalStaked,tvlstake, tokenAddress, onRefresh}) => {
    
    const [stakeAmount, setStakeAmount] = useState('')
    const handleStakeInputChange = (input: string) => {  
        setStakeAmount(input)
    }
   
    const { t } = useTranslation()
    const [ refresh, setRefresh ] = useState(0)
    const runPriceUsd = usePriceRunBusd().toNumber()
    function onUpdateAmount(newValue:number){
        setRefresh(newValue)
    }
    const { handleStaked, requestedStake, pendingStaked } = useStaked(stakeAmount, contractAddress, onUpdateAmount, onRefresh)
    const { tvl } = GetTotalStaked( tokenAddress, contractAddress, refresh )
    const formattedUsdValueStaked = stakeAmount ? formatNumber(Number(stakeAmount)*runPriceUsd) : ''
    const converAmountFullPool = new BigNumber(AMOUNT_FULL_POOL)
    const converAmountTvl = new BigNumber(tvl)
    const remaining = converAmountFullPool.minus(converAmountTvl)      
    const convertStakeAmount = new BigNumber(stakeAmount)
    const totalStakeAmount = converAmountTvl.plus(convertStakeAmount)
    const isFullPool = totalStakeAmount.isGreaterThan(converAmountFullPool)
    
    
    useEffect(() => {
        function updateAmount(){
            setStakeAmount("")
        }
        if ( requestedStake ) {
            updateAmount()
        }
    }, [refresh, requestedStake])
    const { dataUser } = GetDataUser(tokenAddress, contractAddress, refresh)
   
    useEffect(() => {
        const percent = (Number(stakeAmount)/Number((Math.floor(dataUser.balance * 100) / 100)))*100
        setPercent(Number(percent.toFixed(0)))
    }, [stakeAmount, dataUser.balance]) 
    const [percent, setPercent ] = useState(0)
    function quickSelect (value:number){
        setPercent(value)
        setStakeAmount(((dataUser.balance * value) / 100).toString())
    }
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{title}</Text>
                <Flex width="100%" flexDirection="column" mt="1rem">
                    <Text>{title}</Text>
                    <BalanceInput
                        value={stakeAmount}
                        onUserInput={handleStakeInputChange}
                        decimals={18}
                        currencyValue={runPriceUsd && `~${formattedUsdValueStaked || 0} BUSD`}
                    />
                       {isFullPool && <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >Pool is full</div>}
                </Flex>
                <Flex width="100%" mt="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Remaning of Pool:</Text>
                        <Text onClick={()=>setStakeAmount(remaining.toString())} style={{textDecoration:'underline',cursor:'pointer'}}>{(remaining.toNumber()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </Flex>
                </Flex>
                <Flex width="100%" mt="10px" mb="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Balance:</Text>
                        <Text>{(Math.floor(dataUser.balance * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </Flex>
                </Flex>
                <Flex width="100%" justifyContent='space-between' flexWrap="wrap" style={{gap:"15px"}}>
                    <CustonButton isActive={percent === 25} onClick={()=>quickSelect(25)}>25%</CustonButton>
                    <CustonButton isActive={percent === 50} onClick={()=>quickSelect(50)}>50%</CustonButton>
                    <CustonButton isActive={percent === 75} onClick={()=>quickSelect(75)}>75%</CustonButton>
                    <CustonButton isActive={percent === 100} onClick={()=>quickSelect(100)}>100%</CustonButton>
                </Flex>
                
                <ConfirmButton 
                    onClick={handleStaked}
                    disabled={pendingStaked || Number(stakeAmount) === 0 || isFullPool || Number(tvlstake) > NUMBER2S5M || Number(stakeAmount) > dataUser.balance }
                    endIcon={pendingStaked ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    { Number(stakeAmount) > dataUser.balance ?
                      t("Insufficient %symbol% balance", { symbol:tokens.Run.symbol})
                       :
                       'Confirm'
                    }
                   
                </ConfirmButton>
            </Container>
        </CustomModal>
    )
}
export default StakeModalPoolStore
const CustomModal = styled(Modal)`
    padding:0px;
`
const Container = styled(Flex)`
    width: 400px;
    flex-direction:column;
    @media screen and (max-width: 600px) {
        width: 300px !important;
    }
`
const CustonButton = styled(Button)<{isActive?:boolean}>`
    width: auto;
    height: 40px;
    box-shadow:none;
    background: ${({ isActive }) => isActive ? " #FF592C" : "transparent"};
    border: 2px solid ${({ isActive }) => isActive ? "transparent" : "#E6E8EC"};
    border-radius: 90px;
    color:${({ isActive }) => isActive ? " #FFF" : "#000"};
    @media screen and (max-width: 600px) {
        width: 45% !important;
    }
`
const ConfirmButton = styled(Button)`
    width:100%;
    border-radius:90px;
    background: #FF592C;
    color:#fff;
    margin-top:1.25rem;
    box-shadow:none;
`
