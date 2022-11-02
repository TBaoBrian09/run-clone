import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchBalanceNftInMarkeMultiBuy, fetchAllowanceMarketMultiBuy, fetchTotalBoxOfUser, fetchNftTransfer, fetchUserBuyBox } from "./fetchData"
import { fetchBalanceNftInMarket, fetchDataUser, fetchTotalBoxofUserBuy, fetchMaxNftTransfer, fetchAMountListBoxByUser } from './actions'

export const GetBalanceNftInMarket = () => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const nftInfo = marketMultiBuy.nftInfo
    const nftBalance = nftInfo.nftBalance
    const nftPrice = nftInfo.nftPrice
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getNftBalanceInMarket = async () => {
            try {
                const result = await fetchBalanceNftInMarkeMultiBuy()
                dispatch(fetchBalanceNftInMarket(result))
               
            } catch (e) {
                console.log(e)
            }
        }
        getNftBalanceInMarket();
    }, [dispatch])
    return [ nftBalance, nftPrice ]
}

export const GetDataUser = (account:string) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const dataUser = marketMultiBuy.dataUser
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchAllowanceMarketMultiBuy(account)
                dispatch(fetchDataUser(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser();
    }, [dispatch, account])
    return [ dataUser ]
}

export const GetTotalBoxUserBuy = (account:string) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const totalBoxUserBuy = marketMultiBuy.totalBoxOfUser
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getTotalBoxUserBuy = async () => {
            try {
                const result = await fetchTotalBoxOfUser(account)
                dispatch(fetchTotalBoxofUserBuy(result))
            } catch (e) {
                console.log(e)
            }
        }
        getTotalBoxUserBuy(); 
    }, [dispatch, account])
    return [ totalBoxUserBuy ]
}

export const GetMaxNftTransfer = () => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const maxNftTransfer = marketMultiBuy.maxNftTransfer
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getNftTransfer= async () => {
            try {
                const result = await fetchNftTransfer()
                dispatch(fetchMaxNftTransfer(result))
            } catch (e) {
                console.log(e)
            }
        }
        getNftTransfer(); 
    }, [dispatch])
    return [ maxNftTransfer ]
}

export const GetBoxBuyOfUser = (account:string) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const listBoxByUser = marketMultiBuy.listBoxByUser
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListUserBuyBox= async () => {
            try {
                const result = await fetchUserBuyBox(account)
                dispatch(fetchAMountListBoxByUser(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListUserBuyBox(); 
    }, [dispatch, account])
    return [ listBoxByUser ]
}