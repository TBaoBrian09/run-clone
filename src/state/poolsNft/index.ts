import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import poolsNftConfig from 'config/constants/poolsNFT'
import {BIG_ZERO} from 'utils/bigNumber'
import {PoolsNftState, CakeVault, VaultFees, VaultUser, AppThunk, PoolNft} from 'state/types'
import {getAddress} from 'utils/addressHelpers'
import {fetchPoolsNftStakingLimits, fetchPoolsNftTotalStaking } from './fetchPoolsNft'

import {
    fetchPoolsNftAllowance,
    fetchUserBalances,
    fetchUserStakeBalances,
    fetchUserPendingRewards,
} from './fetchPoolsNftUser'
import {fetchPublicVaultData, fetchVaultFees} from './fetchVaultPublic'
import fetchVaultUser from './fetchVaultUser'
// eslint-disable-next-line import/named



const initialState: PoolsNftState = {
    data: [...poolsNftConfig],
    userDataLoaded: false,
    cakeVault: {
        totalShares: null,
        pricePerFullShare: null,
        totalCakeInVault: null,
        estimatedCakeBountyReward: null,
        totalPendingCakeHarvest: null,
        fees: {
            performanceFee: null,
            callFee: null,
            withdrawalFee: null,
            withdrawalFeePeriod: null,
        },
        userData: {
            isLoading: true,
            userShares: null,
            cakeAtLastUserAction: null,
            lastDepositedTime: null,
            lastUserActionTime: null,
        },
    },
}

// Thunks
export const fetchPoolsNftPublicDataAsync = (currentBlock: number) => async (dispatch, getState) => {
    const totalStakings = await fetchPoolsNftTotalStaking()
    // lấy data từ src\config\constants\farms.ts
    // const prices = await getTokenPricesFromFarm(getState().pools.data)
    // eslint-disable-next-line no-restricted-syntax
    // @ts-ignore

    // 
//   

    const liveData = poolsNftConfig.map((pool) => {
        const totalStaking = totalStakings.find((entry) => entry.nftId === pool.nftId)

        const stakingTokenAddress = pool.stakingToken.address ? getAddress(pool.stakingToken.address).toLowerCase() : null
        const stakingTokenPrice = stakingTokenAddress ? 0 : 0

        const earningTokenAddress = pool.earningNft.address ? getAddress(pool.earningNft.address).toLowerCase() : null
        const earningTokenPrice = earningTokenAddress ? 0 : 0

        return {
            ...totalStaking,
            stakingTokenPrice,
            earningTokenPrice
        }
    })

    dispatch(setPoolsNftPublicData(liveData))
}

export const fetchPoolsNftStakingLimitsAsync = () => async (dispatch, getState) => {
    const poolsWithStakingLimit = getState()
        .pools.data.filter(({stakingLimit}) => stakingLimit !== null && stakingLimit !== undefined)
        .map((pool) => pool.nftId)

    const stakingLimits = await fetchPoolsNftStakingLimits(poolsWithStakingLimit)

    const stakingLimitData = poolsNftConfig.map((pool) => {
        if (poolsWithStakingLimit.includes(pool.nftId)) {
            return {nftId: pool.nftId}
        }
        const stakingLimit = stakingLimits[pool.nftId] || BIG_ZERO
        return {
            nftId: pool.nftId,
            stakingLimit: stakingLimit.toJSON(),
        }
    })

    dispatch(setPoolsNftPublicData(stakingLimitData))
}

export const fetchPoolsNftUserDataAsync =
    (account: string): AppThunk =>
        async (dispatch) => {
            const allowances = await fetchPoolsNftAllowance(account)
            const stakingTokenBalances = await fetchUserBalances(account)
            const stakedBalances = await fetchUserStakeBalances(account)
            const pointBalances = await fetchUserPendingRewards(account)
            const userData = poolsNftConfig.map((pool) => { return {
                nftId: pool.nftId,
                allowance: allowances[pool.nftId],
                stakingTokenBalance: stakingTokenBalances[pool.nftId],
                stakedBalance: stakedBalances[pool.nftId],
                pointBalance: pointBalances[pool.nftId],
            }})
            dispatch(setPoolsNftUserData(userData))
        }

