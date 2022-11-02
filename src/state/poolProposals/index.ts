import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchData, fetchMinToVote, fetchDataSnapShorCount, fetchDataSnapShorList } from "./fetchDataUser"
import { fetchDataPool, fetchMinAmountToVoting, fetchSnapShortCount, fetchListSnapshot } from "./actions"

export const GetPoolProposals = (account:string, poolProposals) => {
    const data = useSelector<AppState, AppState['poolProposals']>((state) => state.poolProposals)
    const dataUserStaked = data.userStaked
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchData(account, poolProposals)
                dispatch(fetchDataPool(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, [ dispatch, account, poolProposals ]) 
    return [ dataUserStaked ]
}

export const GetAmountMintToVote = () => {
    const data = useSelector<AppState, AppState['poolProposals']>((state) => state.poolProposals)
    const minAmountToVote = data.minAmountToVote
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchMinToVote()
                dispatch(fetchMinAmountToVoting(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, [ dispatch ]) 
    return [ minAmountToVote ]
}

export const GetListSnapshot = (poolStoreAddress?:string) => {
    const data = useSelector<AppState, AppState['poolProposals']>((state) => state.poolProposals)
    const listSnapShot = data.listSnapShot
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataSnapShort = async () => {
            try {
                const snapshotCount = await fetchDataSnapShorCount(poolStoreAddress)
                const snapshotList = await fetchDataSnapShorList(snapshotCount.snapshotCount, poolStoreAddress)
                dispatch(fetchSnapShortCount(snapshotCount))
                dispatch(fetchListSnapshot(snapshotList))
            } catch (e) {
                console.log(e)
            }
        }
        getDataSnapShort()
    }, [ dispatch, poolStoreAddress ]) 
    return [ listSnapShot ]
}