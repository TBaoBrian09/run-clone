import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { getBep20Contract, getLpContract } from 'utils/contractHelpers'
import { getKrc20Contract } from 'utils/kaiContractHepler'
import { BIG_ZERO } from 'utils/bigNumber'
import { simpleRpcProvider } from 'utils/providers'
import { getTokenPrice } from 'state/pools/helpers'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      try {
        const res = await contract.balanceOf(account)
        setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      const res = await contract.balanceOf('0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res.toString()))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useGetBnbBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(new BigNumber(walletBalance.toString()))
        setFetchStatus(FetchStatus.SUCCESS)
      } catch (e) {
        console.log(e)
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, lastUpdated, setBalance, setFetchStatus])

  return { balance, fetchStatus, refresh: setLastUpdated }
}

export const useGetTokenPrice = (tokenAddress: string) => {
  const [tokenPrice, setTokenPrice] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchBalance = async () => {
      try {
        const tokenPriceObject = await getTokenPrice(tokenAddress)
        setTokenPrice(new BigNumber(tokenPriceObject?.usdPrice.toString()))
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log(e)
        } else {
          console.log(e)
        }
      }
    }

    fetchBalance()
    return () => {
      source.cancel()
    }
  }, [tokenAddress, setTokenPrice, slowRefresh])
  return tokenPrice
}

export const useHolderBalance = (tokenAddress: string, holder: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      const res = await contract.balanceOf(holder)
      setBalance(new BigNumber(res.toString()))
    }

    fetchBalance()
  }, [tokenAddress, holder, slowRefresh])

  return balance
}

export const useKRC20HolderBalance = (tokenAddress: string, holderAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getKrc20Contract(tokenAddress)
      const res = await contract.balanceOf(holderAddress)
      setBalance(new BigNumber(res.toString()))
    }

    fetchBalance()
  }, [tokenAddress, holderAddress, slowRefresh])

  return balance
}
export default useTokenBalance
