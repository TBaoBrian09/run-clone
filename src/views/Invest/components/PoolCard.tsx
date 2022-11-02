import React, { useState } from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import { useWeb3React } from "@web3-react/core";
import { BASE_BSC_URL, MIN_OPEN_POOL_STORE } from "config";
import { getAddress } from "utils/addressHelpers";
import { BigNumber } from "bignumber.js";
import ConnectWalletButton from 'components/ConnectWalletButton';
import { Address, Token } from "config/constants/types";
import APYRow from "./APYRow";
import DepositFeeRow from "./DepositFeeRow";
import CardHeading from "./CardHeading";
import CardFooter from "./CardFooter";
import TotalQuanlity from "./TotalQuanlity";
import MonthlyRate from "./MonthlyRate";
import StakeAction from "./StakeAction";
import RevenueAction from './Revenue';
import EndsInRow from "./endsin";
import { GetTotalStaked } from "../hook/fetchDataPool"
import { GetTotalProfitAmount } from "../hook/fetchDataPoolStore"


interface PoolCardProps {
    storeName?:string
    tokenStake?:Token
    tokenEarn?:Token
    contractPool?:Address
    penddingReward:number
    revenue?:string,
    apy?:string
    depositFee?:string
    totalStaked?:number
    contractStore?:Address
    storeAddress?:string
    endTimePool:number
    startTimePool:number
}

const PoolCard: React.FC<PoolCardProps> = ({
    storeName,
    tokenStake,
    tokenEarn,
    contractPool,
    penddingReward,
    revenue,
    apy,
    depositFee,
    totalStaked,
    contractStore,
    storeAddress,
    endTimePool,
    startTimePool
}) => {
    const { account } = useWeb3React()
    const renderLink = `${BASE_BSC_URL}/address/${getAddress(contractPool)}`
    const [ refresh, setRefresh ] = useState(0)
    const { tvl } = GetTotalStaked( getAddress(tokenStake.address), getAddress(contractPool), refresh )
    const { totalProfitAmount } = GetTotalProfitAmount(getAddress(contractStore),refresh)
    const currentTime = Date.now();
    const convertTvl = new BigNumber(tvl)
    const partTvl = convertTvl.decimalPlaces(2,1)
    return (
        <PCard>
            <CardHeading
                tokenEarn={tokenEarn}
                tokenStake={tokenStake}
                tokenStore={storeName}
            />
            <APYRow apy={apy}/>
            <MonthlyRate revenue={revenue}/>
            { currentTime < endTimePool && <EndsInRow endTime={endTimePool} startTime={startTimePool}/>}
           
            <TotalQuanlity 
                totalQuanlity={Number(partTvl).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                tokenStake={tokenStake}
            />
            <DepositFeeRow depositFee={depositFee}/>
            <RevenueAction
                contractAddressPoolStore={getAddress(contractStore)}
                onRefresh={(newValue)=>setRefresh(newValue)}
                refresh={refresh}
                contractAddressPoolProposals={getAddress(contractPool)}
                tokenEarn={tokenEarn}
                tokenStake={tokenStake}
                totalstaked={Number(tvl)}
            />
            { account ?
                <StakeAction
                    tokenStakeSymbol={tokenStake.symbol}
                    tokenStakeAddress={getAddress(tokenStake.address)}
                    contractAddress={getAddress(contractPool)}
                    refresh={refresh}
                    onRefresh={(newValue)=>setRefresh(newValue)}
                    totalStaked={totalStaked}
                    tvlstake = {Number(tvl).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    endTimePool = {endTimePool}
                    totalTokenStake={tvl}
                    startTimePool={startTimePool}
                />
            :
                <CustomConnectWallet/>
            }

            <CardFooter
                link={renderLink}
                totalProfitAmount={totalProfitAmount}
                locations={storeAddress}
                poolStoreAddress={getAddress(contractStore)}
            />
        </PCard>
    )
}
export default PoolCard

const PCard = styled(Flex)`
    flex-direction: column;
    width: 530px;
    margin-bottom:3.25rem;
    height: fit-content;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding:15px;
`
const CustomConnectWallet = styled(ConnectWalletButton)`
    width: 100%;
    background: #FF592C;
    border-radius: 90px;
    color:#fff;;
    box-shadow:none;
    height:55px;
    margin-top:1rem;
`

const WrappBtn = styled(Flex)`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 20px 0px;
`

export const CustomButton = styled(Button)`
  border-radius: 90px !important;
  width: 80%;
  /* padding: 0px 100px !important; */
  box-shadow: none;
  background-color: #FF592C;;
  @media screen  and (max-width: 600px){
     padding: 0px;
  }
`