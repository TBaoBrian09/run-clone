import React from "react";
import styled from "styled-components";
import { Text, Flex, Button, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import { Wallet } from "components/Pancake-uikit"
import { GetTokenBalance } from "utils/getTokenBalance";
import tokens from "config/constants/tokens";
import { usePriceRunBusd } from "state/farms/hooks";
import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWalletButton";

import { useTranslation } from "contexts/Localization";
import { GetAmountMintToVote } from 'state/poolProposals'
import { FetchTotalVotingByUser, FetchUserUnStake, FetchDataVoting } from "../hook/fetchDataVoting";
import { useUnStakeChair } from "../hook/unStakeChair"

interface Props {
    votingId?:number
    refresh?:number
  }
const CardVoteByOwner: React.FC<Props> = ({votingId, refresh}) => {
    const { t } = useTranslation()
    const runPriceUsd = usePriceRunBusd().toNumber()
    const { account } = useWeb3React()
    const { handleUnStakeChair, requestedUnStakeChair, pendingUnStakeChair } = useUnStakeChair(votingId)
    const { totalVoting } = FetchTotalVotingByUser(votingId, requestedUnStakeChair, refresh)
    const { isUnStaked } = FetchUserUnStake(votingId, requestedUnStakeChair)
    const { dataVoting } = FetchDataVoting(votingId, refresh)
    const currentTime = Date.now()
    const [ minAmountToVote ] = GetAmountMintToVote()
    const isTimeCanUnStake = currentTime > dataVoting.endDate*1000 
    const isTimeOwnerCanUnStake = currentTime > dataVoting.endTimeLockChairPerson*1000 
    return(
        <Container>
            <CustomFlex>
                <ColLeft>
                    <Text fontSize="14px" bold >Your RUN staked for create vote</Text>
                    <Flex alignItems="center" style={{gap:"10px"}} width="100%" justifyContent="space-between">
                        { isUnStaked ?
                            <Text bold >0.00</Text>
                        :
                            <Text bold >{minAmountToVote.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        }
                        <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                    </Flex>
                    { isUnStaked ?
                        <Text fontSize="14px" bold color="#B2B3BD" >~ 0.00</Text>
                    :
                        <Text fontSize="14px" bold color="#B2B3BD">~ {(minAmountToVote*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD</Text>
                    }
                 </ColLeft>
            </CustomFlex>
           
            <Flex width="100%" justifyContent="center" mt="1rem">
            { account ?
                <CustomButton
                    disabled={pendingUnStakeChair || isUnStaked === true || !isTimeCanUnStake || !isTimeOwnerCanUnStake}
                    onClick={handleUnStakeChair}
                    endIcon={pendingUnStakeChair ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    { isUnStaked ?
                        t("Unstaked")
                    :
                        t("Unstake")
                    }
                    
                </CustomButton>
                :
                <ConnectWalletButton/>
            }
            </Flex>
        </Container>
    )
}

export default CardVoteByOwner

const Container = styled(Flex)`
    border-radius:12px;
    flex-direction: column;
    width:550px;
    @media screen and (max-width: 768px){
        width:100%;
        padding: 20px 0px 0px 0px;
    }
`
export const ColLeft = styled.div`
    width: 100%;
    gap: 10px;
    display: grid;
`;
export const ColRight = styled(Flex)`
   width: 100%;
`;
export const CustomFlex = styled(Flex)`
    justify-content:space-between;
    width:100%;
    border:2px solid #5DCB83;
    border-radius: 20px;
    padding: 20px 20px;
`;
const CustomButton = styled(Button)`
    border-radius:90px;
    min-width:172px;
    width: auto;
    box-shadow:none;
    background-color: rgb(255, 89, 44);
    color: #fff;
    @media screen and (max-width: 600px){
        width:100%;
    }
`