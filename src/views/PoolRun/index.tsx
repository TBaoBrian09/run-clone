import React, { useState, useEffect } from "react";
import { Text, Flex, Button, useMatchBreakpoints, SearchIcon } from "@phamphu19498/runtogether-uikit";
import Header from "components/HeaderGlobal/Header";
import styled from "styled-components";
import Container from "components/Layout/Container";
import { Toggle, Input } from "components/Pancake-uikit";
import { poolRunConfig } from "config/constants/poolRun";
import Select, { OptionProps } from 'components/Select/SelectV2';
import PageFullWidth from "components/Layout/PageFullWidth";
import { GetDataUserStaked, GetEndTimePool } from "state/poolrun";
import { useTranslation } from "contexts/Localization";
import usePersistState from 'hooks/usePersistState'
import { useWeb3React } from "@web3-react/core";
import { latinise } from 'utils/latinise'
import ToggleView from "./components/ToggleView"
import { ViewMode } from './type'
import { CustomInputGroup } from "./style"
import PoolCard from "./components/PoolCard";
import ContainerRow from "./components/ListView/components/PoolRow"

const PoolRun = () => {
    const { account } = useWeb3React()
    const { isMobile } = useMatchBreakpoints()
    const [ isFinished, setIsFinished] = useState(false)
    const handleSortOptionChange = (option: OptionProps): void => {
        setIsFinished(option.value)
    }
    const [searchQuery, setSearchQuery] = useState('')
    const { t } = useTranslation()
    const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
    const [viewMode, setViewMode] = usePersistState((isMobile ? ViewMode.CARD : ViewMode.TABLE), { localStorageKey: 'pancake_farm_view' })
    
    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }
    
    const [ listPools, setListPools ] = useState([])
    const [ searchPools, setSearchPools ] = useState([])
    const [ poolStakedOnly, setSetPoolStakeOnly ] = useState([...searchPools])
    const [ endTimePool ] = GetEndTimePool()
    const [ dataUserStaked ] = GetDataUserStaked(account, 0)
    useEffect(() => {
        const mergeData = [{...poolRunConfig[0], ...dataUserStaked, endTime:endTimePool}]
        setListPools(mergeData)
    }, [dataUserStaked, endTimePool])
    useEffect(() => {
        if ( searchQuery !== "" && listPools) {
            const filterData = listPools.filter((data) =>{
                return latinise(data.name.toLowerCase()).includes(searchQuery.toLowerCase())
            })
            setSearchPools(filterData)
        } 
        if ( searchQuery === "" ){
            setSearchPools(listPools)
        }
     }, [listPools, searchQuery])
     useEffect(() => {
        if ( listPools ) {
            if ( stakedOnly ) {
                const getPoolsStakeOnly = searchPools.filter(data => data.amount > 0);
                setSetPoolStakeOnly(getPoolsStakeOnly)
            }
            if (!stakedOnly){
                setSetPoolStakeOnly(searchPools)
            } 
        }
     }, [searchPools, stakedOnly, listPools])
    const currentTime = Date.now()
    const poolLive = poolStakedOnly.filter(data => data.endTime*1000 > currentTime)
    const poolFinished = poolStakedOnly.filter(data => data.endTime*1000 < currentTime && data.endTime !==0)

    return (
        <PageFullWidth>
            <Header 
              nameTitle="RUN TOGETHER"
              namePlace="Pools"
              imgIcon="/images/Pools/bg_header.png"
              bgColor="#6C5DD3"
            />
            <Container width="100%">
                <Flex mt="1rem" width="100%" flexWrap="wrap">
                    <ViewControls>
                        <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
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
                        <Flex width="auto" style={{gap:"10px"}} alignItems="center">
                            <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
                            <Text>Staked only</Text>
                        </Flex>
                    </ViewControls>
                    <FilterControls>
                        <CustomInputGroup endIcon={<SearchIcon width="24px" />} >
                            <Input placeholder={t("Search Pools")} onChange={handleChangeSearchQuery}/>
                        </CustomInputGroup>
                    </FilterControls>
                </Flex>
                <Flex width="100%" justifyContent='space-around' flexWrap="wrap" mt="1rem" minHeight="60vh">
                    { viewMode === "CARD" &&
                        <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
                            { !isFinished  ?
                                <>
                                    { poolLive.length === 0 ? 
                                        <Text mt="1rem">No data</Text>
                                    :
                                        <>
                                            {poolLive.map((item) => {
                                                    return (
                                                        <PoolCard/>
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            :
                            <>
                                { poolFinished.length === 0 ? 
                                        <Text mt="1rem">No data</Text>
                                    :
                                        <>
                                            {poolFinished.map((item) => {
                                                    return (
                                                        <PoolCard/>
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            }
                        </Flex> 
                    }
                    { viewMode === "TABLE" &&
                        <ContainerList>
                            { !isFinished  ?
                                <>
                                    { poolLive.length === 0 ? 
                                        <Flex width="100%" justifyContent="center" alignItems="center">
                                            <Text width="100%" textAlign="center" mt="1rem">No data</Text>
                                        </Flex>
                                    :
                                        <>
                                            {poolLive.map((item) => {
                                                    return (
                                                        <ContainerRow/>
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            :
                            <>
                                { poolFinished.length === 0 ? 
                                        <Flex width="100%" justifyContent="center" alignItems="center">
                                            <Text width="100%" textAlign="center" mt="1rem">No data</Text>
                                        </Flex>
                                    :
                                        <>
                                            {poolFinished.map((item) => {
                                                    return (
                                                        <ContainerRow/>
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            }                            
                        </ContainerList> 
                    }
                </Flex>
            </Container>
        </PageFullWidth>
    )
}

export default PoolRun

const ViewControls = styled(Flex)`
    width: 50%;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    flex-wrap:wrap;
    @media screen and (min-width: 600px) and (max-width: 1080px) {
        width: 70%;
        height: auto;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
        height: auto;
    }
`
const FilterControls = styled(Flex)`
    width: 50%;
    height: 70px;
    align-items: center;
    justify-content: flex-end;
    flex-wrap:wrap;
    @media screen and (min-width: 600px) and (max-width: 1080px) {
        width: 30%;
        height: auto;
        padding-left:1rem;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
        height: auto;
        margin-top:1rem;
        justify-content: flex-start;
    }
`
const ContainerList = styled(Flex)`
    width:100%;
    flex-direction: column;
    height: auto;
    flex-wrap:wrap;
`