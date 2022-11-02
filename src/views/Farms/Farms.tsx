import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Button, ArrowForwardIcon, Flex, Toggle } from 'components/Pancake-uikit'
import { useMatchBreakpoints, Text, InputGroup, SearchIcon, Input } from '@phamphu19498/runtogether-uikit'
import { ChainId } from '@pancakeswap/sdk'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import PageFullWidth from 'components/Layout/PageFullWidth'
import HeaderEarns from 'components/PageHeader/HeaderEarns'
import Header from 'components/HeaderGlobal/Header'
import Container from 'components/Layout/Container'
import { useFarms, usePollFarmsWithUserData, usePriceLtdBusd } from 'state/farms/hooks'
import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { Hero, ToggleWrapper, LabelWrapper, FilterContainer, SortText } from 'components/KShark'
import { useUserFarmStakedOnly } from 'state/user/hooks'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/SelectV2'
import SelectFarms from 'components/Select/SelectFarms'
import Loading from 'components/Loading'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import BannerFarm from "./components/BannerFarm/BannerFarm"
import ButtonDigitalAssetsAndTokenizedStocks from './components/ButtonDigitalAssetsAndTokenizedStocks'
import { CustomInputGroup } from './style'

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Wrapper = styled.div`
    width: 100%;
    display:flex;
    align-items:center;
    justify-content: center;
    @media screen and (min-width: 601px) and (max-width: 768px){
    /* display: none; */
    width: 100%;
  }
`
const CustomContainer = styled(Container)`
  width:100%;
  padding-top:1rem;
  @media only screen and (max-width: 1440px) {
    width:100%;
    padding-left:2px;
    padding-right:2px;
  }
`
const Farms: React.FC = () => {
  const { isMobile } = useMatchBreakpoints()
  const { isXl } = useMatchBreakpoints()
  const isSmall = isXl === false
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceLtdBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState((isMobile ? ViewMode.CARD : ViewMode.TABLE), { localStorageKey: 'pancake_farm_view' })
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsWithUserData(isArchived)
  const { theme } = useTheme()
  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)

  const activeFarms = farmsLP.filter((farm) => farm.pid >= 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid >= 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        // const totalLiquidity = new BigNumber(farm.tokenPriceVsQuote).times(farm.tokenAmountMc).plus(farm.quoteTokenAmountMc).times(farm.quoteToken.busdPrice)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
          if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
            return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
          }
          return farmsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [chosenFarmsMemoized, observerIsSet])

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })
  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))
      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <FlexLayout style={{ marginTop: '8px' }}>
        <Route exact path={`${path}`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed={false}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed
            />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed
            />
          ))}
        </Route>
      </FlexLayout>
    )
  }
  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const location = useLocation()
  const [isFinished, setIsFinished] = useState(true)
  const handleSortOptionChangeLive = (option: OptionProps): void => {
    setIsFinished(option.value)
  }




  useEffect(() => {
    const LiveFinished = () => {
      location.pathname = '/farms/history'
    }
    if (!isFinished) {
      LiveFinished()
    } else {
      location.pathname = '/farms'
    }
  }, [isFinished, location])

  return (
    <PageFullWidth>
      <Header
        bgColor='#A95EEA'
        nameTitle="RUN TOGETHER"
        namePlace="Farms"
        imgIcon="/images/runMarketplace/imgBanner.png"
      />
      <CustomContainer>
        <ControlContainer>
          <Flex mt="1rem" width="100%" flexWrap="wrap">
            <ViewControls>
              <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
              <Flex width="auto" style={{ gap: "10px" }} alignItems="center">
                <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
                <Text>Staked only</Text>
              </Flex>
              <Select
                options={[
                  {
                    label: t('Live'),
                    value: true,
                  },
                  {
                    label: t('Finished'),
                    value: false,
                  }
                ]}
                onChange={handleSortOptionChangeLive}
              />
            </ViewControls>
            <FilterControls>
              <CustomInputGroup endIcon={<SearchIcon width="24px" />} >
                <Input placeholder={t("Search Farms")} onChange={handleChangeQuery} />
              </CustomInputGroup>
            </FilterControls>
          </Flex>

        </ControlContainer>
        {/* end heeader */}
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={loadMoreRef} />
        {/* <StyledImage src="/images/decorations/3dpan.png" alt="Pancake illustration" width={120} height={103} /> */}
      </CustomContainer>
    </PageFullWidth>
  )
}

export default Farms

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 10px;
  background:transparent;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  
  @media only screen and (max-width: 480px){
    width: 100%;
    padding-left:2px;
    padding-right:2px;
    justify-content: center;
  }
  @media only screen and (max-width: 768px){
    justify-content: center;
  }

  @media only screen and (min-width: 481px) and (max-width: 1269px){
    justify-content: center;
    
  }
`
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
