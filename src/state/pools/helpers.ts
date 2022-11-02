import BigNumber from 'bignumber.js'
import { Farm, Pool } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type' : 'application/json',
    'X-API-Key' : 'ia8cwxm6wosG9cqfHedtIqlDEAyFtSp5kP5d1EWoIQDNlTImr6QEUnUfLqPKX5aR'
  }
}

type UserData =
  | Pool['userData']
  | {
      allowance: number | string
      stakingTokenBalance: number | string
      stakedBalance: number | string
      pendingReward: number | string
    }

export const transformUserData = (userData: UserData) => {
  return {
    allowance: userData ? new BigNumber(userData.allowance) : BIG_ZERO,
    stakingTokenBalance: userData ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO,
    stakedBalance: userData ? new BigNumber(userData.stakedBalance) : BIG_ZERO,
    pendingReward: userData ? new BigNumber(userData.pendingReward) : BIG_ZERO,
  }
}

export const transformPool = (pool: Pool): Pool => {
  const { totalStaked, stakingLimit, userData, ...rest } = pool

  return {
    ...rest,
    userData: transformUserData(userData),
    totalStaked: new BigNumber(totalStaked),
    stakingLimit: new BigNumber(stakingLimit),
  } as Pool
}

const getMoralistApi = (token: string) => {
  return `https://deep-index.moralis.io/api/v2/erc20/${token}/price?chain=bsc`
}

const prc = []

export const getTokenPricesFromFarm = async (pools: Pool[]) => {
  return pools.reduce(async (prices, pool) => {
    const quoteTokenAddress = getAddress(pool.earningToken.address).toLocaleLowerCase()
    const tokenAddress = getAddress(pool.stakingToken.address).toLocaleLowerCase()
    const prQuoteToken = await axios
      .get(getMoralistApi(quoteTokenAddress), config)
      .then((resp) => resp.data)
      .catch((e) => e)
    prc[quoteTokenAddress] = new BigNumber(prQuoteToken.usdPrice).toNumber()

    const prtokenAddress = await axios
      .get(getMoralistApi(tokenAddress), config)
      .then((resp) => resp.data)
      .catch((e) => e)
    prc[tokenAddress] = new BigNumber(prtokenAddress.usdPrice).toNumber()

    return prc
  }, {})
}

export const getTokenPricesFromFarm1 = async (farms: Farm[]) => {
  return farms.reduce(async (prices, farm) => {
    const quoteTokenAddress = getAddress(farm.quoteToken.address).toLocaleLowerCase()
    const tokenAddress = getAddress(farm.token.address).toLocaleLowerCase()
    const prQuoteToken = await axios
      .get(getMoralistApi(quoteTokenAddress), config)
      .then((resp) => resp)
      .catch((e) => e)
    prc[quoteTokenAddress] = new BigNumber(prQuoteToken.usdPrice).toNumber()

    const prtokenAddress = await axios
      .get(getMoralistApi(tokenAddress), config)
      .then((resp) => resp)
      .catch((e) => e)
    prc[tokenAddress] = new BigNumber(prtokenAddress.usdPrice).toNumber()

    return prc
  }, {})
}

export const getTokenPrice = async (tokenAddress: string) => {
  const tokenPrice = await axios
    .get(getMoralistApi(tokenAddress), config)
    .then((resp) => resp.data)
    .catch((e) => e)

  return tokenPrice
}
