import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchCountProposals, fetchVoting, fetchAllowance, fetchVotingData } from './fetchDataVoting'
import { fetchTotalProposals, fetchListProposals, fetchAllowanceVoting, fetchSnapShortVoting } from './actions'

export const GetTotalProposals = () => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const totalProposals = data.countProposals
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getCountProposals = async () => {
            try {
                const result = await fetchCountProposals()
                dispatch(fetchTotalProposals(result))
            } catch (e) {
                console.log(e)
            }
        }
        getCountProposals()
    }, [dispatch]) 
    return [ totalProposals ]
}

export const GetListProposals = (totalProposals:number) => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const listProposals = data.listVoting
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListVoting = async () => {
            try {
                const result = await fetchVoting(totalProposals)
                dispatch(fetchListProposals(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListVoting()
    }, [dispatch, totalProposals]) 
    return [ listProposals ]
}

export const GetAllowanceVoting = (account:string, requested:boolean) => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const allowanceVoting = data.allowance
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getAllowanceVoting = async () => {
            try {
                const result = await fetchAllowance(account)
                dispatch(fetchAllowanceVoting(result))
            } catch (e) {
                console.log(e)
            }
        }
        getAllowanceVoting()
    }, [dispatch, account, requested]) 
    return [ allowanceVoting ]
}

export const GetSnapShortVoting = (votingId:number) => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const listVotingData = data.listVotingData
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getSnapShortVoting = async () => {
            try {
                const result = await fetchVotingData(votingId)
                dispatch(fetchSnapShortVoting(result))
            } catch (e) {
                console.log(e)
            }
        }
        getSnapShortVoting()
    }, [dispatch, votingId]) 
    return [ listVotingData ]
}