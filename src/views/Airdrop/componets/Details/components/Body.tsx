import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import Countdown, { zeroPad } from 'react-countdown'
import { getAddress } from "utils/addressHelpers";
import { Text, Flex, Button, AutoRenewIcon, Breadcrumbs, MetamaskIcon } from "@phamphu19498/runtogether-uikit"
import { FrequencyIcon, CalendarIcon, LogoCircle, WarningV2, Suscess } from 'components/Pancake-uikit'
import ReactMarkdown from 'components/ReactMarkdown'
import remarkGfm from 'remark-gfm'
import { FetchUserV2 } from "hooks/useAirdrop"
import Container from "components/Layout/Container";
import { useTranslation } from "contexts/Localization";
import ConnectWalletButton from "components/ConnectWalletButton";
import { useClaimed } from "../../../hook/useClaimed"
import { listTokenEarn } from "../../../config"
import TokenClaim from "./TokenClaim";

interface PropDataUser {
    airdropAmount:number;
    endTimeClaim: number;
    startTimeClaim: number;
    userMap: any;
    userClaimed: any;
    tokenMap: any;
}
const Body = ({item, onRresh}) => {
    const airdropContract = item[0].address;
    const { t } = useTranslation()
    const history = useHistory();
    const { account } = useWeb3React()
    const { handleClaimed, requestedClaimed, pendingTx } = useClaimed(airdropContract)
    const { dataUserV2 } =  FetchUserV2(requestedClaimed, airdropContract, account);
    const currentItems = Date.now()
    const isEndClaim = dataUserV2.endTimeClaim*1000 < currentItems
    const isStartClaim = dataUserV2.startTimeClaim*1000  > currentItems
    const isTimeCanClaim = ((currentItems > dataUserV2.startTimeClaim*1000) && (currentItems < dataUserV2.endTimeClaim*1000))
    const accountEllipsis = account ? `${account.substring(0, 8)}...${account.substring(account.length - 8)}` : null;

    const renderCountdownV2 = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return ( 
                <></>
            )
        }
        return (
            <Flex width="100%" justifyContent="space-between">
                <Flex flexDirection="column" justifyContent="center">
                    <StyCountDown>
                        <Text color="#000" bold fontSize="26px">{zeroPad(days)}</Text>
                    </StyCountDown>
                    <Text mt="0.5rem" textAlign="center">{t("DAYS")}</Text>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <StyCountDown>
                        <Text color="#000" bold fontSize="26px">{zeroPad(hours)}</Text>
                    </StyCountDown>
                    <Text mt="0.5rem" textAlign="center">{t("HOURS")}</Text>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <StyCountDown>
                        <Text color="#000" bold fontSize="26px">{zeroPad(minutes)}</Text>
                    </StyCountDown>
                    <Text mt="0.5rem" textAlign="center">{t("MINUTES")}</Text>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <StyCountDown>
                        <Text color="#000" bold fontSize="26px">{zeroPad(seconds)}</Text>
                    </StyCountDown>
                    <Text mt="0.5rem" textAlign="center">{t("SECONDS")}</Text>
                </Flex>
            </Flex>
        )
    }
    function ConvertTimer(time){
        const Days = new Date(time).toDateString()
        const Hours = new Date(time).getHours()
        const Min = new Date(time).getMinutes()
        if( Hours < 10 && Min <10) {
            return <Text>0{Hours}:0{Min} {Days}</Text>
        } if ( Hours < 10 && Min > 10) {
            return <Text>0{Hours}:{Min} {Days}</Text>
        } if ( Hours > 10 && Min < 10) {
            return <Text>{Hours}:0{Min} {Days}</Text>
        }
        return <Text>{Hours}:{Min} {Days}</Text>
    }
   
    return (
            <CustomContainer>
                 <ContainerBreadcrumbs width="100%" mt="0.25rem" mb="1.5rem">
                    <Breadcrumbs>
                        <CustomLink bold onClick={()=>history.goBack()}> {t("Airdrop")} </CustomLink>
                        <Text color="primaryBright" textTransform="uppercase" bold> {item[0].title} </Text>
                    </Breadcrumbs>
                </ContainerBreadcrumbs>   
                <Row>
                    <Col60>
                        <TitleDescription>
                            <Text color="text" bold fontSize="22px">{item[0].titleDescription}</Text>
                            <Flex>
                                <Tags style={{color: "white", background: "#f15479" }}>
                                    Ended
                                </Tags>
                            </Flex>
                        </TitleDescription>
                        <ContainerCalendar>
                            <Flex width="25px" mr="10px">
                                <CalendarIcon/>
                            </Flex>
                            <Flex width="100%">{ConvertTimer(item[0].startTime)} <Text mr="5px" ml="5px">-</Text> {ConvertTimer(item[0].endTime)}</Flex>
                        </ContainerCalendar>
                        <Line/>
                        <Flex width="100%" justifyContent="space-between" mt="1rem">
                            <Text color="textSecondary">{t("Total Airdrop Amount")}</Text>
                            <Text color="textSecondary">{item[0].totalAirdrop.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Text>
                        </Flex>
                        <Flex width="100%" justifyContent="space-between" mt="1rem">
                            <Text color="textSecondary">{t("Number of Winners")}</Text>
                            <Text color="textSecondary">{item[0].numberofwinner.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Text>
                        </Flex>
                        <Flex width="100%" justifyContent="space-between" mt="1rem">
                            <Text color="textSecondary">{t("Participants")}</Text>
                            <Text color="textSecondary">{item[0].participate.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Text>
                        </Flex>
                        <Line/>
                        <ReactMarkdown remarkPlugins={[[remarkGfm]]}>
                            {item[0].content}
                        </ReactMarkdown>
                    </Col60>
                    <Col40>
                       <Flex width="100%">
                            <ContainerCircle>
                                    <LogoCircle/>
                                    <img src={item[0].logoProject} alt="logo" style={{width:"50px", zIndex:100}}/>
                            </ContainerCircle>
                            <Flex height="81px" flexDirection="column" justifyContent="center" ml="6px">
                                <Flex>
                                    <Flex>
                                        <Text color="textSecondary" fontSize="20px">{t("Host")}:</Text>
                                        <Text color="text" bold fontSize="20px" mr="1rem" ml="8px">{item[0].name}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                       </Flex>
                        { isStartClaim &&
                           <>
                                <Text mt="1rem" color="textSecondary">{t("Token distribution will start in")}:</Text>
                                <Flex width="100%" mt="1rem">
                                        <Countdown zeroPadTime={2} date={item[0].startTime}  renderer={renderCountdownV2}/>
                                </Flex>
                            </>
                        }
                        { isTimeCanClaim &&
                            <>
                                <Text mt="1rem" color="textSecondary">{t("Token distribution will end in")}:</Text>
                                <Flex width="100%" mt="1rem">
                                        <Countdown zeroPadTime={2} date={item[0].endTime}  renderer={renderCountdownV2}/>
                                </Flex>
                            </>
                        }
                        
                        { !account &&
                            <Alert isFailure={!false}>
                                <Flex>
                                    <WarningV2/>
                                    <Text color="failure" ml="10px">{t("Please connect your wallet to check if you are eligible for the rewards")}</Text>
                                </Flex>
                            </Alert>   
                        }
                     
                        { account &&
                            <>
                                { dataUserV2.isWhitelist ?
                                        <AlertSuscess>
                                            <Flex>
                                                <Suscess/>
                                                { dataUserV2.userClaimed ?
                                                    <Text color="primaryBright" ml="10px">{t("You have claimed")}</Text>
                                                :
                                                    <Text color="primaryBright" ml="10px">{t("Congratulations! you won the rewards for the campaign. Click the claim button to receive  your rewards.")}</Text>
                                                }
                                            
                                            </Flex>
                                            <TokenEarn>
                                                {
                                                    listTokenEarn.map((token) => (
                                                        <TokenClaim itemReward={token} airdropContract={airdropContract} />
                                                    ))
                                                }
                                            </TokenEarn>
                                        </AlertSuscess>
                                    :
                                        <Alert isFailure={!false}>
                                            <Flex>
                                                <WarningV2/>
                                                <Text color="failure" ml="10px">{t("Sorry, you’re not a winner this time but don’t worry more giveaways are planned in the future! Follow us for latest update")}</Text>
                                            </Flex>
                                        </Alert>
                                }
                            </>
                        }
                        { account &&
                            <Flex width="100%" mt="1.5rem">
                                <Text color="textSecondary">{t("Your wallet")}:</Text>
                                <Text ml="5px" color="text">{accountEllipsis}</Text>
                            </Flex>
                        }
                        { account ?
                            <>
                                    { dataUserV2.userClaimed ?
                                        <Button
                                            width="100%"
                                            mt="1rem"
                                            disabled
                                        >
                                            Claim
                                        </Button>
                                    :
                                        <Button
                                            width="100%"
                                            mt="1rem"
                                            disabled={!isTimeCanClaim || dataUserV2.userClaimed || pendingTx || !dataUserV2.isWhitelist || isEndClaim }
                                            endIcon={pendingTx ? <AutoRenewIcon spin color="textSecondary" /> : null}
                                            onClick={handleClaimed}
                                        >
                                            Claim
                                        </Button>
                                    }
                            </>                            
                        :
                                <ConnectWalletButton mt="1rem"/>
                        } 
                       
                    </Col40>
                </Row>
            </CustomContainer>
    )
}
export default Body

const TokenEarn = styled.div`
    padding-top:5px;
    padding-left: 30px;
`

const CustomContainer = styled(Container)`
    height:auto;
    padding-top:20px;
    width:100%;
    display:flex;
    align-items:center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
       padding-left:10px;
       padding-right:10px;
       height:auto;
    }
`
const Col40 = styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    padding-left:1.5rem;
    padding-right:1rem;
    @media only screen and (max-width: 768px) {
        padding-left:10px;
        padding-right:10px;
        width:100%;
        margin-bottom:1rem;
        height:auto;
        margin-top:1rem;
    }
`
const Col60 = styled.div`
    width:60%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding-left:1rem;
    padding-right:1.5rem;
    @media only screen and (max-width: 768px) {
        padding-left:10px;
        padding-right:10px;
        width:100%;
        margin-bottom:1rem;
        height:auto;
        margin-top:1.5rem;
    }
`
const Row = styled(Flex)`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    @media only screen and (max-width: 768px) {
        flex-direction:column-reverse;
    }
`

const Line = styled(Flex)`
    width:100%;
    border-top:1px solid ${({ theme }) => theme.isDark ? theme.colors.modalHeader : "#E6E8EC"};
    margin-top:1rem;
    margin-bottom:1rem;
`

const ContainerBreadcrumbs = styled(Flex)`
    @media only screen and (max-width: 1290px) {
        padding-left:0.25rem;
    }
`
const CustomLink = styled(Text)`
    color:${({ theme }) => theme.colors.text};
    cursor:pointer;
    &:hover {
        color:${({ theme }) => theme.colors.primaryBright};
    }
`   
const Tags = styled.div`
    width: 91.5px !important;
    height: 31px;
    border-radius:20px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    background:${({ theme }) => theme.colors.primaryBright};
    color:#fff;
    font-weight:700;
    margin-left:1rem;
`
const TitleDescription = styled(Flex)`
    width:100%;
    @media only screen and (max-width: 600px) {
        flex-direction:column-reverse;
        ${Flex}{
            width:100%;
            justify-content: flex-end;
            margin-bottom:0.5rem;
        }
    }
`
const ContainerCircle = styled.div`
    position:relative;
    width:auto;
    > img {
        position: absolute;
        top: 10px;
        left: 10px;
    }
`
const CustomTag = styled.div`
    width: 41px;
    height: 26px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#fff;
    border-radius:10px;
    background:${({ theme }) => theme.colors.primaryBright};
    font-size: 12px;
`
const Alert = styled.div<{isFailure?:boolean}>`
    background:${({ theme }) => theme.colors.modalHeader};
    padding-top:10px;
    padding-bottom:10px;
    padding-left:1.5rem;
    border-radius:${({ isFailure }) => isFailure ? "0px" : "40px"};
    border:1px solid ${({ theme, isFailure }) => isFailure ? theme.colors.failure : theme.colors.primaryBright};
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin-top:1rem;
`
const StyCountDown = styled(Flex)`
    width: 80px;
    height: 72.5px;
    align-items:center;
    justify-content:center;
    background-image: url("/images/airdrop/mask-countdown.png");
    background-repeat:no-repeat;
    background-size: auto;

`
const AlertSuscess = styled.div`
    background:${({ theme }) => theme.colors.modalHeader};
    padding-top:10px;
    padding-bottom:10px;
    padding-left:1.5rem;
    border-radius:"0px";
    border:1px solid ${({ theme }) => theme.colors.primaryBright};
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin-top:1rem;
`
const ContainerCalendar = styled.div`
    width:100%;
    margin-top:1rem;
    display:flex;
    flex-direction:row;
    justify-content:flex-start !important;
    align-items:flex-start;
    @media only screen and (max-width: 600px) {
        flex-direction:column;
    }
`