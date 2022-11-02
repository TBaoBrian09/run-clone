import { createReducer } from '@reduxjs/toolkit'
import { fetchBalance, fetchTokenIds, fetchTokenInfo, fetchTotalSellItem, fetchSellItems, fetchSellItemsByUser } from "./actions"
import { BoxType, TokenId, SellItemsProps } from "./type"

interface globalStateMarketPlace {
    balance: number,
    totalSell:number,
    listItems:SellItemsProps[],
    listItemsSell:SellItemsProps[],
    tokenIds: TokenId[],
    nftInfo:BoxType[]
}
export const initialState: globalStateMarketPlace = {
    balance:0,
    totalSell:0,
    listItems:[],
    listItemsSell:[],
    tokenIds:[],
    nftInfo:[]
}
export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchBalance, (state, action) => {
      state.balance = action.payload.balance
    })
    .addCase(fetchTokenIds, (state, action) => {
      state.tokenIds = action.payload.tokenIds
    })
    .addCase(fetchTokenInfo, (state, action) => {
      state.nftInfo = action.payload.nftInfo
    })
    .addCase(fetchTotalSellItem, (state, action) => {
      state.totalSell = action.payload.totalSell
    })
    .addCase(fetchSellItemsByUser, (state, action) => {
      state.listItemsSell = action.payload.listItemsSell
    })
    .addCase(fetchSellItems, (state, action) => {
      state.listItems = action.payload.listItems
    })
)