import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import poolsReducer from './pools'
import poolsNftReducer from './poolsNft'
import predictionsReducer from './predictions'
import profileReducer from './profile'
import teamsReducer from './teams'
import achievementsReducer from './achievements'
import blockReducer from './block'
import collectiblesReducer from './collectibles'
import votingReducer from './voting'
import lotteryReducer from './lottery'
import referralsReducer from './referrals'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import marketplace from "./marketplace/reducer"
import inventory from "./inventory/reducer"
import mybalance from "./mybalance/reducer"
import account from "./account/reducer"
import poolrun from "./poolrun/reducer"
import poolProposals from "./poolProposals/reducer"
import votingProposals from "./votingProposals/reducer"
import marketMultiBuy from "./multiBuyBox/reducer"

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    achievements: achievementsReducer,
    block: blockReducer,
    farms: farmsReducer,
    pools: poolsReducer,
    poolsNft: poolsNftReducer,
    predictions: predictionsReducer,
    profile: profileReducer,
    teams: teamsReducer,
    collectibles: collectiblesReducer,
    voting: votingReducer,
    lottery: lotteryReducer,
    referrals: referralsReducer,
    // Exchange
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    marketplace, 
    inventory,
    mybalance,
    account,
    poolrun,
    poolProposals,
    votingProposals,
    marketMultiBuy
  },
  middleware: [...getDefaultMiddleware({ thunk: true, serializableCheck: false}), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS }),
  
})

store.dispatch(updateVersion())

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
