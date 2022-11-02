import React, { useMemo, useCallback, useState, useEffect } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import {
  Modal,
  ModalBody,
  Text,
  Flex,
  InjectedModalProps,
  Button,
  Box,
  InputGroup,
  Input,
  AutoRenewIcon
} from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import NumberFormat from 'react-number-format';
import styled from 'styled-components'
import tokens from 'config/constants/tokens'
import { GetTokenBalance } from "utils/getTokenBalance";
import { LIMIT_VOTING } from "config/index"
import { GetAllowanceVoting } from 'state/votingProposals'
import { ErrorIcon, Progress } from 'components/Pancake-uikit'
import { useWeb3React } from '@web3-react/core'
import { NUMBER1BILION, NUMBER250M } from 'config/constants'
import { useApprove } from "../hook/useApprove"
import { useVoting } from "../hook/useVoting"



interface ModalVotingProps {
  votingAgree:string
  votingRefuse:string
  totalVoting:string
  isAgree:boolean
  onDismiss?: () => void
  votingId?:number
  onRefresh?:(newValue) => void
  startTimeVoting?:number
  endTimeVoting?:number
  chairPerson:string
  stakeMinToWin?:string
}

const Row = styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};
  gap: 5px;
  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

const CustomModal = styled(Modal)`
  padding: 20px 25px 0;
  overflow: hidden;
  max-height: 100vh !important;
  @media (max-width: 600px) {
    padding: 20px 0 10px !important;
  }
  > div {
    &:nth-child(2) {
      max-height: 90vh;
      padding: 10px;
    }
  }
`

const CustomInputGroup = styled(InputGroup)`
  font-weight: bold;
  background: #e4e4e4;
  border-radius:8px;
  > input{
    border: none;
    background-color: transparent;
    height: 50px;
    padding-left: 10px;
    font-size:18px;
    font-weight: 600;
  }
`
const ImgRun = styled.img``
const CustomWidthResult = styled.div`
  width: 100%;
  gap: 7px;
  display: flex;
  flex-direction: column;
  &:nth-child(2){
    margin-bottom:10px;
  }
`
const WrapPercent = styled(Flex)`
  justify-content: space-between;
`
const CustomButton = styled(Button)`
  border-radius: 90px !important;
  width: 100%;
  box-shadow: none;
  background: #ff592c;
  margin-top: 10px;
`
const ButtonCancel = styled(Button)`
  border-radius: 90px !important;
  width: 100%;
  box-shadow: none;
  background: #fff;
  color: #23262f;
  border: 1px solid #ddd;
  margin-top: 10px;
`
const WrapProgress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const CustomModalBody = styled(ModalBody)`
  max-height: 100vh;
  padding: 5px;
`
const CustomCard = styled.div`
  padding: 0.8rem;
  border: 1px solid #ff592c;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  max-width: 320px;
`

const CustomIcon = styled.div`
  align-self: flex-start;
  margin-right: 5px;
`

