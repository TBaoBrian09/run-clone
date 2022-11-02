import multicall from 'utils/multicall'
import erc20ABi from 'config/abi/erc20.json'
import membershipABi from 'config/abi/membershipAbi.json'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import { Conditions } from '../config'

export const fetchDataBountyPublic = async() => {
    const calls = Conditions.map((data) => {
        return {
            address: getAddress(data.contractAddress),
            name: 'totalSupply',
            params: []
        }
    })

    const totalSupply = await multicall(membershipABi, calls)

    const callsLimit = Conditions.map((data) => {
        return {
            address: getAddress(data.contractAddress),
            name: 'totalNftSupply',
            params: []
        }
    })

    const nftLimit = await multicall(membershipABi, callsLimit)
    
    const result = Conditions.map((data, index) => {
        const limit = Number(new BigNumber(nftLimit[index]).toJSON())
        const total = Number(new BigNumber(totalSupply[index]).toJSON())
        const remaining = limit - total
        return {...data, Remaining: remaining ?? 0 }
    })

    return result
}

export const fetchDataBountyUser = async(account, bounty) => {
    const calls = [
    {
        address: getAddress(bounty.contractAddress),
        name: 'claimed',
        params: [account]
    },
    {
        address: getAddress(bounty.contractAddress),
        name: 'isApprovedForAll',
        params: [account, getAddress(bounty.contractAddress)]
    },
    {
        address: getAddress(bounty.contractAddress),
        name: 'totalPerUser',
        params: []
    },
    {
        address: getAddress(bounty.contractAddress),
        name: 'liveTradeTokenRequirePerNft',
        params: []
    }
    ]
    const [claimed, [approveReturn], [totalPerUser], [liveTradeTokenRequirePerNft]] = await multicall(membershipABi, calls)
    const nftBalances = await fetchUserBalances(account, bounty)
    const allowance = await fetchUserAllowance(account, bounty)
    const nftLists = await fetchListNftUser(account, bounty, nftBalances)
    const tokenList = await fetchRedeemTokenId(bounty, nftLists)
    const result = {
        ...bounty,
        claimed: Number(new BigNumber(claimed).toJSON()),
        approveReturn,
        nftBalances,
        allowance,
        nftLists,
        tokenList,
        totalPerUser,
        ltdRequired: Number(new BigNumber(liveTradeTokenRequirePerNft._hex).div(10**bounty.tokenUpgrade.decimals).toJSON())
    }
    return result
}

export const fetchUserBalances = async(account, bounty) => {
    // Non BNB pools
    const calls = [{
        address: getAddress(bounty.contractAddress),
        name: 'balanceOf',
        params: [account]
    }]

    const [tokenBalancesRaw] = await multicall(membershipABi, calls)
    return Number(new BigNumber(tokenBalancesRaw).toJSON())
}

export const fetchUserAllowance = async(account, bounty) => {
    // Non BNB pools
    const calls = [{
        address: getAddress(bounty.tokenUpgrade.address),
        name: 'allowance',
        params: [account, getAddress(bounty.contractAddress)]
    }]

    const [allowance] = await multicall(erc20ABi, calls)
    return Number(new BigNumber(allowance).toJSON())
}

export const fetchListNftUser = async(account, bounty, total) => {
    if (total === 0) return { nftLists: [] }
    const calls = []

    for(let i = 0; i < total; i++) {
        calls.push({
            address: getAddress(bounty.contractAddress),
            name: 'tokenOfOwnerByIndex',
            params: [account, i]
        })
    }

    try {
        const result = await multicall(membershipABi, calls)
        return result.map((d) => {
            return Number(new BigNumber(d).toJSON())
        })
    } catch(err) {
        console.log(err)
    }

    return []
}

export const fetchRedeemTokenId = async(bounty, nftLists) => {
    let dataResult = []
    if (nftLists.length === 0) dataResult = []
    const calls = []
    for (let i = 0; i < nftLists.length; i++) {
        calls.push({
            address: getAddress(bounty.contractAddress),
            name: 'lockTokenIdRedeem',
            params: [nftLists[i]]
        })
    }

    try {
        const result = await multicall(membershipABi, calls)
        dataResult = result.map((d, i) => {
            return {
                tokenId: nftLists[i],
                isLockRedeem: (d[0])
            }
        })
    }
    catch(error) {
        console.log(error)
    }
    return dataResult
}
export const fetchUserBalanceNft = async(account, contractAddress) => {
    // Non BNB pools
    const calls = [{
        address: getAddress(contractAddress),
        name: 'balanceOf',
        params: [account]
    }]

    const [tokenBalancesRaw] = await multicall(membershipABi, calls)
    return Number(new BigNumber(tokenBalancesRaw).toJSON())
}

export const fetchUserBalanceLtd = async(account) => {
    const calls = [{
        address: getAddress(tokens.livetrade.address),
        name: 'balanceOf',
        params: [account]
    }]

    const [balanceOfLtd] = await multicall(erc20ABi, calls)
    return Number(new BigNumber(balanceOfLtd).toJSON())/10**tokens.livetrade.decimals
}