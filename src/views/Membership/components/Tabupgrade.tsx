import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Flex, Text, Button } from "@phamphu19498/runtogether-uikit"
import { MetamaskIcon, CoppyIcon } from 'components/Pancake-uikit'
import { useTranslation } from "contexts/Localization";
import { getAddress } from 'utils/addressHelpers';
import useRefresh from 'hooks/useRefresh';
import { fetchDataBountyUser } from 'views/Membership/hooks/fetchDataBounty';
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import useToast from 'hooks/useToast';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import { useBounty, useERC20 } from 'hooks/useContract';
import { registerTokenUpgrade } from 'utils/wallet';
import { BASE_BSC_SCAN_URL } from 'config'
import { Conditions } from '../config'


interface ProptypeData {
   condition?:string
}
const Tabupgrade: React.FC<ProptypeData> = ({condition}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const Items = Conditions.filter((items) => items.title === condition)[0]
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [membership, setMembership] = useState(Items)
    const [pendingTx, setPendingTx] = useState(false)
    const {toastSuccess, toastError} = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
    const membershipContract = useBounty(condition)
    const contractAddress = getAddress(Items.contractAddress)
    const erc20Contract = useERC20(getAddress(Items.tokenUpgrade.address))
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(`${contractAddress}`);
          setIsTooltipDisplayed(true);
          setTimeout(() => {
            setIsTooltipDisplayed(false);
          }, 1000);
      }
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        async function fetchMembershipUserData () {
          if (account && Items !== undefined) {
            const result = await fetchDataBountyUser(account, Items)
            setMembership(result)
          }
        }
        fetchMembershipUserData()
        
      }, [account, fastRefresh, Items])
    const MovetoBSC = () => {
        window.open(`${BASE_BSC_SCAN_URL}/address/${contractAddress}`);
    }
    const handleApprove = async() => {
        try {
          setPendingTx(true);
          await callWithGasPrice(erc20Contract, 'approve', [contractAddress, ethers.constants.MaxUint256])
          toastSuccess('Successful', t('Approve contract successful.'))
          setPendingTx(false);
        } catch (e) {
          setPendingTx(false);
                console.log(e)
          toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        }
      }
    const handleUpgrade = async() => {
        try {
          setPendingTx(true);
                await callWithGasPrice(membershipContract, 'stakeForBounty', [])
          toastSuccess('Upgrade successfully', t('Upgrade successful.'))
          setPendingTx(false);
        } catch (e) {
          setPendingTx(false);
                console.log(e)
          toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        }
      }
  const renderTokenAddress = windowSize < 600 ? `${contractAddress.substring(0, 8)}...${contractAddress.substring(contractAddress.length - 8)}` : contractAddress;
  const isManualCakePool = 0
  const Address = contractAddress
  const tokenName= Items.symbolLevel
  const logo=Items.image

  console.log(membership)

    return (
        <Wrapper>
            <Col style={{display:"flex", justifyContent:"center"}}>
                <ContainerImg>
                    <FlexBalance>
                        <Text color="textSecondary">{t("Balance")}:</Text>
                        <Text color="text" ml="5px">{ membership.tokenList.length || 0 }</Text>
                    </FlexBalance>
                    <BgImg>
                        <img src={Items.image} alt="logo-condition"/>
                    </BgImg>
                    <Text mt="1rem" textAlign="center" color="text" bold fontSize="18px">{Items.title}</Text>
                </ContainerImg>
            </Col>
            <Col>
                <Flex width="100%" justifyContent="space-between" mt="1.5rem" alignItems="center">
                    <Text fontSize="18px" color="text" bold>{t("LTD required")}</Text>
                    <Flex alignItems="center">
                        <img src="/images/LTD_Logo.svg" alt="logo" style={{width:"25px", height:"auto"}}/>
                        <Text fontSize="18px" bold color="text" ml="8px">{Items.ltdRequired.toLocaleString('en', { maximumFractionDigits: 0 })}</Text>
                    </Flex>
                </Flex>
                { membership.allowance > 0 ?
                    <Button width="100%" mt="1rem" onClick={handleUpgrade}>{t("Upgrade")}</Button>
                :
                    <Button width="100%" mt="1rem" onClick={handleApprove}>{t("Enable Contract")}</Button>
                }
                
                <Flex width="100%" justifyContent="flex-start" mt="1.5rem" alignItems="center" style={{position:"relative"}}>
                    <Text fontSize="16px" color="text" bold>{t("Contract Address:")}</Text>
                    <CustomLink color='text' onClick={()=>MovetoBSC()}>{renderTokenAddress}</CustomLink>
                    <Coppy onClick={handleCopy}/>
                    <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
                </Flex>
                <Flex justifyContent="flex-start" mt="0.5rem" mb="10px" width="100%">
                    <Button
                        variant="text"
                        p="0"
                        height="auto"
                        onClick={() => registerTokenUpgrade(Address, tokenName, isManualCakePool, logo)}
                    >
                        <StyledText color="primary" fontSize="14px">
                        {t('Add to Metamask')}
                        </StyledText>
                        <MetamaskIcon ml="4px" />
                    </Button>
                </Flex>
            </Col>
        </Wrapper>
    )
}
export default Tabupgrade

const Wrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
    width:100%;
`

const Col = styled.div`
    width:100%;
    height:auto;

`
const ContainerImg = styled.div`
    border-radius:5px;
    background:${({ theme }) => theme.colors.backgroundTab};
    width:100%;
    height: 258px;
    position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 529px;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
        width: 329px;
    }
      
`
const BgImg = styled.div`
    width: 199px;
    height: 199px;
    border-radius:50%;
    background: url(${({ theme }) => theme.isDark ? "/images/membership/mask-condition-dark.jpg" : "/images/membership/mask-condition-light.jpg"});
    display:flex;
    justify-content:center;
    align-items:center;
    > img {
        width:150px;
        height:auto;
    }
    @media only screen and (max-width: 600px) {
        width: 170px;
        height:170px;
        > img {
            width:120px;
            height:auto;
        }
    }
`
const FlexBalance = styled(Flex)`
    position: absolute;
    right:30px;
    top: 20px;
    @media only screen and (max-width: 600px) {
        right:10px;
    }
`
const CustomLink = styled(Text)`
    margin-left:5px;
    font-style: italic;
    text-decoration-line: underline;
    cursor:pointer;
`
const StyledText=styled(Text)`
color:${({ theme }) => theme.colors.text} !important;
  &:hover{
    color:${({ theme }) => theme.colors.primaryBright} !important;
  }
`
const Coppy = styled(CoppyIcon)`
  margin-left:5px;
  cursor:pointer;
  fill:${({ theme }) => theme.colors.text} !important;
  @media only screen and (max-width: 600px) {
    margin-left:10px;
}
`
const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.modalHeader};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  width: 100px;
`