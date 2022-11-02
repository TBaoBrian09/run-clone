import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ListShoes, ListBoxes, ListTokenId } from './type'

export const fetchShoes = createAction<ListShoes>('inventory/fetchShoes')
export const fetchBoxes = createAction<ListBoxes>('inventory/fetchBoxes')
export const fetchBalanceMysteryBox = createAction<{ balanceMysteryBox: number }>('inventory/fetchBalanceMysteryBox')
export const fetchlistTokenId = createAction<ListTokenId>('inventory/fetchlistTokenId')
