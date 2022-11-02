import { createReducer } from '@reduxjs/toolkit'
import { fetchTotalProposals, fetchListProposals, fetchAllowanceVoting, fetchSnapShortVoting } from "./actions"
import { CountProposal, ListVoting, VotingProposalsType, ListVotingData, votingData } from "./type"

interface globalPoolRun {
    countProposals:number,
    listVoting:VotingProposalsType[],
    allowance:number,
    listVotingData:votingData[]
}
export const initialState: globalPoolRun = {
    countProposals:0,
    allowance:0,
    listVoting:[
      {
          votingId:0,
          ownerAddress:"",
          startTime:0,
          endTime:0,
          agree:"0",
          disagrees:"0"
      }
  ],
  listVotingData:[
    {
      transactionHash:"",
      amount:"0",
      option:false,
      voter:""
    }
  ]
}
export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchTotalProposals, (state, action) => {
      state.countProposals = action.payload.countProposals
    })
    .addCase(fetchListProposals, (state, action) => {
      state.listVoting = action.payload.listVoting
    })
    .addCase(fetchAllowanceVoting, (state, action) => {
      state.allowance = action.payload.allowance
    })
    .addCase(fetchSnapShortVoting, (state, action) => {
      state.listVotingData = action.payload.listVotingData
    })
)