export const updatePoolNftUserAllowance =
    (nftId: number, account: string): AppThunk =>
        async (dispatch) => {
            const allowances = await fetchPoolsNftAllowance(account)
            dispatch(updatePoolsUserData({nftId, field: 'allowance', value: allowances[nftId]}))
        }

export const updatePoolNftUserBalance =
    (nftId: number, account: string): AppThunk =>
        async (dispatch) => {
            const tokenBalances = await fetchUserBalances(account)
            dispatch(updatePoolsUserData({nftId, field: 'stakingTokenBalance', value: tokenBalances[nftId]}))
        }

export const updatePoolNftUserStakedBalance =
    (nftId: number, account: string): AppThunk =>
        async (dispatch) => {
            const stakedBalances = await fetchUserStakeBalances(account)
            dispatch(updatePoolsUserData({nftId, field: 'stakedBalance', value: stakedBalances[nftId]}))
        }

export const updatePoolNftUserPendingRewards =
    (nftId: number, account: string): AppThunk =>
        async (dispatch) => {
            const pendingRewards = await fetchUserPendingRewards(account)
            dispatch(updatePoolsUserData({nftId, field: 'pointsBalance', value: pendingRewards[nftId]}))
        }

export const fetchCakeVaultPublicData = createAsyncThunk<CakeVault>('cakeVault/fetchPublicData', async () => {
    const publicVaultInfo = await fetchPublicVaultData()
    return publicVaultInfo
})

export const fetchCakeVaultFees = createAsyncThunk<VaultFees>('cakeVault/fetchFees', async () => {
    const vaultFees = await fetchVaultFees()
    return vaultFees
})

export const fetchCakeVaultUserData = createAsyncThunk<VaultUser, { account: string }>(
    'cakeVault/fetchUser',
    async ({account}) => {
        const userData = await fetchVaultUser(account)
        return userData
    },
)

export const PoolsNftSlice = createSlice({
    name: 'PoolsNft',
    initialState,
    reducers: {
        setPoolsNftPublicData: (state, action) => {
            const livePoolsData: PoolNft[] = action.payload
            state.data = state.data.map((pool) => {
                const livePoolData = livePoolsData.find((entry) => entry.nftId === pool.nftId)
                return {...pool, ...livePoolData}
            })
        },
        setPoolsNftUserData: (state, action) => {
            const userData = action.payload
            state.data = state.data.map((pool) => {
                const userPoolData = userData.find((entry) => entry.nftId === pool.nftId)
                return {...pool, userData: userPoolData}
            })
            state.userDataLoaded = true
        },
        updatePoolsUserData: (state, action) => {
            const {field, value, nftId} = action.payload
            const index = state.data.findIndex((p) => p.nftId === nftId)

            if (index >= 0) {
                state.data[index] = {...state.data[index], userData: {...state.data[index].userData, [field]: value}}
            }
        },
    },
    // extraReducers: (builder) => {
    //     // Vault public data that updates frequently
    //     builder.addCase(fetchCakeVaultPublicData.fulfilled, (state, action: PayloadAction<CakeVault>) => {
    //         state.cakeVault = {...state.cakeVault, ...action.payload}
    //     })
    //     // Vault fees
    //     builder.addCase(fetchCakeVaultFees.fulfilled, (state, action: PayloadAction<VaultFees>) => {
    //         const fees = action.payload
    //         state.cakeVault = {...state.cakeVault, fees}
    //     })
    //     // Vault user data
    //     builder.addCase(fetchCakeVaultUserData.fulfilled, (state, action: PayloadAction<VaultUser>) => {
    //         const userData = action.payload
    //         userData.isLoading = false
    //         state.cakeVault = {...state.cakeVault, userData}
    //     })
    // },
})

// Actions
export const {setPoolsNftPublicData, setPoolsNftUserData, updatePoolsUserData} = PoolsNftSlice.actions

export default PoolsNftSlice.reducer
