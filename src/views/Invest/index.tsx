import { Flex, Input, SearchIcon, Text, useMatchBreakpoints } from '@phamphu19498/runtogether-uikit';
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity';
import PageFullWidth from 'components/Layout/PageFullWidth';
import { Toggle } from 'components/Pancake-uikit';
import Select, { OptionProps } from 'components/Select/Select';
import { useTranslation } from 'contexts/Localization';
import usePersistState from 'hooks/usePersistState';
import React, { useState, useEffect } from 'react';
import { investPool } from 'config/constants/investPool';
import { latinise } from 'utils/latinise'
import { GetPoolProposals } from 'state/poolProposals';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import PoolCard from './components/PoolCard';
import Nav from './components/SubNav';
import { Container, CustomInputGroup, ViewControls, WrapAppBody, Wrapper } from './styles';


const Invest = () => {
    const { t } = useTranslation()
    const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
    const [searchQuery, setSearchQuery] = useState('')
    const { account } = useWeb3React()
    const [ isFinished, setIsFinished] = useState(false)
    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }  
    const handleSortOptionChange = (option: OptionProps): void => {
        setIsFinished(option.value)
    }  
    const [ dataUserStaked ] = GetPoolProposals(account, investPool)
    const [ poolStakedOnly, setSetPoolStakeOnly ] = useState([])
    const [ searchPools, setSearchPools ] = useState([]) 
    const [ poolsList, setPoolsList ] = useState([])
    useEffect(() => {
        const pools = investPool.map((item, i) => {
            return { ...item, dataUser:dataUserStaked[i]}
        })
        setPoolsList(pools)
    }, [dataUserStaked]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if ( searchQuery !== "" && poolsList) {
            const filterData = poolsList.filter((data) =>{
                return latinise(data.storeName.toLowerCase()).includes(searchQuery.toLowerCase())
            })
            setSearchPools(filterData)
        } 
        if ( searchQuery === "" ){
            setSearchPools(poolsList)
        }
    }, [searchQuery, poolsList]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if ( poolsList ) {
            if ( stakedOnly ) {
                const getPoolsStakeOnly = searchPools.filter(data => data.dataUser?.amount > 0);
                setSetPoolStakeOnly(getPoolsStakeOnly)
            }
            if (!stakedOnly){
                setSetPoolStakeOnly(searchPools)
            } 
        }
    }, [searchPools, stakedOnly, poolsList])
    const currentTime = Date.now()
    const poolLive = poolStakedOnly.filter(data => currentTime < data.dataUser?.endTime*1000)
    const poolFinished = poolStakedOnly.filter(data =>  currentTime > data.dataUser?.endTime*1000 && data.dataUser?.endTime !==0)
    return (
        <PageFullWidth>
            <HeaderLiquidity bgColor='#029DA5' namePlace='Invest Together' nameTitle='run together'/>
            <Nav />
            <Container>
               <WrapAppBody>
                    <Wrapper>
                        <CsFlexControl width="100%" flexWrap="wrap">
                            <ViewControls>
                                <Select
                                    options={[
                                        {
                                            label: t('Live'),
                                            value: false,
                                        },
                                        {
                                            label: t('Finished'),
                                            value: true,
                                        }
                                        
                                    ]}
                                    onChange={handleSortOptionChange}
                                />
                                <WrapToggle width="auto" style={{gap:"10px"}} alignItems="center">
                                    <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
                                    <Text>Staked only</Text>
                                </WrapToggle>
                            </ViewControls>
                            <FilterControls>
                                <CustomInputGroup endIcon={<SearchIcon width="24px" />} >
                                    <Input placeholder={t("Search")} onChange={handleChangeSearchQuery}/>
                                </CustomInputGroup>
                            </FilterControls>
                    </CsFlexControl>
                    {/* <ListCart width="100%" minHeight="60vh" isCenter={!false}>
                        <Text mt="1rem">No Data</Text>
                    </ListCart> */}
                    { !isFinished &&
                        <ListCart width="100%" minHeight="60vh" isCenter={(poolLive.length === 1 || poolLive.length === 0 ) ? !false : false}>
                            { poolLive.length === 0 ? 
                                    <Text mt="1rem">No Data</Text>
                                :
                                    <>
                                        {poolLive.map((item) => (
                                            <PoolCard 
                                                storeName={item.storeName}
                                                tokenStake={item.tokenStake}
                                                tokenEarn={item.tokenEarn}
                                                contractPool={item.storeContract}
                                                penddingReward={item.dataUser?.pendingReward}
                                                revenue={item.revenue}
                                                apy={item.apy}
                                                depositFee={item.depositFee}
                                                totalStaked={item.dataUser?.amount}
                                                contractStore={item.poolStoreContract}
                                                storeAddress={item.storeLocation}
                                                endTimePool={item.dataUser?.endTime*1000}
                                                startTimePool={item.dataUser?.startTime*1000}
                                            />
                                        ))}
                                    </>
                            }
                        </ListCart> 
                    }
                    {isFinished &&
                        <ListCart width="100%" minHeight="60vh" isCenter={(poolFinished.length === 1 || poolFinished.length === 0)  ? !false : false}>
                                    { poolFinished.length === 0 ? 
                                        <Text mt="1rem">No Data</Text>
                                    :
                                        <>
                                            {poolFinished.map((item) => (
                                                <PoolCard 
                                                        storeName={item.storeName}
                                                        tokenStake={item.tokenStake}
                                                        tokenEarn={item.tokenEarn}
                                                        contractPool={item.storeContract}
                                                        penddingReward={item.dataUser?.pendingReward}
                                                        revenue={item.revenue}
                                                        apy={item.apy}
                                                        depositFee={item.depositFee}
                                                        totalStaked={item.dataUser?.amount}
                                                        contractStore={item.poolStoreContract}
                                                        storeAddress={item.storeLocation}
                                                        endTimePool={item.dataUser?.endTime*1000}
                                                        startTimePool={item.dataUser?.startTime*1000}
                                                    />
                                                ))}
                                        </>
                                    }
                        </ListCart>
                    }
                    </Wrapper>
               </WrapAppBody>
            </Container>
        </PageFullWidth>
    );
};

export default Invest;


const FilterControls = styled(Flex)`
    width: 50%;
    height: 70px;
    align-items: center;
    justify-content: flex-end;
    flex-wrap:wrap;
    @media screen and (min-width: 769px) and (max-width: 1080px) {
        height: auto;
        width: 40%;
        justify-content: flex-start;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
        height: auto;
        margin-top:1rem;
        justify-content: flex-start;
    }
`

const ListCart = styled(Flex)<{isCenter:boolean}>`
    flex-wrap:wrap;
    justify-content: ${({ isCenter }) => isCenter ? "center" : "space-between"};
    align-items: start;
    @media screen and (max-width: 1080px) {
        justify-content:center;    
    }

`

const CsFlexControl = styled(Flex)`
    margin: 1rem 0 1rem 0;
    align-items: center;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        padding: 0px 15px;
    }
    @media screen and (min-width: 769px) and (max-width: 1080px) {
        height: auto;
        width: 100%;
        justify-content: space-between;
    }
`

const WrapToggle = styled(Flex)`
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`