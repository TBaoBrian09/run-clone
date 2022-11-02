import React from "react";
import styled from "styled-components";
import { Text, Flex, Button, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import { Wallet } from "components/Pancake-uikit"
import BigNumber from "bignumber.js";
import { GetTokenBalance } from "utils/getTokenBalance";
import tokens from "config/constants/tokens";
import { useWeb3React } from '@web3-react/core';
import { usePriceRunBusd } from "state/farms/hooks";
import { useTranslation } from "contexts/Localization";
import ConnectWalletButton from 'components/ConnectWalletButton';
import { FetchTotalVotingByUser, FetchUserUnStake, FetchDataVoting } from "../hook/fetchDataVoting";
import { useUnStake } from "../hook/useUnStake"

interface Props {
    votingId?:number
    refresh?:number 
    numberAgree?:string
    numberDisagree?:string
  }
const CardVote: React.FC<Props> = ({votingId, refresh,numberAgree,numberDisagree}) => {
    const { t } = useTranslation()
    const runPriceUsd = usePriceRunBusd().toNumber()
    const { handleUnStake, requestedUnStake, pendingUnStake } = useUnStake(votingId)
    const { totalVoting } = FetchTotalVotingByUser(votingId, requestedUnStake, refresh)
    const { isUnStaked } = FetchUserUnStake(votingId, requestedUnStake)
    const { dataVoting } = FetchDataVoting(votingId, refresh)
    const currentTime = Date.now()
    const isTimeCanUnStake = currentTime > dataVoting.endDate*1000 
    const { account } = useWeb3React()
    const converttotalVote = new BigNumber(totalVoting)
    const parsetotalVoting  = converttotalVote.decimalPlaces(2,1)
    const convertnumberAgree= new BigNumber(numberAgree)
    const parseAgree  = convertnumberAgree.decimalPlaces(2,1)
    const convertnumberDisAgree = new BigNumber(numberDisagree)
    const parseDisagree  = convertnumberDisAgree.decimalPlaces(2,1)
   
    return(
        <Flex width="100%" flexWrap="wrap">     
            <WrapCard>
                <CustomFlex>
                    <ColLeft>
                        <Text fontSize="14px" bold >Your RUN staked for vote</Text>
                        <Flex alignItems="center" style={{gap:"10px"}} width="100%" justifyContent="space-between">
                            <Flex>
                            <Text bold mr="8px" fontSize="20px">{Number(parsetotalVoting.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                            <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                            </Flex>

                            {  account ?                         
                        <CustomButton
                            disabled={pendingUnStake || Number(totalVoting) === 0 || isUnStaked || !isTimeCanUnStake}
                            onClick={handleUnStake}
                            endIcon={pendingUnStake ? <AutoRenewIcon spin color="textDisable" /> : null}
                        > 
                            { isUnStaked ?
                                t("Unstaked")
                            :
                                t("Unstake")
                            }
                        </CustomButton>         
                    :
                        <CsConnectWalletButton/>
                }         
                        </Flex>
                        <Text fontSize="14px" bold color="#B2B3BD">~ {(Number(totalVoting)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD</Text>
                    </ColLeft>
                </CustomFlex>            
                <CustomFlex>
                    <ColLeft>
                        <Text fontSize="14px" bold >Your vote history</Text>
                        <Flex alignItems="center" width="100%" justifyContent="space-between">
                            <Text bold fontSize="14px">Agree</Text>
                            <Flex alignItems="center">
                                <Text bold fontSize="20px" pr="15px">{Number(parseAgree.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px" }}/>
                            </Flex>                       
                        </Flex>   

                        <Flex alignItems="center" width="100%" justifyContent="space-between">
                            <Text bold fontSize="14px">Disagree</Text>
                            <Flex alignItems="center">
                                <Text bold fontSize="20px" pr="15px">{Number(parseDisagree.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px" }}/>
                            </Flex>
                        </Flex>                    
                    </ColLeft>
                </CustomFlex>   
            </WrapCard>                              
            {/* <ContainerUnStake>
                {  account ?                         
                        <CustomButton
                            disabled={pendingUnStake || totalVoting === 0 || isUnStaked || !isTimeCanUnStake}
                            onClick={handleUnStake}
                            endIcon={pendingUnStake ? <AutoRenewIcon spin color="textDisable" /> : null}
                        > 
                            { isUnStaked ?
                                t("UnStaked")
                            :
                                t("UnStake")
                            }
                        </CustomButton>         
                    :
                        <CsConnectWalletButton/>
                }         
            </ContainerUnStake>  */}
        </Flex>
    )
}

export default CardVote

const WrapCard = styled(Flex)`
    width: 100%;
    @media(max-width:600px){
        flex-direction:column;
    }
`
const ContainerUnStake = styled(Flex)`
    width: 17%;
    height: 140px;
    align-items: center;
    justify-content: flex-end;
    @media screen and (max-width: 769px){
        width:100%;
        margin-top: 1.5rem;
        height: fit-content;
        justify-content: center;
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
    width: 50%;
    border: 2px solid #5DCB83;
    padding:20px;
    border-radius: 12px;
    &:first-child {
        margin-right:1rem;
    }
    &:last-child {
        margin-left:1rem;
    }
    @media screen and (max-width: 600px){
        width:100%;
        margin-bottom:1.25rem;
        &:first-child, &:last-child { 
            margin-left:0rem!important;
            margin-right:0rem!important;
        }
    }
    
`;
const CustomButton = styled(Button)`
    border-radius:90px;
    /* width:172px; */
    box-shadow:none;
    background-color: rgb(255, 89, 44);
    color: #fff;
    @media screen and (max-width: 600px){
        // width:100%;
    }
`
const CsConnectWalletButton = styled(ConnectWalletButton)` 
  background-color: #ff592c;
  color: #ffffff;
  border:none;
  @media (max-width:600px){
    display:none;
 }
`