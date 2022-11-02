export interface userProps {
    balanceOf:number
    allowance:number
} 
export interface user {
    dataUser:userProps[]
}

export interface userStakedProps {
    amount:number
    stakeBlock:number
    unstakeLockTime:number
    pendingReward:number
    endTime:number
    startTime:number
}
export interface userStaked {
    userStaked:userStakedProps[]
}

export interface MinAmoutToVoting {
    minAmountToVote:number
}
export interface SnapShotItem {
    listProfitAmount:number
    blockNumber:number
}
export interface SnapshotCount {
    snapshotCount:number
}
export interface ListSnapshot {
    listSnapShot:SnapShotItem[]
}