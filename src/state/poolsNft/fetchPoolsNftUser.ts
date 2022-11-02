import { getAddress } from 'utils/addressHelpers'
import poolsNftConfig from 'config/constants/poolsNFT'
import erc20ABI from 'config/abi/erc20.json'
import kSharkFarmingNFTsAbi from 'config/abi/kSharkFarmingNFTs.json'
import babyksharkAbi from 'config/abi/babyshark.json'
import multicall from 'utils/multicall'
import { getMasterchefContract } from 'utils/contractHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'


// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsNftConfig.filter((p) => p.stakingToken.symbol !== 'BNB')
const bnbPools = poolsNftConfig.filter((p) => p.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsNftConfig.filter((p) => p.nftId !== 0)
const masterChefContract = getMasterchefContract()

export const fetchPoolsNftAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
      address: getAddress(p.stakingToken.address),
      name: 'allowance',
      params: [account.toLowerCase(), getAddress(p.contractAddress)]
  }))

  const allowances = await multicall(babyksharkAbi, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.nftId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.nftId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await simpleRpcProvider.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.nftId]: new BigNumber(bnbBalance.toString()).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'users',
    params: [account],
  }))
  const userInfo = await multicall(kSharkFarmingNFTsAbi, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.nftId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pointsBalance',
    params: [account],
  }))
  const res = await multicall(kSharkFarmingNFTsAbi, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.nftId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await masterChefContract.pendingRewards('0', account)

  return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
}
