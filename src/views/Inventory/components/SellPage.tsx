import { Button, Flex, Text, Breadcrumbs, AutoRenewIcon } from '@phamphu19498/runtogether-uikit';
import { useTranslation } from 'contexts/Localization';
import React, { useState, useEffect } from 'react';
import PageFullWidth from 'components/Layout/PageFullWidth'
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { fetchBalanceNft } from 'state/marketplace/hook/fectDataMarketPlace';
import { fetchBalance } from "state/marketplace/actions"
import tokens from 'config/constants/tokens';
import Container from "components/Layout/Container";
import { AppDispatch } from "state/index"
import { renderBGCard, renderImgBox } from "utils/renderBGCard"
import { useDispatch } from 'react-redux'
import Copy from 'components/Pancake-uikit/components/Svg/Icons/Copy'
import ConnectWalletButton from 'components/ConnectWalletButton';
import { TRANDING_FEE, LINK_BOX_RUNGTOGETHER } from 'config';
import NumberFormat from 'react-number-format';
import { GetBoxName } from "hooks/useGetBoxName";
import { getAddress } from 'utils/addressHelpers';
import Header from './Header';
import { GetSimpleBoxType, FetchApprove } from "../hook/fetchData"
import { useSell } from '../hook/useSell';
import { useApproveForAll } from "../hook/useApprove"




const SellPageRun = () => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const { boxid }: { boxid: string } = useParams()
    const [ fillprice, setFillprie ] = useState(0)
    const actuallyReceived = fillprice-fillprice*TRANDING_FEE/100
    const fee = fillprice*TRANDING_FEE/100;
    const { boxType } = GetSimpleBoxType(boxid)
    const { boxName } = GetBoxName(boxType.toString())
    const { handleSell, pendingSell, isClose, requestedSell } = useSell(tokens.RunTogetherBox.address, boxid, fillprice, tokens.Run.address);
    const { handleApproveForAll, requestedApprovalForAll, pendingForAll } = useApproveForAll()
    const { dataApprove } = FetchApprove(requestedApprovalForAll)
    const checkNull = Number.isNaN(actuallyReceived)
    // fetch lại balance sau khi bán nft
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getBalance = async () => {
            try {
                const result = await fetchBalanceNft(account)
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
        if ( account ) {
            getBalance()
        }
    }, [account, requestedSell]) // eslint-disable-line react-hooks/exhaustive-deps
    function sAccount (dataAddress) {
        if ( dataAddress ) {
            return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
        }
        return ""
    }
    const [isOpenTooltipSeller, setOpenTooltipSeller] = useState(false);
    const [isOpenTooltipContract, setOpenTooltipContract ] = useState(false);
    const handleCopy = (value, type) => {
        navigator.clipboard.writeText(value);
            if ( type === "account"){
                setOpenTooltipSeller(!false);
                setTimeout(() => {
                    setOpenTooltipSeller(false);
                }, 3000);
            } if ( type === "contract") {
                setOpenTooltipContract(!false);
                setTimeout(() => {
                    setOpenTooltipContract(false);
                }, 3000);
            }
    }
    return (
        <PageFullWidth>
            <CustomContainer>
                <Header/>
                <Wrapper>
                    <ContainerImg>
                        <TableImgRun backgroundColor={renderBGCard(boxType)}>
                            { boxType !== 0 &&
                               <ImgRun src={renderImgBox(boxType)} alt="images-box"/>
                            }
                        </TableImgRun>
                    </ContainerImg>
                    <Content>
                        <Flex alignItems="start" flexDirection="column">
                            <Text fontWeight={700} color="#23262F" fontSize='30px'>{t("Run Together Box NFT")}</Text>
                            <Text fontWeight={700} color="#23262F" fontSize='26px'>{boxName} - #{boxid}</Text>
                        </Flex>
                        <Flex mt="1rem" width="100%" justifyContent="space-between">
                            <Text>{t("Seller")}</Text>
                            <Flex style={{position:"relative"}}>
                                <Text mr="8px">{sAccount(account)}</Text>
                                <Copy style={{cursor:"pointer"}} onClick={()=>handleCopy(account, "account")}/>
                                <Tooltip isTooltipDisplayed={isOpenTooltipSeller}>Copied</Tooltip>
                            </Flex>
                        </Flex>
                        <Flex mt="1rem" width="100%" justifyContent="space-between">
                            <Text>{t("Contract")}</Text>
                            <Flex style={{position:"relative"}}>
                                <Text mr="8px">{sAccount(getAddress(tokens.RunTogetherBox.address))}</Text>
                                <Copy style={{cursor:"pointer"}} onClick={()=>handleCopy(getAddress(tokens.RunTogetherBox.address), "contract")}/>
                                <Tooltip isTooltipDisplayed={isOpenTooltipContract}>Copied</Tooltip>
                            </Flex>
                        </Flex>
                        <Flex mt="1rem" width="100%" justifyContent="space-between">
                            <Text>{t("TokenId")}</Text>
                            <CustomId>
                               <Text bold>#{boxid}</Text>
                            </CustomId>
                        </Flex>
                        <Flex width="100%">
                            <Text>{t("Price")}</Text>
                        </Flex>
                        
                        <Flex marginTop="10px">
                            <ContainerInput marginLeft="1rem">
                                <NumberFormat
                                    value={fillprice}
                                    thousandSeparator={!false}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        setFillprie(parseFloat(value))    
                                    }}
                                />
                                <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                            </ContainerInput>
                        </Flex>
                        <Flex alignItems="center" mt="10px" width="100%" justifyContent="space-between">
                            <Text marginRight="1rem" color="#000">{t("Fee:")}</Text>
                            <Flex alignItems="center">
                                <Text marginRight="10px"  fontSize='24px' bold>
                                    { Number.isNaN(fee) === true ?
                                        "0 RUN"
                                    :
                                        <>
                                            {fee.toLocaleString('en', { maximumFractionDigits: 2 })}
                                        </>
                                    }
                                </Text>
                                <LogoImg src='/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png' alt='Run'/>
                            </Flex>
                        </Flex>
                        <Flex marginTop="10px" alignItems="center" width="100%" justifyContent='space-between'>
                            <Text marginRight="1rem">{t("Actual Received:")}</Text>
                            <Flex alignItems="center">
                                <Text marginRight="10px"  fontSize='24px' bold>
                                    { Number.isNaN(actuallyReceived) === true ?
                                            "0 RUN"
                                        :
                                            <>
                                                {actuallyReceived.toLocaleString('en', { maximumFractionDigits: 2 })}
                                            </>
                                        }
                                </Text>
                                <LogoImg src='/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png' alt='Run'/>
                            </Flex>
                        </Flex>
                       
                        <Flex marginTop="1.5rem" width="100%" justifyContent="center">
                            { account ?
                                <>
                                    { dataApprove === true ?
                                        <>
                                            { isClose === true ?
                                                <CustomButton 
                                                    width="300px"
                                                    disabled
                                                > 
                                                    {t("SOLD")} 
                                                </CustomButton>
                                            :
                                                <CustomButton 
                                                    width="300px"
                                                    disabled={fillprice <= 0 || checkNull || pendingSell}
                                                    onClick={handleSell}
                                                    endIcon={pendingSell ? <AutoRenewIcon spin color="textDisable" /> : null}
                                                > 
                                                    {t("SELL")} 
                                                </CustomButton>
                                            }
                                        </>
                                    :
                                        <CustomButton 
                                            width="300px" 
                                            onClick={handleApproveForAll}
                                            disabled={pendingForAll}
                                            endIcon={pendingForAll ? <AutoRenewIcon spin color="textDisable" /> : null}
                                        > 
                                            {t("APPROVED")} 
                                        </CustomButton>
                                    }
                                </>
                            :
                                <ConnectWalletButton width="300px"/>
                            }
                            </Flex>
                    </Content>
                </Wrapper>
            </CustomContainer>
            
        </PageFullWidth>
    );
};

