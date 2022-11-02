import { useCallback, useEffect } from 'react'
import { URL } from "config/index"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchAllTransactions, fetchBalance } from "./actions"
import { fetchListTransactions, fetchUserBalance } from './fetchData'

export const GetAllTransaction = (start:string, end:string) => {
    const mybalance = useSelector<AppState, AppState['mybalance']>((state) => state.mybalance)
    const listAllTransactions = mybalance.listTransactions
    
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const renderURL = start !== null && end !== null ?  `${URL}/balance/get-history?from=${start}&to=${end}` : `${URL}/balance/get-history`
                const result = await fetchListTransactions(renderURL)
                dispatch(fetchAllTransactions(result))
            } catch (e) {
                console.log(e)
            }
        }
        getAllTransactions()
    }, [start, end, dispatch])
    return [ listAllTransactions ]
}

export const GetListBalance = () => {
    const mybalance = useSelector<AppState, AppState['mybalance']>((state) => state.mybalance)
    const mainBalance = mybalance.listBanlace.mainBalance
    const earnBalance = mybalance.listBanlace.earnBalance
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListBalance = async () => {
            try {
                const result = await fetchUserBalance()
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListBalance()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return [ mainBalance, earnBalance ]
}