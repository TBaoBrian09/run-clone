import React,{ useState, useMemo, useEffect, useRef } from 'react'
import partition from 'lodash/partition'
import { useWeb3React } from '@web3-react/core'
import { usePoolsNft } from 'state/poolsNft/hooks'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { PoolNft } from 'state/types'
import Card  from './Card'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools = () => {
	const { t } = useTranslation()
	const { account } = useWeb3React()
	const [observerIsSet, setObserverIsSet] = useState(false)
	const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const { poolsNft: poolsWithoutAutoVault, userDataLoaded } = usePoolsNft(account)
	const chosenPoolsLength = useRef(0)
	const pools = useMemo(() => {
		return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])
	
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
	const chosenPools = pools.slice(0, numberOfPoolsVisible)

	return(
		<Container>
			{
				chosenPools.map((data: PoolNft, index: number) => <Card data={data} key={data.nftId} userDataLoaded={userDataLoaded} account={account} />)
			}
			<div ref={loadMoreRef} />
		</Container>
	)
}

const Container = styled.div`
	margin-top: 40px;
	display: grid;
	grid-template-columns: 24% 24% 24% 24%;
	column-gap: 15px;
	row-gap: 15px;
	@media screen and (max-width: 991px) {
		grid-template-columns: 100%;
	}
`

export default Pools