const VoteModal: React.FC<ModalVotingProps> = ({ 
  votingId, 
  votingAgree, 
  votingRefuse, 
  totalVoting, 
  isAgree, 
  onDismiss, 
  onRefresh,
  startTimeVoting,
  endTimeVoting,
  chairPerson,
  stakeMinToWin
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance } = GetTokenBalance(tokens.Run.address)
  const [ votingCount, setVotingCount ] = useState("")
  const [errorInput,setErrorInput] = useState(false);
  const [ tempVoting, setTempVoting ] = useState({
    voteAgree:votingAgree.toString(),
    voteRefuse:votingRefuse.toString()
  })
  const convertVoteAgreee = new BigNumber(tempVoting.voteAgree)
  const convertVoteRefuse = new BigNumber(tempVoting.voteRefuse)
  const convertStakeMinToWin = new BigNumber(stakeMinToWin)
  const convertVotingAgree = new BigNumber(votingAgree)
  const convertVotingRefuse= new BigNumber(votingRefuse)
  const totalVoteAmount = convertVoteAgreee.plus(convertVoteRefuse)
  const convertVotingCount = new BigNumber(votingCount)

  function tempSelectedVoting ( values) {
    const convertValue = values !== "" ? new BigNumber(values) : new BigNumber(0)
    setVotingCount(values)
    if (Number(values) >= 0 ) {
      if ( isAgree ){
        const newValueVotingAgree = convertVotingAgree.plus(convertValue)
        setTempVoting({
          voteAgree:newValueVotingAgree.toString(),
          voteRefuse:votingRefuse.toString()
        })
      } else {
        const newValueVotingRefuse = convertVotingRefuse.plus(convertValue)
        setTempVoting({
          voteAgree:votingAgree.toString(),
          voteRefuse:newValueVotingRefuse.toString()
        })
      }
    }
  }
  function decimalCount (number) {
    const numberAsString = number.toString();
    if (numberAsString.includes('.')) {
      return numberAsString.split('.')[1].length;
    }
    return 0;
  }
 // eslint-disable-next-line consistent-return
 const handleChangeValue = (values)=>{
      const {value} = values;
      const converValue = new BigNumber(value)
      if ( value === "" ) {
        tempSelectedVoting("")
      } else {
        tempSelectedVoting(converValue.toString())
      }
      if (value > NUMBER1BILION) {
        setVotingCount('0.00')
      }
     
 }
 
  function renderPercentAgreee (agree:number, refuse:number){
    let value = 0
    const convertAgree =  new BigNumber(agree);
    const convertRefuse =  new BigNumber(refuse);
    const renderValue =  Number(convertAgree.dividedBy(convertAgree.plus(convertRefuse)).multipliedBy(100))
    if ( Number.isNaN(renderValue)) {
      value = 0
    } else {
      value = renderValue
    }
    return value
  }
  function renderPercentRefuse (agree:number, refuse:number){
    const convertAgree =  new BigNumber(agree);
    const convertRefuse =  new BigNumber(refuse);
    const renderValues =  Number(convertRefuse.dividedBy(convertAgree.plus(convertRefuse)).multipliedBy(100))
    let values = 0
    if ( Number.isNaN(renderValues)) {
      values = 0
    } else {
      values = renderValues
    }
    return values
  }
  const isLimitVote =new BigNumber(votingCount).isLessThan(new BigNumber(LIMIT_VOTING))
  const { handleApprove, requestedApproval, pendingTx } = useApprove()
  const [ allowanceVoting ] = GetAllowanceVoting(account, requestedApproval)
  const { handleVoting, requestedVoting, pendingVoting } = useVoting(votingId, votingCount, isAgree, onRefresh)
  const currentTime = Date.now()
  const isTimeCanVoting = startTimeVoting*1000 < currentTime && currentTime > endTimeVoting*1000 
  useEffect(()=>{
    if (requestedVoting) {
      onDismiss()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[requestedVoting])
  const partAgreee = convertVoteAgreee.decimalPlaces(2,1)
  const partRefuse = convertVoteRefuse.decimalPlaces(2,1)
  return (
    <CustomModal title={t('Confirm Vote')} headerBackground="transparent" onDismiss={onDismiss}>
      <CustomModalBody>
          <AutoRow
            mb="1rem"
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Text color="#B2B3BD" fontSize="12px">
              {t('Your RUN balance')}
            </Text>
            <Flex>
              <Text bold>{(Math.floor(balance * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              <ImgRun src="/images/Run_Logo.svg" style={{ paddingLeft: '10px' }} />
            </Flex>
            <Text color="#B2B3BD" fontSize="12px">
              {t('Input your RUN vote')}
            </Text>
            <CustomInputGroup
              endIcon={<ImgRun src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" width="24px" />}
            >
               <NumberFormat
                    value={votingCount}
                    thousandSeparator={!false}
                    placeholder="0.00"
                    onValueChange={(values) => handleChangeValue(values)}
                />
            </CustomInputGroup>
            {totalVoteAmount.isGreaterThan(NUMBER250M) && 
              <div style={{color:'red',fontSize:'12px'}}>
                Value should not be more than 250,000,000
              </div>

            }
            {convertVotingCount.isLessThan(new BigNumber(100)) &&
              <div style={{color:'red',fontSize:'12px'}}>
                Value should not be less than 100
              </div> 
            }

            { convertStakeMinToWin.isGreaterThan(totalVoteAmount)  && 
             <Text color="red" fontSize="12px">
                Proposal need to vote at least {stakeMinToWin} RUN to qualify              
            </Text>
            }

            <WrapProgress>
              <CustomWidthResult>
                <Text color="#B2B3BD" fontSize="12px">
                  Agree
                </Text>
                <Progress variant="round" primaryStep={Number(convertVoteAgreee.dividedBy(convertVoteAgreee.plus(convertVoteRefuse)).multipliedBy(100))} scale="sm" />
                <WrapPercent>
                    <Text fontSize="14px">
                        { partAgreee.isNaN() ?
                          "0.00"
                        :
                          Number(partAgreee.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        }
                      &nbsp;Votes
                    </Text>
                  <Text fontSize="14px" color="#5DCB83;">
                  ~ {renderPercentAgreee(Number(partAgreee), Number(partRefuse)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </Text>
                </WrapPercent>
              </CustomWidthResult>
              <CustomWidthResult>
                <Text color="#B2B3BD" fontSize="12px">
                  Disagree
                </Text>
                <Progress bgcolor="#E75243" variant="round" primaryStep={Number(convertVoteRefuse.dividedBy(convertVoteAgreee.plus(convertVoteRefuse)).multipliedBy(100))} scale="sm" />
                <WrapPercent>
                <Text fontSize="14px">
                        { partRefuse.isNaN() ?
                          "0.00"
                        :
                          Number(partRefuse.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        }
                      &nbsp;Votes
                    </Text>                 
                  <Text fontSize="14px" color="#E75243">
                  ~ {renderPercentRefuse(Number(partAgreee), Number(partRefuse)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </Text>
                </WrapPercent>
              </CustomWidthResult>
            </WrapProgress>
            {Number((Math.floor(balance * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) <= 0 ? <CustomCard>
              <CustomIcon>
                <ErrorIcon />
              </CustomIcon>
              <Text fontSize="14px">
                {t(
                  'Hold some RUN in your wallet to get voting power for future proposals.',
                )}
              </Text>
            </CustomCard>
            :
            <div style={{width:320,visibility:'hidden',height:0}}/>

             }
            { account?.toLocaleLowerCase() === chairPerson?.toLocaleLowerCase() &&
              <Text mt="1rem" color='primaryBright'>{t("Chair person cannot vote")}</Text>
            }
            { allowanceVoting !== 0 ?
                <CustomButton
                    onClick={handleVoting}
                    disabled={Number(votingCount) <= 0 || decimalCount(votingCount) > 18 ||  balance < LIMIT_VOTING || isLimitVote || Number(votingCount)>balance || pendingVoting || account?.toLocaleLowerCase() === chairPerson?.toLocaleLowerCase()}
                    endIcon={pendingVoting ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    Confirm
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
           

          </AutoRow>
        </CustomModalBody>
    </CustomModal>
  )
}

export default VoteModal
