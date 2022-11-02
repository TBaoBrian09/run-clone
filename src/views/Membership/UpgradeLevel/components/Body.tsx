import React, { useState, useCallback, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import ReactPlayer from "react-player";
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton';
import { useTranslation } from 'contexts/Localization'
import { useModal } from '@phamphu19498/runtogether-uikit'
import { Text, Button, Swap, CopyIcon, Flex, MetamaskIcon, PrivilegesArrow, Box } from 'components/Pancake-uikit'
import { fetchDataBountyUser } from 'views/Membership/hooks/fetchDataBounty';
import { registerTokenUpgrade } from 'utils/wallet';
import { ethers } from 'ethers'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast';
import useRefresh from 'hooks/useRefresh';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import { useBounty, useERC20 } from 'hooks/useContract';
import { getAddress } from 'utils/addressHelpers';
import { BASE_BSC_SCAN_URL } from 'config'
import Infor from './Infor'
import {  Conditions } from '../../config'
import ModalYourRight from '../../components/ModalYourRights'

const Wrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  padding-top:20px;
  padding-bottom:20px;
  background: ${({ theme }) => theme.colors.backgroundModal};
  backdrop-filter: blur(90px);
  box-shadow: 0px 4px 18px rgba(115, 184, 246, 0.1);
  @media only screen and (max-width: 1100px){
    flex-direction: column;
  }
  @media only screen and (min-width: 768px) and (max-width: 1100px){
    padding:0px 30px 0px 30px;
  }
  @media only screen and (max-width: 600px){
    padding:0px 10px 0px 10px;
  }
`

const Col50 = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 1025px){
    width: 100%;
  }
`
const Paragraph = styled.div`
  width:100%;
  display:flex;
  flex-direction: row;
  @media screen and (max-width: 1400px) and (min-width: 600px) {
    height:400px;
  }
`
const Container = styled.div`
  width:100%;
  margin:15px 25px 25px 25px;
  padding:20px;
  border-radius:20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.upgradelevelContainer};
  @media only screen and (max-width: 1025px){
    padding:20px 5px 20px 5px;
    margin:5px 5px 0px 5px;
  }
`
const Level = styled.div`
  width:50%;
  margin-top:10px;
  padding:15px 25px 15px 25px;
  border-radius:10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.membershipwrapperheaderbackground};

  @media only screen and (max-width: 480px){
    width: 75%;
  }
`
const Col100 = styled.div`
  width:100%;
  flex-direction: column;
  display:flex;
  align-items: center;
    justify-content: center;
`
const WrapperButton = styled.div`
  width:50%;
  margin-top:10px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 480px){
    width: 100%;
  }
`
const CustomButton = styled(Button)`
  @media only screen and (max-width: 480px){
    width: 75%;
  }
`
const WrapperToken = styled.div`
    width:100%;
    display:flex;
    
`
const Subtitle = styled.div`
  width:100%;
  flex-direction: row;
  display:flex;
  align-items: center;
  justify-content: center;
  margin-top:10px;
  @media only screen and (max-width: 480px) {
    display: -webkit-box;
    flex-wrap: wrap;
  }
  @media screen and (max-width: 600px) {
    > div {
      font-size:13px !important;
    }
  }
  
`
const SwapButton = styled(Swap)`
  margin-top:20px;
  margin-bottom:20px;
  cursor: pointer;
`
const TextItalic = styled(Text)`
  font-style:italic;
`
const ContainerInputToken = styled.div`
  width:100%;
  margin:0px 25px 25px 25px;
  padding:20px;
  @media only screen and (max-width: 1025px){
    padding:20px 5px 20px 5px;
    margin:5px 5px 0px 5px;
  }
`
const TokenAddress = styled.div`
  width:85%;
  display: flex;
  justify-content: flex-start;
  align-items: center; 
  padding: 15px 10px 15px 10px;
  background: #101133;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`
const ContainerIcon = styled.div`
  width:15%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:${({ theme }) => theme.colors.textDisabled};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`
const CustomFlex = styled(Flex)`
  padding:10px;
  border-radius:16px;
  padding-left:0px;
  padding-right:0px;
  position: relative;
`
const LinkContract = styled(Text)`
  font-style: italic;
  color:${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  cursor:pointer;
`
const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -28px;
  right: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  width: 100px;
`
const StyledText=styled(Text)`
color:${({ theme }) => (theme.isDark ? '#fff' : '#000')} !important;
  &:hover{
    color:#fdb533 !important;
  }
`
const Privileges = styled.div`
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`
const ButtonPrivileges = styled(Button)`
  height:20px !important;
  color:${({ theme }) => theme.colors.primary} !important;
  margin-top:16px;
  margin-bottom:16px;
`
interface PropType {
  level:string
}
const Body: React.FC<PropType> = ({ level }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const [pendingTx, setPendingTx] = useState(false)
  const UpgradelevelInfor = Conditions.find(item => item.title === level);
  const { theme } = useTheme()
  const [reverse, setreverse] = useState(false)
  const [membership, setMembership] = useState(UpgradelevelInfor)
  const { callWithGasPrice } = useCallWithGasPrice()
  const {toastSuccess, toastError} = useToast()
  const erc20Contract = useERC20(getAddress(membership.tokenUpgrade.address))
  const membershipContract = useBounty(level)
  const URLTOBSC = BASE_BSC_SCAN_URL
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
  const isLimit = (membership?.totalPerUser - membership?.claimed) || 0
  const handleClick = useCallback(() => setreverse(!reverse), [reverse]);
  const contractAddress = getAddress(membership.contractAddress)
  const armorial = UpgradelevelInfor.title
  const [ModalYourRights] = useModal(<ModalYourRight level={armorial} />)
  const SetUpgrade = () => {setreverse(false)}
  const handleCopy = () => {
    navigator.clipboard.writeText(`${contractAddress}`);
      setIsTooltipDisplayed(true);
      setTimeout(() => {
        setIsTooltipDisplayed(false);
      }, 1000);
  }
  // console.log(isTooltipDisplayed)
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

  const handleRedeemToken = async() => {
    try {
      setPendingTx(true);
			await callWithGasPrice(membershipContract, 'returnNFT', [membership.nftLists[membership.nftLists.length - 1]])
      toastSuccess('Successful', t('Redeem token successful.'))
      setPendingTx(false);
    } catch (e) {
      setPendingTx(false);
			console.log(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }

  const handleApprove = async() => {
    try {
      setPendingTx(true);
			await callWithGasPrice(erc20Contract, 'approve', [getAddress(membership.contractAddress), ethers.constants.MaxUint256])
      toastSuccess('Successful', t('Approve contract successful.'))
      setPendingTx(false);
    } catch (e) {
      setPendingTx(false);
			console.log(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }

  const handleApproveForAll = async() => {
    try {
      setPendingTx(true);
			await callWithGasPrice(membershipContract, 'setApprovalForAll', [getAddress(membership.contractAddress), 'true'])
      toastSuccess('Successful', t('Approve contract successful.'))
      setPendingTx(false);
    } catch (e) {
      setPendingTx(false);
			console.log(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }

  useEffect(() => {
    async function fetchMembershipUserData () {
      if (account && UpgradelevelInfor !== undefined) {
        const result = await fetchDataBountyUser(account, UpgradelevelInfor)
        setMembership(result)
      }
    }
    fetchMembershipUserData()
  }, [account, fastRefresh, UpgradelevelInfor])

  const [windowSize, setWindowSize] = useState(window.innerWidth)
  useEffect(() => {
      const handleResize = () => {
          setWindowSize(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
  }, [])
  if (UpgradelevelInfor === undefined) return <Redirect to="/membership" />
  
  const renderTokenAddress = windowSize < 600 ? `${contractAddress.substring(0, 8)}...${contractAddress.substring(contractAddress.length - 8)}` : contractAddress;
  const MovetoBSC = () => {
    window.open(`${URLTOBSC}/address/${contractAddress}`);
  }
  const isManualCakePool = 0
  const Address = contractAddress
  const tokenName= UpgradelevelInfor.symbolLevel
  const logo=UpgradelevelInfor.image
  return (
    <Wrapper>
       <Col50 style={{flexDirection:"column"}}>
          <Paragraph>
              <ReactPlayer
                url={UpgradelevelInfor.videos}
                className='react-player'
                playing
                loop
                width='100%'
                height='100%'
              />
          </Paragraph>
          <Col100>
              <Privileges onClick={ModalYourRights}>
                <ButtonPrivileges scale="md" variant="text">
                    Privileges
                </ButtonPrivileges>
                <PrivilegesArrow color="primary" style={{transform: "rotate(270deg)"}}  />
              </Privileges>
          </Col100>
        </Col50>
      <Col50 style={{flexDirection:"column", marginRight:"25px"}}>
        <Container>
        <WrapperToken style={{flexDirection: reverse === true ? "column" : "column-reverse"}}>
              <Col100>
              { reverse === true ?
                  <Text style={{display:"flex",justifyContent:"center"}} color="text">Level</Text>
                :
                  <Text style={{display:"flex",justifyContent:"center"}} color="text">Level up to:</Text>
                }
                <Level>
                  <img src={UpgradelevelInfor.image} alt="level" width="40px"/>
                  <Text color="#fff">1 {UpgradelevelInfor.title}</Text>
                </Level>
              </Col100>
              { reverse === true && 
                <Col100 style={{marginTop:"10px"}}>
                  <Box>
                    <Flex style={{justifyContent:"center"}}>
                      <Text color="text">Balance:</Text>
                      <Text color="primary" ml="2px"> { membership.nftLists.length || 0 } {UpgradelevelInfor.title}</Text>
                    </Flex>
                    <TextItalic ml="2px">(Maximum: <b> {UpgradelevelInfor.Maximumsupply} {UpgradelevelInfor.title}</b> )</TextItalic>
                </Box>
                </Col100>
              }
              <Col100 >
                  <SwapButton onClick={handleClick} color="text"/>
              </Col100>
              <Col100>
                { reverse === true ?
                  <Text style={{display:"flex",justifyContent:"center"}} color="text">LTD received:</Text>
                :
                  <Text style={{display:"flex",justifyContent:"center"}} color="text">LTD required:</Text>
                }
                <Level>
                  <img src="/images/LTD_Logo.svg" alt="logo" width="30px"/>
                  <Text color="#fff">{ membership.ltdRequired.toLocaleString('en', { maximumFractionDigits: 0 }) } LTD</Text>
                </Level>
              </Col100>
            </WrapperToken>
            { reverse === true ? 
              <Subtitle>
                <Text>1.25% fee when redeemed for LTD</Text>
              </Subtitle>
            :
              // <Subtitle>
              //   <Text>You own</Text>&nbsp;
              //   <Text color="primary" ml="2px"> { membership.nftLists.length || 0 } {UpgradelevelInfor.title}</Text>
              //   <TextItalic ml="2px">(Max amount per user: <b> {UpgradelevelInfor.Maximumsupply} {UpgradelevelInfor.title}</b> )</TextItalic>
              // </Subtitle>
              <Box mt="10px">
                <Flex style={{justifyContent:"center"}}>
                  <Text color="text">Balance:</Text>
                  <Text color="primary" ml="2px"> { membership.nftLists.length || 0 } {UpgradelevelInfor.title}</Text>
                </Flex>
          
                <TextItalic ml="2px">(Maximum: <b> {UpgradelevelInfor.Maximumsupply} {UpgradelevelInfor.title}</b> )</TextItalic>
              </Box>
            }
              
          <WrapperButton>
              <Col100>
                {!account ? 
                  <ConnectWalletButton/>
                : 
                  <Col100>
                  { reverse === true ?
                      membership?.approveReturn
                      ?
                        <CustomButton variant="redeembutton" mt="20px" width="100%" disabled={pendingTx || !membership.nftLists.length} onClick={handleRedeemToken}>Redeem</CustomButton>
                      :
                        <CustomButton variant="redeembutton" mt="20px" width="100%" disabled={pendingTx} onClick={handleApproveForAll}>Enable Contract</CustomButton>
                    :
                      membership?.allowance > 0
                      ?
                        <CustomButton variant="primary" mt="20px" width="100%" disabled={pendingTx || isLimit === 0} onClick={handleUpgrade} >Upgrade</CustomButton>
                      :
                        <CustomButton variant="primary" mt="20px" width="100%" disabled={pendingTx} onClick={handleApprove}>Enable Contract</CustomButton>
                  }
                  </Col100>
                }
              </Col100>
            </WrapperButton>
            
        </Container>
        <ContainerInputToken>
          <Text color="text">NFT Contract Address:</Text>
          <CustomFlex>
            <TokenAddress>
              <LinkContract onClick={MovetoBSC}>{renderTokenAddress}</LinkContract>
              </TokenAddress>
            <ContainerIcon>
              <CopyIcon onClick={handleCopy} style={{cursor:"pointer"}}/>
              <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
            </ContainerIcon>
          </CustomFlex>
        </ContainerInputToken>
        { account && (
        <Flex justifyContent="flex-end" mb="20px" width="100%">
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
       )}
      </Col50>
    </Wrapper>
  )
}

export default Body
