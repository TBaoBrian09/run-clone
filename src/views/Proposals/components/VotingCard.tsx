import { Flex, Text, Skeleton, Button, Alert, AutoRenewIcon } from '@phamphu19498/runtogether-uikit';
import { ChevronRightIcon, Radio } from 'components/Pancake-uikit';
import contracts from 'config/constants/contracts';
import { useTranslation } from 'contexts/Localization';
import { getAddress } from 'utils/addressHelpers';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { FetchDataVoting } from 'views/Vote/hook/fetchDataVoting';
import { FetchMinToWin } from 'views/Vote/hook/fetchMinToWin';
import BigNumber from 'bignumber.js';

interface VotingProps {
    endTimeVoting?:number
    votingId:number
    status?:string
    voteCounterAgree?:string
    voteCounterDisAgree?:string
}
const VotingCard: React.FC<VotingProps> = ({endTimeVoting, votingId,status, voteCounterAgree, voteCounterDisAgree}) => {
    const { t } = useTranslation()
    const [ refresh, setRefresh ] = useState(0)
    const [ isPending, setIsPending] = useState(true)
    const { dataVoting } = FetchDataVoting(votingId, refresh)
    const {stakeMinToWin} = FetchMinToWin(getAddress(contracts.votingProposals));    
   

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsPending(false)
          }, 700)
    }, []) 

    function convertDate (date:number){
        if (date) {
            const today:any = new Date(date*1000);
            const seconnd = String(today.getSeconds()).padStart(2, '0');
            const minutes = String(today.getMinutes()).padStart(2, '0');
            const hours = String(today.getHours()).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); 
            const yyyy = today.getFullYear();
            return <Flex alignItems="center">
                <Text bold lineHeight='20px' color='#FF592C'>{hours}:{minutes}:{seconnd}</Text>
                <Text ml="10px" bold lineHeight='20px' color='#FF592C'>{dd}/{mm}/{yyyy}</Text>
            </Flex>;
          } return <Skeleton width={60} />
    }
    function handleClick () {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    const linkDetailsVoting = `/vote/${votingId}`

    const checkCancel = (agree:string, disAgree:string) => {        
        const convertTotalVote = new BigNumber(agree).plus(new BigNumber(disAgree));        
        if(convertTotalVote.isLessThan(new BigNumber(stakeMinToWin))) {
            return false;
        }
        return true;
    }

    const checkResult = (agree: string, refuse: string) => {
        const convertAgree = new BigNumber(agree)
        const convertRefuse = new BigNumber(refuse)
        const resultAgree = convertAgree.dividedBy(convertAgree.plus(convertRefuse));
        if(resultAgree.isGreaterThan(new BigNumber(0.5))) {
            return true;
        }
        return false;
    }
    return (
            <OfferCard>
                <Flex alignItems="center" justifyContent="space-between">                                       
                     <CustomId>
                        <Text bold >#{votingId}</Text>
                    </CustomId>
                    <CustomButtonDetail as={Link} to={linkDetailsVoting} onClick={handleClick}>Detail <ChevronRightIcon /></CustomButtonDetail>                                                 
                </Flex>
                <TextTitle >{t("Proposal to open a Run shoe store")}</TextTitle> 
                <Flex alignItems="center">
                    <TextDate mr='10px'>End date:</TextDate>
                    {convertDate(endTimeVoting)}
                </Flex>
                <Flex>
                {status === "open" ? 
                    <CsButton as={Link} to={linkDetailsVoting} onClick={handleClick} > Vote now </CsButton> 
                    : 
                    <>
                    {
                        isPending ? 
                        <>
                            <ButtonLoading 
                                isLoading={isPending} 
                                endIcon={isPending ? <AutoRenewIcon spin color="currentColor" /> : null}
                                disabled={isPending}
                            > 
                            LOADING 
                            </ButtonLoading>
                        </>
                        :
                        <>
                            {checkCancel(voteCounterAgree, voteCounterDisAgree) ? 
                                <>
                                {checkResult(voteCounterAgree, voteCounterDisAgree) ? 
                                    <FlexCusAgree> AGREE </FlexCusAgree> 
                                    :
                                    <FlexCusDisagree> DISAGREE </FlexCusDisagree> 
                                }   
                                </>
                                :
                                <FlexCusCancel> CANCEL </FlexCusCancel> 
                            }
                        </>
                    }                                            
                    </>                    
                } 
                </Flex>
            </OfferCard>
    )
}
export default VotingCard

const OfferCard = styled(Flex)`
  border: 1px solid #ccc;
  border-radius: 10px;
  flex-direction: column;
  padding: 20px 35px;  
  gap: 10px;  
  width:48%;
  margin-bottom:21px; 
  margin-top:21px;   
//   &:nth-child(1n){
//     margin-right:1%;
//   }
//   &:nth-child(2n){
//     margin-left:1%;
//   }
  @media (max-width:600px) {
    padding: 20px 15px;
    width: fit-content;
    margin-bottom:15px; 
    margin-top:15px; 
    &:first-child{
        margin-top:30px;
    }
}
`

const TextTitle = styled(Text)`
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #000000;    
    @media (max-width:600px) {
        margin-right:10px;
    }
`
const TextDate = styled(Text)`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #11142D;
`
const CsButton = styled(Button)`
    background-color: #FF592C;
    color: #FFFFFF;
    border-radius: 90px;
    width: 107px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CustomButtonDetail = styled(Button)`
    background:none;
    border:none;
    cursor:pointer;
    display:flex;
    align-items:center;
    font-weight:900;
    font-size: 18px;
`
const CustomId = styled(Flex)`
background: rgba(48, 179, 140, 0.25);
border-radius: 6px;
width: auto;
height: 32px;
padding:0px 10px 0px 10px;
justify-content: center;
align-items: center;
`
const AlertVote = styled.div`
background: #F4AB00;
border-radius: 5px;
`
const CustomTextAlert = styled(Text)`
text-transform:uppercase;
padding:8px 15px;
font-size:12px;
text-align:center;
color:#fff;
`

const FlexCusAgree = styled(Flex)`
    background-color: #F4AB00;
    color: #FFFFFF;
    border-radius: 10px;
    width: 97px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`

const FlexCusDisagree = styled(Flex)`
    background-color: #0269FC;
    color: #FFFFFF;
    border-radius: 10px;
    width: 97px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`

const FlexCusCancel = styled(Flex)`
    background-color: #FF592C;
    color: #FFFFFF;
    border-radius: 10px;
    width: 97px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`

const ButtonLoading = styled(Button)`
    background-color: #23262F;
    color: #FFFFFF;
    border-radius: 10px;
    width: 130px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`