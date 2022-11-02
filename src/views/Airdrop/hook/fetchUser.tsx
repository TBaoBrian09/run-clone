import { useEffect, useState } from 'react'
import ltdAirdropAbi from "config/abi/ltdAirdropAbi.json"
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'

export enum FetchStatus {
    NOT_FETCHED = 'not-fetched',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export const fetchUser = async(account, contractAdress) => {
    
    const calls = [
        {
            address: contractAdress,
            name: 'endTime',
            params: []
        },
        {
            address: contractAdress,
            name: 'startTime',
            params: []
        },
        {
            address: contractAdress,
            name: 'airdropUserMap',
            params: [account]
        },
        {
            address: contractAdress,
            name: 'airdropUserClaimed',
            params: [account]
        },
        {
            address: contractAdress,
            name: 'airdropTokenMap',
            params: [account]
        },
        {
            address: contractAdress,
            name: 'airdropAmountMap',
            params: [account]
        },
        

    ] 

    const [endTime, startTime, [userMap], [userClaimed], [tokenMap], airdropAmountUser] = await multicall(ltdAirdropAbi, calls)
    return {
        endTimeClaim: Number(new BigNumber(endTime).toJSON()),
        startTimeClaim:Number(new BigNumber(startTime).toJSON()),
        userMap,
        userClaimed,
        tokenMap,
        airdropAmount:Number(new BigNumber(airdropAmountUser).toJSON())/1E18,
    }
}