export default SellPageRun;

const Wrapper = styled(Flex)`
    width:100%;
    flex-direction: row;
    @media screen and (max-width: 768px) {
        flex-direction:column-reverse;
    }
`
const ContainerImg = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    position:relative;
    @media screen and (max-width: 600px) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top:2rem;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top:2rem;
    }

`
const TableImgRun = styled.div<{backgroundColor?:string}>`
    width: 80%;
    position: relative;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background:${({ backgroundColor }) => backgroundColor};
    border-radius:20px;
    @media screen and (max-width: 600px){
        width: 90%;
        padding:12px;
        box-shadow: none;
    }
  @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 70%;
    box-shadow: none;

  }

`
const ImgRun = styled.img`
    width: 100%;
    height: auto;
`
const Content = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    flex-direction:column;
    justify-content: center;
    margin-top: 2rem;
    @media screen and (max-width: 600px){
    width: 100%;
    padding-left:15px;
    padding-right:15px;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 100%;
    }
`
const ContainerInput = styled(Flex)`
    width: 100%;
    height: 55px;
    justify-content:space-between;
    align-items:center;
    padding-left:15px;
    padding-right:15px;
    margin-left:0px;
    background:#f1f1f1;
    border-radius:8px;
    > input {
        background:transparent !important;
        border:none;
        box-shadow:none;
        color:${({ theme }) => theme.colors.text};
        font-size:16px;
        width: 100%;
        font-weight:600;
        font-size:18px;
    }
`
const CustomContainer = styled(Container)`
    padding-top:1.5rem;
    width: 100%;
    padding-bottom:1.5rem;
    @media only screen and (max-width: 600px) {
        padding-left:0px;
        padding-right:0px;
    } 
`
const CustomButton = styled(Button)`
  text-transform:uppercase;
  font-weight:bold;
  border-radius:90px;
  width:100%;
  box-shadow:none;
`
const Tags = styled.img`
    height: 40px;
    width: 40px;
    border-radius:50%;
    overflow:hidden;
    position: absolute;
    top:10px;
    right:10px;
`
const CustomId = styled(Flex)`
    background: rgba(48, 179, 140, 0.25);
    border-radius: 6px;
    width: 61px;
    height: 32px;
    padding:0px 10px 0px 10px;
    justify-content: center;
    align-items: center;
`

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: -15px;
  text-align: center;
  background-color: #fff;
  color: #000;
  border-radius: 16px;
  width: 100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`
const CustomFlex = styled(Flex)`
    @media only screen and (max-width: 600px) {
        padding-left:15px !important;
    } 
`
const LogoImg = styled.img`
    width: 30px;
    height:30px;
`