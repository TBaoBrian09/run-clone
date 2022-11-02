import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userStaked, MinAmoutToVoting, ListSnapshot, SnapshotCount } from './type'

export const fetchDataPool = createAction<userStaked>('poolProposals/fetchDataPool')
export const fetchMinAmountToVoting = createAction<MinAmoutToVoting>('poolProposals/fetchMinAmountToVoting')
export const fetchSnapShortCount = createAction<SnapshotCount>('poolProposals/fetchSnapShortCount')
export const fetchListSnapshot = createAction<ListSnapshot>('poolProposals/fetchListSnapshot')
