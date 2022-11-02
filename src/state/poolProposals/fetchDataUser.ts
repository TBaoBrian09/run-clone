import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import { URL } from "config/index"
import BigNumber from "bignumber.js";
import { getAddress } from "utils/addressHelpers";
import tokens from "config/constants/tokens";
import contracts from "config/constants/contracts";
import poolProposalsAbi from "config/abi/poolProposals.json"
import votingProposalsAbi from "config/abi/votingProposals.json"
import poolStoreAbi from "config/abi/poolStore.json"
import { userStaked, MinAmoutToVoting, ListSnapshot, SnapshotCount } from "./type";

export const fetchData = async (account:string, poolProposals:any): Promise<userStaked> => {
    const callsStartTime = poolProposals.map((item) => {
        return {
            address: getAddress(item.storeContract),
            name: 'startTime',
            params: []
        }
    })
    const callsEndTime = poolProposals.map((item) => {
        return {
            address: getAddress(item.storeContract),
            name: 'endTime',
            params: []
        }
    })
    const resultStartTime = await multicall(poolProposalsAbi, callsStartTime)
    const resultEndTime = await multicall(poolProposalsAbi, callsEndTime)
    if ( account ) {
        try {
            const callsUserInfo = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract),
                    name: 'userInfo',
                    params: [account]
                }
            })
            const callsPenddingReward = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract),
                    name: 'pendingReward',
                    params: [account]
                }
            })
            const resultUserInfo = await multicall(poolProposalsAbi, callsUserInfo)
            const resultPenddingReward = await multicall(poolProposalsAbi, callsPenddingReward)
            const result = resultPenddingReward.map((item, key) => {
                return { 
                    amount:new BigNumber(resultUserInfo[key].amount?._hex).dividedBy(1E18).toString(),
                    stakeBlock:Number(new BigNumber(resultUserInfo[key]?.stakeBlock.toString())),
                    unstakeLockTime:Number(resultUserInfo[key]?.unstakeLockTime.toString()),
                    pendingReward:Number(new BigNumber(resultPenddingReward[key].toString()))/1E18,
                    endTime:Number(resultEndTime[key]?.toString()),
                    startTime:Number(resultStartTime[key]?.toString())
                }
            })
            return {
                userStaked : result
            }
        }
        catch(error) {
            console.log(error)
            return {
                userStaked : [
                    {
                        amount:0,
                        stakeBlock:0,
                        unstakeLockTime:0,
                        pendingReward:0,
                        endTime:0,
                        startTime:0
                    }
                ]
            }
           
        }
    } else {
        const result = resultStartTime.map((item, key) => {
            return { 
                amount: 0,
                stakeBlock:0,
                unstakeLockTime:0,
                pendingReward:0,
                endTime:Number(resultEndTime[key]?.toString()),
                startTime:Number(resultStartTime[key]?.toString())
            }
        })
        return {
            userStaked : result
        }
    }
    
}

export const fetchMinToVote = async (): Promise<MinAmoutToVoting> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.votingProposals),
                name: 'openingAmount',
                params: []
            }
        ]
        const [ resultMinAmount ] = await multicall(votingProposalsAbi, calls)
        return {
            minAmountToVote:Number((resultMinAmount?.toString()))/1E18
        }
    }
    catch(error) {
        console.log(error)
        return {
            minAmountToVote:0
        }
       
    }
    
}

export const fetchDataSnapShorCount = async (poolStoreAddress:string): Promise<SnapshotCount> => {
    try {
        const calls = [
            {
                address: poolStoreAddress,
                name: 'snapshotCount',
                params: []
            }
        ]
        const [ resultSnapShortCount ] = await multicall(poolStoreAbi, calls)
        return {
            snapshotCount:Number((resultSnapShortCount?.toString()))
        }
    }
    catch(error) {
        console.log(error)
        return {
            snapshotCount:0
        }
       
    }
}
export const fetchDataSnapShorList = async (snapshotCount:number, poolStoreAddress:string): Promise<ListSnapshot> => {
    if ( snapshotCount > 0 ) {
        try {
            const listBlockNumber = []
            const listProfit = []
            for (let index = 1; index < snapshotCount; index++) {
                listProfit.push({
                    address: poolStoreAddress,
                    name: 'listProfitAmount',
                    params: [index]
                })
                listBlockNumber.push({
                    address: poolStoreAddress,
                    name: 'blockNumber',
                    params: [index]
                })
            }
            const resultListProfit = await multicall(poolStoreAbi, listProfit)
            const resultListBlock = await multicall(poolStoreAbi, listBlockNumber)
            const result = resultListProfit.map((item, key) => {
                return { 
                    listProfitAmount:Number((resultListProfit[key]?.toString()))/1E18,
                    blockNumber:Number((resultListBlock[key]?.toString()))
                }
            })
            return {
                listSnapShot:result
            }
        }
        catch(error) {
            console.log(error)
            return {
                listSnapShot:[
                    {
                        listProfitAmount:0,
                        blockNumber:0
                    }
                ]
            }
           
        }
    } else {
        return {
            listSnapShot:[
                {
                    listProfitAmount:0,
                    blockNumber:0
                }
            ]
        }
    }
}