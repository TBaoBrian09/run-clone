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
import { renderBGCard } from "utils/renderBGCard"
import { useDispatch } from 'react-redux'
import ConnectWalletButton from 'components/ConnectWalletButton';
import { TRANDING_FEE, LINK_BOX_RUNGTOGETHER } from 'config';
import NumberFormat from 'react-number-format';
import { GetBoxName } from "hooks/useGetBoxName";
import { GetSimpleBoxType, FetchApprove, ChekcSellerWhitelist } from "../hook/fetchData"
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
    const linkImagesBox = boxType !==0 ? `${LINK_BOX_RUNGTOGETHER}/box${boxType}.png` : null
    const { handleSell, pendingSell, isClose, requestedSell } = useSell(tokens.RunTogetherBox.address, boxid, fillprice, tokens.busd.address);
    const { handleApproveForAll, requestedApprovalForAll, pendingForAll } = useApproveForAll()
    const { dataApprove } = FetchApprove(requestedApprovalForAll)
    const checkNull = Number.isNaN(actuallyReceived)
    const { isWhitelist } = ChekcSellerWhitelist()
    const { boxName } = GetBoxName(boxType.toString())
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
    return (
        <PageFullWidth>
            <CustomContainer>
                <Flex mb="12px">
                    <Breadcrumbs>
                        <CustomButton variant='text' as={Link} to="/adminruntogether">
                            {t("Run Together")}
                        </CustomButton>
                        <Text color="primaryBright" bold textTransform="uppercase">
                            {t("NFT Detail")}
                        </Text>
                    </Breadcrumbs>
                </Flex>
                <Wrapper>
                    <ContainerImg>
                        <TableImgRun backgroundColor={renderBGCard(boxType)}>
                            { boxType !== 0 &&
                                <ImgRun src={linkImagesBox} alt="images-box"/>
                            }
                        </TableImgRun>
                    </ContainerImg>
                    <Content>
                        <Flex alignItems="center">
                            <img src="/images/martketplace/RunTogether_Logo.png" alt="logo-run" style={{width:"30px"}}/>
                            <Text ml="10px" bold fontSize='22px'>{t("Run Together Box NFT")}</Text>
                        </Flex>
                        <Text bold fontSize='22px'>
                            {t('Run Together Box Nft #%idnft% - %symbol%', { idnft: boxid, symbol:boxName })}
                        </Text>
                        <Flex marginTop="1rem" width="100%">
                            <Text>{t("Enter NFT selling price")}</Text>
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
                            </ContainerInput>
                        </Flex>
                        <Flex marginTop="20px" alignItems="center">
                            <Text marginRight="1rem">{t("Actual Received:")}</Text>
                            <LogoImg src='/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png' alt='BUSD'/>
                            <Text marginLeft="1rem"  fontSize='24px' color="primaryBright" bold>
                                { Number.isNaN(actuallyReceived) === true ?
                                        "0 BUSD"
                                    :
                                        <>
                                            {actuallyReceived.toLocaleString('en', { maximumFractionDigits: 2 })} {tokens.busd.symbol}
                                        </>
                                    }
                            </Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Text marginRight="1rem">{t("Fee:")}</Text>
                            <LogoImg src='/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png' alt='BUSD'/>
                            <Text marginLeft="1rem"  fontSize='24px' color="primaryBright" bold>
                                { Number.isNaN(fee) === true ?
                                    "0 BUSD"
                                :
                                    <>
                                        {fee.toLocaleString('en', { maximumFractionDigits: 2 })} {tokens.busd.symbol}
                                    </>
                                }
                            </Text>
                        </Flex>
                        { isWhitelist === true &&
                            <Flex marginTop="1.5rem" width="100%" justifyContent="center">
                            { account ?
                                <>
                                    { dataApprove === true ?
                                        <>
                                            { isClose === true ?
                                                <Button 
                                                    width="300px"
                                                    disabled
                                                > 
                                                    {t("SOLD")} 
                                                </Button>
                                            :
                                                <Button 
                                                    width="300px"
                                                    disabled={fillprice <= 0 || checkNull || pendingSell}
                                                    onClick={handleSell}
                                                    endIcon={pendingSell ? <AutoRenewIcon spin color="textDisable" /> : null}
                                                > 
                                                    {t("SELL")} 
                                                </Button>
                                            }
                                        </>
                                    :
                                        <Button 
                                            width="300px" 
                                            onClick={handleApproveForAll}
                                            disabled={pendingForAll}
                                            endIcon={pendingForAll ? <AutoRenewIcon spin color="textDisable" /> : null}
                                        > 
                                            {t("APPROVED")} 
                                        </Button>
                                    }
                                </>
                            :
                                <ConnectWalletButton width="300px"/>
                            }
                            </Flex>
                        }
                        { isWhitelist === false &&
                            <Text mt="10px" width="100%" textAlign="center" color="failure">{t("Your wallet address is not in whitelist")}</Text>
                        }
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
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background:${({ backgroundColor }) => backgroundColor};
    border-radius:20px;
    @media screen and (max-width: 600px){
    width: 70%;
    box-shadow: none;

  }
  @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 50%;
    box-shadow: none;

  }

`
const ImgRun = styled.img`
    width: 100%;
    height: auto;
`
const Content = styled.div`
    width: 55%;
    height: auto;
    display: flex;
    flex-direction:column;
    justify-content: center;
    margin-top: 2rem;
    @media screen and (max-width: 600px){
    width: 100%;
    padding-left:10px;
    padding-right:5px;
  }
  @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 100%;
    margin-left: 1rem;
  }

`
const LogoImg = styled.img`
    width: 28px;
    height: 28px;
    @media screen and (max-width: 600px){
    width: 32px;
    height: 32px;
  }
`
const ContainerInput = styled(Flex)`
    width: 95%;
    height: 55px;
    justify-content:space-between;
    align-items:center;
    padding-left:5px;
    padding-right:5px;
    margin-left:0px;
    background:${({ theme }) => theme.colors.input};
    border-radius:5px;
    > input {
        background:transparent !important;
        border:none;
        box-shadow:none;
        color:${({ theme }) => theme.colors.text};
        font-size:16px;
        width: 100%;
    }
`
const CustomContainer = styled(Container)`
    padding-top:1.5rem;
    width: 100%;
    @media only screen and (max-width: 600px) {
        padding-left:0px;
        padding-right:0px;
    } 
`
const CustomButton = styled(Button)`
  height:34px;
  text-transform:uppercase;
  font-weight:bold;
  color:${({ theme }) => theme.colors.text} !important;
  @media screen and (max-width: 600px){
    width: 100%;
  }
  @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 100%;
  }
`