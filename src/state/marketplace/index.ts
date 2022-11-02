import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchBalanceNft, fetchTokensId, fetchBoxType, fetchTotalSell, fetchItemsSellByUser, fetchItemsSell } from "./hook/fectDataMarketPlace"
import { fetchBalance, fetchTokenIds, fetchTokenInfo, fetchTotalSellItem, fetchSellItemsByUser, fetchSellItems } from './actions'

export const GetBalanceNft = (account:string) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const balance = marketplace.balance
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getSaleItems = async () => {
            try {
                const result = await fetchBalanceNft(account)
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
        getSaleItems();
    }, [account, dispatch])
    return [ balance ]
}

export const GetTokenIds = (account:string, balance:number) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const tokenIds = marketplace.tokenIds
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getTokenIds = async () => {
            try {
                const result = await fetchTokensId(account, balance)
                dispatch(fetchTokenIds(result))
            } catch (e) {
                console.log(e)
            }
        }
        getTokenIds()
    }, [account, balance, dispatch])
    return [ tokenIds ]
}

export const GetNftInfo = (listNftId:any) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const nftInfo = marketplace.nftInfo
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getNftInfo = async () => {
            try {
                const result = await fetchBoxType(listNftId)
                dispatch(fetchTokenInfo(result))
            } catch (e) {
                console.log(e)
            }
        }
        getNftInfo()
    }, [listNftId, dispatch])
    return [ nftInfo ]
}

export const GetTotalSellItems = () => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const totalSell = marketplace.totalSell
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getTotalSellItems = async () => {
            try {
                const result = await fetchTotalSell()
                dispatch(fetchTotalSellItem(result))
            } catch (e) {
                console.log(e)
            }
        }
        getTotalSellItems()
    }, [dispatch])
    return [ totalSell ]
}
export const GetSellItemsByUser = (totalSellItems:number, account:string|undefined) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const listItems = marketplace.listItemsSell
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListSellItems = async () => {
            try {
                const result = await fetchItemsSellByUser(totalSellItems, account )
                dispatch(fetchSellItemsByUser(result))
            } catch (e) {
                console.log(e)
            }
        }
        if ( totalSellItems > 0 ) {
            getListSellItems()
        }
    }, [totalSellItems, dispatch, account])
    return [ listItems ]
}

export const GetListItems = (totalSellItems:number) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const listItems = marketplace.listItems
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListSellItems = async () => {
            try {
                const result = await fetchItemsSell(totalSellItems)
                dispatch(fetchSellItems(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListSellItems()
    }, [totalSellItems, dispatch])
    return [ listItems ]
}