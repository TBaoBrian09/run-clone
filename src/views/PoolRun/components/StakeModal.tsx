import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Modal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import BigNumber from "bignumber.js";
import { BalanceInput } from "components/Pancake-uikit";
import { usePriceRunBusd } from "state/farms/hooks";
import styled from "styled-components";
import { fetcTvlPoolData } from "state/poolrun/fetchData/fetchPoolContract";
import { fetchTvlPool } from "state/poolrun/actions";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from "state";
import { useStaked } from "../hook/useStaked"
import { CheckAllowance } from "../hook/fetchData"

interface StakeModalProps {
    onDismiss?: () => void
    title?:string
    onRefresh?:(newValue) => void
  }

const StakeModal: React.FC<StakeModalProps> = ({onDismiss, title, onRefresh}) => {
    const [stakeAmount, setStakeAmount] = useState('')
    const handleStakeInputChange = (input: string) => {
        setStakeAmount(input)
        setPercent(Number(input));
    }
    const [percent, setPercent ] = useState(0)
    const runPriceUsd = usePriceRunBusd().toNumber()
    
    const currencyValueRun = `${(Number(stakeAmount)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD`
    const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
   
    const { handleStaked, requestedStake, pendingStaked, isClose } = useStaked(stakeAmount, onRefresh)
    const { balanceOf } = CheckAllowance(requestedStake)
    const isMaxBalance = Number(new BigNumber(Number(stakeAmount))) > Number(new BigNumber(Number(balanceOf)))
    function quickSelect (value:number){
        setPercent(value)
        setStakeAmount((Math.floor(balanceOf * value) / 100).toString()) 
    }
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getTvlStaked= async () => {
            try {
                const result = await fetcTvlPoolData()
                dispatch(fetchTvlPool(result))
            } catch (e) {
                console.log(e)
            }
        }
        getTvlStaked()
    }, [dispatch, requestedStake]) 
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{title}</Text>
                <Flex width="100%" flexDirection="column" mt="1rem">
                    <Text>{title}</Text>
                    <BalanceInput
                        value={stakeAmount}
                        onUserInput={handleStakeInputChange}
                        currencyValue={currencyValueRun} 
                        isWarning={hasReachedStakeLimit}
                        decimals={18}
                    />
                </Flex>
                <Flex width="100%" mt="10px" mb="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Balance:</Text>
                        <Text>{(Math.floor(balanceOf * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </Flex>
                </Flex>
                <Flex width="100%" justifyContent='space-between' flexWrap="wrap" style={{gap:"15px"}}>
                    <CustonButton isActive={percent === 25} onClick={()=>quickSelect(25)}>25%</CustonButton>
                    <CustonButton isActive={percent === 50} onClick={()=>quickSelect(50)}>50%</CustonButton>
                    <CustonButton isActive={percent === 75} onClick={()=>quickSelect(75)}>75%</CustonButton>
                    <CustonButton isActive={percent === 100} onClick={()=>quickSelect(100)}>100%</CustonButton>
                </Flex>
                <ConfirmButton 
                        disabled={isMaxBalance || balanceOf === 0 || pendingStaked || Number(stakeAmount)<1}
                        onClick={handleStaked}
                        endIcon={pendingStaked ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                        Confirm
                </ConfirmButton>
                
            </Container>
        </CustomModal>
    )
}
export default StakeModal
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
