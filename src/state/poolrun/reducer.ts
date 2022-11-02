import { createReducer } from '@reduxjs/toolkit'
import { fetchData } from "./fetchData/fetchDataUser"
import { fetchDataUser, fetchDataUserStaked, fetchTvlPool, fetchEndTimeBlock, fetchEndBlock, fetchStartTime } from "./actions"
import { user, userProps, userStaked, userStakedProps } from "./type"

interface globalPoolRun {
    dataUser: userProps,
    userStaked:userStakedProps,
    tvl:number,
    endTime:number
    endBlock:number,
    startTime:number
}
export const initialState: globalPoolRun = {
    dataUser:{
        balanceOf:0,
        allowance:0
    },
    userStaked: {
      amount:0,
      stakeBlock:0,
      unstakeLockTime:0,
      pendingReward:0
    },
    tvl:0,
    endTime:0,
    endBlock:0,
    startTime:0
}
export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchDataUser, (state, action) => {
      state.dataUser = action.payload.dataUser
    })
    .addCase(fetchDataUserStaked, (state, action) => {
      state.userStaked = action.payload.userStaked
    })
    .addCase(fetchTvlPool, (state, action) => {
      state.tvl = action.payload.tvl
    })
    .addCase(fetchEndTimeBlock, (state, action) => {
      state.endTime = action.payload.endTime
    })
    .addCase(fetchEndBlock, (state, action) => {
      state.endBlock = action.payload.endBlock
    })
    .addCase(fetchStartTime, (state, action) => {
      state.startTime = action.payload.startTime
    })
)