import BigNumber from 'bignumber.js'
import poolsNftConfig from 'config/constants/poolsNFT'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getAddress, getWbnbAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getSouschefV2Contract } from 'utils/contractHelpers'

export const fetchPoolsNftTotalStaking = async () => {
  const nonBnbPools = poolsNftConfig.filter((p) => p.stakingToken.symbol !== 'BNB')
  const bnbPool = poolsNftConfig.filter((p) => p.stakingToken.symbol === 'BNB')

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(cakeABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)

  return [
    ...nonBnbPools.map((p, index) => ({
      nftId: p.nftId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      nftId: p.nftId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolNftStakingLimit = async (nftId: number): Promise<BigNumber> => {
  try {
    const sousContract = getSouschefV2Contract(nftId)
    const stakingLimit = await sousContract.poolLimitPerUser()
    return new BigNumber(stakingLimit.toString())
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsNftStakingLimits = async (
  poolsWithStakingLimit: number[],
): Promise<{ [key: string]: BigNumber }> => {
  const validPools = poolsNftConfig
    .filter((p) => p.stakingToken.symbol !== 'BNB' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.nftId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolNftStakingLimit(validPool.nftId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].nftId]: stakingLimit,
    }
  }, {})
}
