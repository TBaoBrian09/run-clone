import { createReducer } from '@reduxjs/toolkit'
import { fetchDataPool, fetchMinAmountToVoting, fetchSnapShortCount, fetchListSnapshot } from "./actions"
import { user, userProps, userStaked, userStakedProps, ListSnapshot, SnapShotItem } from "./type"

interface globalPoolRun {
    userStaked: userStakedProps[],
    minAmountToVote:number,
    listSnapShot:SnapShotItem[],
    snapshotCount:number
}
export const initialState: globalPoolRun = {
    userStaked:[
        {
            amount:0,
            stakeBlock:0,
            unstakeLockTime:0,
            pendingReward:0,
            endTime:0,
            startTime:0
        },
    ],
    minAmountToVote:0,
    listSnapShot:[
        {
            listProfitAmount:0,
            blockNumber:0
        }
    ],
    snapshotCount:0
}
export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchDataPool, (state, action) => {
      state.userStaked = action.payload.userStaked
    })
    .addCase(fetchMinAmountToVoting, (state, action) => {
        state.minAmountToVote = action.payload.minAmountToVote
    })
    .addCase(fetchSnapShortCount, (state, action) => {
        state.snapshotCount = action.payload.snapshotCount
    })
    .addCase(fetchListSnapshot, (state, action) => {
        state.listSnapShot = action.payload.listSnapShot
    })
)