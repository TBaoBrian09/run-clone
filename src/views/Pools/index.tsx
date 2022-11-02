import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex } from 'components/Pancake-uikit'
import { useMatchBreakpoints, Toggle, InputGroup, Input, SearchIcon, Text } from '@phamphu19498/runtogether-uikit'
import Container from 'components/Layout/Container'
import HeaderEarns from 'components/PageHeader/HeaderEarns'
import useTheme from 'hooks/useTheme'
import { ControlContainer, ToggleWrapper, LabelWrapper, FilterContainer, ViewControls } from 'components/KShark'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useFetchPublicPoolsData, usePools, useFetchCakeVault, useCakeVault } from 'state/pools/hooks'
import { usePollFarmsPublicData } from 'state/farms/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import PageFullWidth from 'components/Layout/PageFullWidth'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import Loading from 'components/Loading'
import PoolCard from './components/PoolCard'
import CakeVaultCard from './components/CakeVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
import PoolsTable from './components/PoolsTable/PoolsTable'
import { ViewMode } from './components/ToggleView/ToggleView'
import { getAprData, getCakeVaultEarnings } from './helpers'
import ToggleView from '../Farms/components/ToggleView/ToggleView'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
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
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-left:5px;
`
const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const { isMobile } = useMatchBreakpoints()
  const location = useLocation()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState((isMobile ? ViewMode.CARD : ViewMode.TABLE), { localStorageKey: 'pancake_pool_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const chosenPoolsLength = useRef(0)
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
    // const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    // const cakeAutoVault = { ...cakePool, isAutoVault: true }
    // return [cakeAutoVault, ...poolsWithoutAutoVault]
    return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  usePollFarmsPublicData()
  useFetchCakeVault()
  useFetchPublicPoolsData()

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => {
          if (poolsCurrentlyVisible <= chosenPoolsLength.current) {
            return poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE
          }
          return poolsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                account,
                cakeAtLastUserAction,
                userShares,
                pricePerFullShare,
                pool.earningTokenPrice,
              ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            let totalStaked = Number.NaN
            if (pool.isAutoVault) {
              if (totalCakeInVault.isFinite()) {
                totalStaked = +formatUnits(
                  ethers.BigNumber.from(totalCakeInVault.toString()),
                  pool.stakingToken.decimals,
                )
              }
            } else if (pool.sousId === 0) {
              if (pool.totalStaked?.isFinite() && totalCakeInVault.isFinite()) {
                const manualCakeTotalMinusAutoVault = ethers.BigNumber.from(pool.totalStaked.toString()).sub(
                  totalCakeInVault.toString(),
                )
                totalStaked = +formatUnits(manualCakeTotalMinusAutoVault, pool.stakingToken.decimals)
              }
            } else if (pool.totalStaked?.isFinite()) {
              totalStaked = +formatUnits(ethers.BigNumber.from(pool.totalStaked.toString()), pool.stakingToken.decimals)
            }
            return Number.isFinite(totalStaked) ? totalStaked : 0
          },
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    chosenPools = chosenPools.filter((pool) =>
      latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  chosenPools = sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  chosenPoolsLength.current = chosenPools.length

  const cardLayout = (
    <CardLayout>
      {chosenPools.map((pool) =>
        pool.isAutoVault ? (
          <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        ),
      )}
    </CardLayout>
  )

  const tableLayout = <PoolsTable pools={chosenPools} account={account} userDataLoaded={userDataLoaded} />

  return (
    <PageFullWidth>
      <HeaderEarns 
          pagetitle="Pools"
          title={t("Non-term savings")}
          subtitle={t("No-risk investment by staking tokens")}
          image="/images/mask-banner-pools.png"
      />
      <CustomContainer>
      <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)}
                scale="md"
              />
              <Text color="text" ml="3px" fontSize="14px"> {t('Staked only')}</Text>
            </ToggleWrapper>
            <PoolTabButtons
              hasStakeInFinishedPools={hasStakeInFinishedPools}
            />
          </ViewControls>

          <FilterContainer>
            <LabelWrapper>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('APR'),
                    value: 'apr',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Total staked'),
                    value: 'totalStaked',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            {/* <LabelWrapper style={isMobile?{ marginLeft: 40 }:{ marginLeft: 16 }}>
              <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
            </LabelWrapper> */}
            <Wrapper>
                <InputGroup startIcon={<SearchIcon width="24px" />} scale="md">
                    <Input type="text" placeholder={t("Search Farms")} onChange={handleChangeSearchQuery} />
                </InputGroup>
              </Wrapper>
          </FilterContainer>
        </ControlContainer>
        {/* <PoolControls>
          <PoolTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedPools={hasStakeInFinishedPools}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <FilterContainer>
            <LabelWrapper>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Hot'),
                      value: 'hot',
                    },
                    {
                      label: t('APR'),
                      value: 'apr',
                    },
                    {
                      label: t('Earned'),
                      value: 'earned',
                    },
                    {
                      label: t('Total staked'),
                      value: 'totalStaked',
                    },
                  ]}
                  onChange={handleSortOptionChange}
                />
              </ControlStretch>
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Search')}
              </Text>
              <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
            </LabelWrapper>
          </FilterContainer>
        </PoolControls> */}
        {showFinishedPools && (
          <Text fontSize="20px" color="red" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        <div style={{ marginTop: '8px' }}>
          {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        </div>
        <div ref={loadMoreRef} />
      </CustomContainer>
        
    </PageFullWidth>
  )
}

export default Pools
