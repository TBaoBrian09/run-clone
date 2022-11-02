import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from 'hooks/useRefresh'
import {
  fetchPoolsNftPublicDataAsync,
  fetchPoolsNftUserDataAsync,
  fetchPoolsNftStakingLimitsAsync,
} from '.'
import { State, PoolNft } from '../types'
import { transformPoolNft } from './helpers'
// eslint-disable-next-line import/named


export const useFetchPublicPoolsNftData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchPoolsNftPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsNftStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const usePoolsNft = (account): { poolsNft: PoolNft[]; userDataLoaded: boolean } => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsNftUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const { poolsNft, userDataLoaded } = useSelector((state: State) => ({
    poolsNft: state.poolsNft.data,
    userDataLoaded: state.poolsNft.userDataLoaded,
  }))

  return { poolsNft: poolsNft.map(transformPoolNft), userDataLoaded }
  // return { poolsNft: [], userDataLoaded: true }
}