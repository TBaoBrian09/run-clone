import BigNumber from 'bignumber.js'
import { PoolNft} from 'state/types'
import {BIG_ZERO} from 'utils/bigNumber'


type UserData =
    | PoolNft['userData']
    | {
    allowance: number | string
    stakingTokenBalance: number | string
    stakedBalance: number | string
    pointBalance: number | string
}

export const transformUserData = (userData: UserData) => {
    return {
        allowance: userData ? new BigNumber(userData.allowance) : BIG_ZERO,
        stakingTokenBalance: userData ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO,
        stakedBalance: userData ? new BigNumber(userData.stakedBalance) : BIG_ZERO,
        pointBalance: userData ? userData.pointBalance : 0,
    }
}

export const transformPoolNft = (poolNft: PoolNft): PoolNft => {
    const {totalStaked, stakingLimit, userData, ...rest} = poolNft
    return {
        ...rest,
        userData: transformUserData(userData),
        totalStaked: new BigNumber(totalStaked),
        stakingLimit: new BigNumber(stakingLimit),
    } as PoolNft
}