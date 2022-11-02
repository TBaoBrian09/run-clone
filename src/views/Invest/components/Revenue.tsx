import { AutoRenewIcon, Button, Flex, Text } from "@phamphu19498/runtogether-uikit";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "contexts/Localization";
import React from "react";
import { GetBlockNumber } from "utils/getBlock";
import styled from "styled-components";
import { Token } from "config/constants/types";
import { BigNumber } from "bignumber.js";
import { usePriceRunBusd } from "state/farms/hooks";
import { AMOUNT_FULL_POOL } from "config";
import { GetPendingRewardPoolStore, GetPendingRewardProposal } from "../hook/fetchDataPoolStore";
import { useWithdrawPoolStore } from "../hook/useWithdrawPoolStore";
import { useWithdrawProposalsPoolProposals } from "../hook/useWithdrawnPoolProposals";
import { TextCard } from "../styles";
import { GetDataPoolLength } from "../hook/fetchPoolLength";




interface RenvenueProps {
    refresh?:number
    contractAddressPoolStore?:string
    contractAddressPoolProposals?:string
    onRefresh?:(newValue) => void
    tokenEarn?:Token
    tokenStake?:any,
    totalstaked:number
}
const RevenueAction: React.FC<RenvenueProps> = ({refresh, contractAddressPoolStore, contractAddressPoolProposals, tokenEarn,tokenStake,totalstaked, onRefresh}) => {
    const { t } = useTranslation()
    const { block } = GetBlockNumber()
    const { account } = useWeb3React()
    const { handleWithdraw, requestedWithdraw, pendingWithdraw } = useWithdrawPoolStore(account, contractAddressPoolStore, onRefresh)
    const {poolLength} = GetDataPoolLength(contractAddressPoolStore)
    const {pendingProposal} = GetPendingRewardProposal(contractAddressPoolProposals,requestedWithdraw, refresh)
    const { handleWithdrawProposals, requestedWithdrawProposals, pendingWithdrawProposals } = useWithdrawProposalsPoolProposals(account, contractAddressPoolProposals, onRefresh)
    const { pendingRewardPoolStore } = GetPendingRewardPoolStore(contractAddressPoolStore,refresh,requestedWithdrawProposals);
    const runPriceUsd = usePriceRunBusd().toNumber()
    const coinvertTotalStake = new BigNumber(totalstaked)
    const coinvertAmountFUll = new BigNumber(AMOUNT_FULL_POOL)
    const isFullPool = coinvertTotalStake.isGreaterThanOrEqualTo(coinvertAmountFUll)
    const partpendingRewardPoolStore = new BigNumber(pendingRewardPoolStore)

    return (
        <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
            <Flex flexDirection="column" width="100%">
               <Flex width="100%" justifyContent="space-between">
                    <Flex flexDirection="column">
                        <Flex alignItems="center">
                            <Text color="#FF592C" mr="4px">{tokenEarn.symbol}</Text>
                            <TextCard><span style={{color:"#000"}}>{t("earned")}</span></TextCard>
                        </Flex>
                        <Flex flexDirection="column">
                            <TextCard >{pendingProposal.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TextCard>
                        </Flex>
                    </Flex>
                    <HarvestButton
                        disabled={pendingProposal === 0 || pendingWithdrawProposals}
                        onClick={handleWithdrawProposals}
                        endIcon={pendingWithdrawProposals ? <AutoRenewIcon spin color="textDisable" /> : null  }
                    >
                        Harvest
                    </HarvestButton>
               </Flex>
               <Flex width="100%" justifyContent="space-between" alignItems="center">
                    <Flex flexDirection="column" mt="5px">
                            <Flex alignItems="center">
                                <Text mr="4px" color="#FF592C">RUN</Text>
                                <TextCard><span style={{color:"#000"}}>{t("earned revenue")}</span></TextCard>
                            </Flex>
                            <Flex flexDirection="column"> 
                                <TextCard >{Number(partpendingRewardPoolStore).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TextCard>
                                <TextCard small color="#B2B3BD">~ {Number(partpendingRewardPoolStore.multipliedBy(new BigNumber(runPriceUsd))).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD</TextCard>
                                {/* {isFullPool && <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >Pool is full</div>} */}
                            </Flex>
                           
                    </Flex>
                    <HarvestButton
                        disabled={pendingWithdraw  || pendingRewardPoolStore === 0}
                        onClick={handleWithdraw}
                        endIcon={pendingWithdraw ? <AutoRenewIcon spin color="textDisable" /> : null  }
                    > 
                        Harvest
                    </HarvestButton>
               </Flex>
            </Flex>
        </Flex>
    )
}
export default RevenueAction

const TextCardCustom = styled(TextCard)`
  font-size:12px;
`

const HarvestButton = styled(Button)`
    background: transparent;
    width:140px;
    height: 45px;
    border: 2px solid #E6E8EC;
    border-radius: 90px;
    color: #000;
    box-shadow:none;
`