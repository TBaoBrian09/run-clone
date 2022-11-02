import { Flex, Input, Text, AutoRenewIcon,Button,Skeleton } from '@phamphu19498/runtogether-uikit'
import { useWeb3React } from '@web3-react/core'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import HeaderProposals from 'components/HeaderProposals/HeaderProposals'
import PageFullWidth from 'components/Layout/PageFullWidth'
import { OpenNewIcon } from 'components/Pancake-uikit'
import { useHistory } from 'react-router-dom'
import { BASE_BSC_SCAN_URL, MIN_CREATE_VOTING_PROPOSALS } from "config/index"
import { useTranslation } from 'contexts/Localization'
import React, { useState, useEffect } from 'react'
import tokens from 'config/constants/tokens'
import TextField from '@mui/material/TextField';
import { GetTokenBalance } from "utils/getTokenBalance";
import { GetAllowanceVoting, GetListProposals, GetTotalProposals } from 'state/votingProposals'
import styled from 'styled-components'
import ConnectWalletButton from 'components/ConnectWalletButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useToast from "hooks/useToast";
import { getAddress } from 'utils/addressHelpers';
import { useApprove } from "views/Vote/hook/useApprove"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Nav from 'views/Invest/components/SubNav'
import contracts from 'config/constants/contracts'
import { GetAmountMintToVote } from 'state/poolProposals'
import { Container, WrapAppBody, Wrapper } from 'views/Invest/styles'
import { NUMBER1M } from 'config/constants'
import { useCreateVoting } from "./hook/useCreateVoting"
import { FetchVotingDuration } from './hook/fetchVotingDuration'



const MakeAProposals = () => {
  
  const { t } = useTranslation()
  const [ minAmountToVote ] = GetAmountMintToVote()
  // const [ startDate, setStartDate ] = useState(getDateNow())
  // const [ endDate, setEndDate ] = useState(getTheNextDay())
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [ totalProposals ] = GetTotalProposals()
  const [ listProposals ] = GetListProposals(totalProposals)  
  const lastProposal = listProposals?.slice(-1).pop();
  const findIdByLast = lastProposal?.votingId +1 || 0; 
  const {stakeVotingDuration} = FetchVotingDuration(getAddress(contracts.votingProposals)); 
  const timeNow  = Date.now();
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
  const { account } = useWeb3React()
  function renderAccount (address) {
      let sAccount = ""
      if ( account ) {
        if ( windowSize < 1080 ) {
          sAccount =`${address.substring(0, 4)}...${address.substring(address.length - 4)}`
        } else {
          sAccount = address
        }
      }
      return sAccount
  }
  const openBSC = () => {
    window.open(`${BASE_BSC_SCAN_URL}/address/${account}`);
  }
  const { handleApprove, requestedApproval, pendingTx } = useApprove()
  const [ allowanceVoting ] = GetAllowanceVoting(account, requestedApproval)
  const { handleVoting, requestedVoting, pendingVoting } = useCreateVoting()
  const history = useHistory();
  const { balance } = GetTokenBalance(tokens.Run.address, requestedVoting)
  useEffect(() => {
    if ( requestedVoting ) {
      history.push("/proposals")
    }
  }, [requestedVoting]) // eslint-disable-line react-hooks/exhaustive-deps
  function convertDate(date: any){  
    if (date) {  
    const today=  new Date(date);
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear();
    return <Flex alignItems="center">
        <Text bold>{hours}:{minutes}</Text>
        <Text ml="10px" bold>{dd}/{mm}/{yyyy}</Text>
    </Flex>;    
    }
    return <Skeleton width={60} />
  }
  type optionDay = {
      year?:any,
      month?:any,
      day?:any
  }
  const configOptionDay:optionDay = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
  } 
  const onKeyDown = (e) => {
      e.preventDefault();
  };
  return (
    <PageFullWidth>
      <HeaderLiquidity bgColor="#029DA5" namePlace="Invest Together" nameTitle="run together" />
      <Nav />
      <Container>
        <WrapAppBody>
            <Wrapper>
              <HeaderProposals headerName='Make a Proposals'/>
              <Content>
                <Flex>
                  <Text bold fontSize='24px' paddingBottom='40px'>Action</Text>
                </Flex>
                  <Row style={{ marginBottom: '20px' }}>
                     <Col>
                        <WrapInput>                                                                                                      
                            <Text>{t("Vote ID")}</Text>    
                            <CustomId>
                                  <Text bold >#{findIdByLast}</Text>
                            </CustomId>                                                                                             
                        </WrapInput>
                     </Col>
                     <Col>
                        <WrapInput>                        
                           <Text>{t("Start date")}</Text>
                          {convertDate(timeNow)}
                        </WrapInput>
                        <WrapInput> 
                          <Text>{t("End date")}</Text>
                          {convertDate(timeNow+(stakeVotingDuration*1000))}
                        </WrapInput>
                     </Col>
                  </Row>
                  <div style={{ marginBottom: '20px' }}>                      
                            <Label>Creator</Label>
                            <Flex position='relative'>
                              <CsInput type='text' readOnly value={account ? renderAccount(account) : 'No Data'}/>
                              { account &&
                                <CsOpenNewIcon onClick={openBSC} />
                              }

                            </Flex>                      
                  </div>
                  <CustomRow>                   
                    <TextCol>                                                                                         
                          <Flex flexDirection="column" style={{gap:'9px'}}> 
                              <Text lineHeight='21px'>Your RUN balance: <b>{balance.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></Text>
                              <Text fontSize='16px' >You need at least 1,000,000 RUN to publish a proposal.</Text>
                          </Flex>                                                                                                                                                                       
                   </TextCol> 
                   {   account ?                      
                            <CsFlex>
                              {allowanceVoting !==0 ?
                                  <CustomButton
                                    onClick={handleVoting}
                                    disabled={pendingVoting || Number(balance) < NUMBER1M}
                                    endIcon={pendingVoting ? <AutoRenewIcon spin color="textDisable" /> : null}
                                  >
                                    Publish
                                  </CustomButton>
                                :
                                  <CustomButton
                                    onClick={handleApprove}
                                    disabled={pendingTx}
                                    endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                                  >
                                    Approve
                                  </CustomButton>
                              }
                            </CsFlex>                       
                      :                        
                            <CsFlex>
                              <CsButtonConectWallet/>
                            </CsFlex>                       
                    }
                  </CustomRow>                 
              </Content>
            </Wrapper>
        </WrapAppBody>
      </Container>
    </PageFullWidth>
  )
}

