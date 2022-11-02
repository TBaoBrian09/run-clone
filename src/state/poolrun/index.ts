import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchData } from "./fetchData/fetchDataUser"
import { fetchUserStaked, fetchDataEndBlock } from "./fetchData/fetchDataUserPool"
import { fetcTvlPoolData, fetchEndTimePool, fetchStartTimePool } from './fetchData/fetchPoolContract'
import { fetchDataUser, fetchDataUserStaked, fetchTvlPool, fetchEndTimeBlock, fetchEndBlock, fetchStartTime } from "./actions"

export const GetDataUser = (account:string, requestedApprovalTokenStake=true, refresh=0) => {
    const data = useSelector<AppState, AppState['poolrun']>((state) => state.poolrun)
    const dataUser = data.dataUser
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchData(account)
                dispatch(fetchDataUser(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, [dispatch, account, requestedApprovalTokenStake, refresh]) 
    return [ dataUser ]
}

export const GetDataUserStaked = (account:string, refresh:number) => {
    const data = useSelector<AppState, AppState['poolrun']>((state) => state.poolrun)
    const dataUserStaked = data.userStaked
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getUserStaked = async () => {
            try {
                const result = await fetchUserStaked(account)
                dispatch(fetchDataUserStaked(result))
            } catch (e) {
                console.log(e)
            }
        }
        getUserStaked()
    }, [dispatch, account, refresh]) 
    return [ dataUserStaked ]
}
export const GetTvlPool = () => {
    const data = useSelector<AppState, AppState['poolrun']>((state) => state.poolrun)
    const dataTvl = data.tvl
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getUserStaked = async () => {
            try {
                const result = await fetcTvlPoolData()
                dispatch(fetchTvlPool(result))
            } catch (e) {
                console.log(e)
            }
        }
        getUserStaked()
    }, [dispatch]) 
    return [ dataTvl ]
}

export const GetEndTimePool = () => {
    const data = useSelector<AppState, AppState['poolrun']>((state) => state.poolrun)
    const endTimePool = data.endTime
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getEndTimePool = async () => {
            try {
                const result = await fetchEndTimePool()
                dispatch(fetchEndTimeBlock(result))
            } catch (e) {
                console.log(e)
            }
        }
        getEndTimePool()
    }, [dispatch]) 
    return [ endTimePool ]
}
export const GetEndBlock = () => {
    const data = useSelector<AppState, AppState['poolrun']>((state) => state.poolrun)
    const endBlockPool = data.endBlock
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getEndBlockPool = async () => {
            try {
                const result = await fetchDataEndBlock()
                dispatch(fetchEndBlock(result))
            } catch (e) {
                console.log(e)
            }
        }
        getEndBlockPool()
    }, [dispatch]) 
    return [ endBlockPool ]
}

export const GetStartTime = () => {
    const data = useSelector<AppState, AppState['poolrun']>((state) => state.poolrun)
    const startTime = data.startTime
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getStartTime = async () => {
            try {
                const result = await fetchStartTimePool()
                dispatch(fetchStartTime(result))
            } catch (e) {
                console.log(e)
            }
        }
        getStartTime()
    }, [dispatch]) 
    return [ startTime ]
}