import { Flex, Text,SearchIcon,InputGroup } from '@phamphu19498/runtogether-uikit';
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity';
import HeaderProposals from 'components/HeaderProposals/HeaderProposals';
import PageFullWidth from 'components/Layout/PageFullWidth';
import { Radio,Input } from 'components/Pancake-uikit';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import Nav from 'views/Invest/components/SubNav';
import Select, { OptionProps } from 'components/Select/Select'
import { Container, WrapAppBody, Wrapper } from 'views/Invest/styles';
import { GetTotalProposals, GetListProposals } from 'state/votingProposals';
import CardBanner from './components/CardBanner';
import VotingCard from './components/VotingCard';

const Proposals = () => {
    const { t } = useTranslation()
    const [isNow, setIsNow] = useState("true");
    const [searchQuery, setSearchQuery] = useState('')

    const handleChange = (evt) => {
            const { value } = evt.target;
            setIsNow(value);
    };
    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const [sortidvote, setSortIdVote] = useState('latest')
    const handleSortVoteId = (option: OptionProps): void => {
        setSortIdVote(option.value)
    }
    const [ totalProposals ] = GetTotalProposals()
    const [ listProposals ] = GetListProposals(totalProposals)    
    const [ listVotes, setListVotes] = useState([])    
    const [ searchVotes, setSearchVotes ] = useState([]) 
    const [ listVotesFilter, setListVotesFilter] = useState([])   
    const currentTime = Date.now()
    const [listCardVote, setlistCardVote] = useState([...listVotes])

    useEffect(() => {
        setListVotesFilter(listProposals)
        setListVotes(listProposals)
    }, [listProposals]) 

    // sort
  useEffect(() => {
    const object = [...listVotes]
    function SortIdVote() {
      // eslint-disable-next-line no-alert
      if (sortidvote === 'latest') {
        // eslint-disable-next-line no-alert
        return setlistCardVote(
          object.sort((obj1, obj2) => Number(obj2.votingId) - Number(obj1.votingId)),
        )
      }
      if (sortidvote === 'oldest') {
        return setlistCardVote(
          object.sort((obj1, obj2) => Number(obj1.votingId) - Number(obj2.votingId)),
        )
      }
    }
    if (listVotes.length !== 0) {
      SortIdVote()
    }
  }, [sortidvote, listVotes])
    useEffect(() => {
        if ( searchQuery !== "" && listVotesFilter) {
            const filterData = listVotesFilter.filter((data) => (data.votingId).toString() === searchQuery)
            setSearchVotes(filterData)
        } 
        if ( searchQuery === "" ){
            setSearchVotes(listVotesFilter)
        }
    }, [searchQuery, listVotesFilter])

    useEffect(() => {
        if ( listVotesFilter ) {
            if ( listVotes ) {                
                setListVotes(searchVotes)
            }
            if (!listVotes){
                setListVotes(searchVotes)
            } 
        }
    }, [searchVotes, listVotes, listVotesFilter])

    const listVotingNow = listCardVote.filter(data => data.endTime*1000 > currentTime)
    const listVotingEnd = listCardVote.filter(data => data.endTime*1000 < currentTime)
    return (
        <PageFullWidth>
             <HeaderLiquidity bgColor='#029DA5' namePlace='Invest Together' nameTitle='run together'/>
             <Nav />
             <Container>
                <WrapAppBodyProposal>
                    <Wrapper>
                        <HeaderProposals headerName='Proposals'/>
                        <CardBanner />
                        <VoteContainer>
                          <WrapRadio>
                            <Radio name="md" value="true" onChange={handleChange} checked={isNow === "true"} />
                            <CsText>Vote Now</CsText>
                          </WrapRadio>
                          <WrapRadio>
                            <Radio name="md" value="false" onChange={handleChange} checked={isNow === "false"} />
                            <CsText>Closed</CsText>
                          </WrapRadio>
                        </VoteContainer>                        
                    </Wrapper>
                    
                    <CustomFlex justifyContent="space-between" mt="20px">
                        <CustomInputGroup endIcon={<SearchIconCus/>} >
                                <Input placeholder={t("Search Vote ID")} onChange={handleChangeSearchQuery}/>
                        </CustomInputGroup>
                        <CustomSelect
                          options={[
                            {
                                label: t('Latest'),
                                value: 'latest',
                            },
                            {
                                label: t('Oldest'),
                                value: 'oldest',
                            },
                            ]}
                            onChange={handleSortVoteId}
                        />
                    </CustomFlex>
                        <OfferContainer>
                            {  totalProposals > 0 &&
                                <>
                                    { isNow === "true" ?
                                        <>
                                            {listVotingNow.length !== 0 ?
                                                <>
                                                    {listVotingNow.map((item) => {
                                                        return (
                                                            <VotingCard
                                                                endTimeVoting={item.endTime}
                                                                votingId={item.votingId}
                                                                status="open"
                                                            />
                                                        )
                                                    })}
                                                </>
                                            :
                                                <Flex width="100%" justifyContent="center">
                                                    <Text>{t("No Data")}</Text>
                                                </Flex>
                                            }
                                        </>

                                    :
                                        <>
                                            {listVotingEnd.length !== 0 ?
                                                <>
                                                    {listVotingEnd.map((item) => {
                                                        return (
                                                            <VotingCard
                                                                endTimeVoting={item.endTime}
                                                                votingId={item.votingId}
                                                                voteCounterAgree={item.agree}
                                                                voteCounterDisAgree={item.disagrees}
                                                                status='close'
                                                            />
                                                        )
                                                    })}
                                                </>
                                            :
                                                <Flex width="100%" justifyContent="center">
                                                    <Text>{t("No Data")}</Text>
                                                </Flex>
                                            }
                                        </>
                                    }
                                </>
                            }
                    </OfferContainer>
                </WrapAppBodyProposal>
             </Container>
        </PageFullWidth>
    );
};

export default Proposals;

const SearchIconCus = styled(SearchIcon)`

    @media screen and (min-width: 769px) and (max-width: 1080px) {

    }
    @media screen and (max-width: 600px) {

    }
`

const VoteContainer = styled(Flex)`
    justify-content: center;
    align-items: center;
    gap: 100px;
    padding: 30px 0px;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    margin-bottom: 10px;
`
const CsText = styled(Text)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`
const WrapRadio = styled(Flex)`
  gap: 10px;
`
const OfferContainer = styled(Flex)`
    flex-wrap:wrap;
    // justify-content: space-around;
    align-items: center;
    margin-bottom:1rem;
    // min-height: 40vh;
    justify-content: space-between;
    margin: 20px 30px;
    @media screen and (max-width: 600px) {
        justify-content: space-around;
        min-height: 40vh;
        margin: 0 0px;
        width: 100%;
    }
`
export const CustomInputGroup = styled(InputGroup)`
    // margin: 0 40px;
    width: 305px;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius:12px;
    background: transparent !important;
    > input {
        background: transparent !important;
        border: none;
        height: 48px;
    }
    @media screen and (max-width: 600px) {
        margin: 0 0px;
        width: 100%;
    }
`

const CustomSelect = styled(Select)`
`
const WrapAppBodyProposal = styled(WrapAppBody)`
background:#FCFCFD;
`
export const CustomFlex = styled(Flex)`
  margin: 0px 30px;
  @media (max-width:600px) {
    flex-direction:column;
    margin:0;
  }
`;