export default MakeAProposals


const Content = styled(Flex)`
  flex-direction: column;
  padding-top: 70px;
  border-top: 1px solid #E4E4E4;
  padding-bottom: 50px;
`

const Form = styled.form``

export const Row = styled.div`
  width: 100%;
  display: flex;
  /* padding-bottom: 40px; */
  @media (max-width: 600px) {
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }
`

export const Col = styled.div`
  max-width: 50%;
  width: 50%;
  &:first-child{
    padding-right:1rem;
  }
  &:nth-child(2){
     padding-left:1rem;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    max-width: 100%;
    &:first-child,&:nth-child(2){
      padding-left:0rem;
      padding-right:0rem;
    }
  }
`

export const ColSingle = styled(Col)`
  padding-right: 40px;
  @media screen and (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    padding-right: 0px;
  }
`

export const WrapInput = styled(Flex)`
  justify-content: space-between;
  margin-bottom:10px;
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #b2b3bd;
`

export const CustomInput = styled(Input)`
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-weight: 600;
  border-radius: 8px;
  padding: 22px;
  color: #11142d !important;

  @media (max-width: 600px) {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 24px; 
    max-height: 72px; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    font-size: 12px;
  }
`
const CsInput = styled(Input)`
   height: 48px;
   font-weight: 600;
`

const CustomButton = styled(Button)`
  border-radius: 90px !important;
  box-shadow: none;
  background: #ff592c;
  width:172px;
  @media (max-width:650px) {
    width:100%;
  }
`
const CsButtonConectWallet = styled(ConnectWalletButton)`  
  width: 172px;
  height: 48px;
  background: #FF592C;
  border-radius: 90px;
  color: #FFFFFF;
  box-shadow:none;
  @media screen and (max-width: 600px) {
    width:100%;
  }
`
const CsOpenNewIcon = styled(OpenNewIcon)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 5px;
  cursor: pointer;
`

const ColBtn = styled(Col)`
  justify-content:center;
`

const CustomRow = styled(Row)`
display:flex;
justify-content:space-between;
gap:8px;
margin-top:10px;
`
const TextCol = styled.div``

const CustomId = styled(Flex)`
  background: rgba(48, 179, 140, 0.25);
  border-radius: 6px;
  width: auto;
  height: 30px;
  padding: 0px 10px 0px 10px;
  justify-content: center;
  align-items: center;
`
export const CsFlex = styled(Flex)`
  @media(max-width:600px){
   width:100%!important;
 }
`;