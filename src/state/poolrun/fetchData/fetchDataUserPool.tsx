import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import { URL } from "config/index"
import BigNumber from "bignumber.js";
import { getAddress } from "utils/addressHelpers";
import tokens from "config/constants/tokens";
import contracts from "config/constants/contracts";
import poolRunAbi from "config/abi/poolRunAbi.json"
import { user, userStaked, endBlockProps } from "../type";

export const fetchUserStaked = async (account:string): Promise<userStaked> => {
    if ( account ) {
        try {
            const calls = [
                {
                    address: getAddress(contracts.poolRun),
                    name: 'userInfo',
                    params: [account]
                },
                {
                    address: getAddress(contracts.poolRun),
                    name: 'pendingReward',
                    params: [account]
                },
            ]
            const [ resultUserInfo, resultPenddingReward] = await multicall(poolRunAbi, calls)
            return {
                userStaked : { 
                    amount: Number(new BigNumber(resultUserInfo?.amount.toString()))/1E18,
                    stakeBlock:Number(new BigNumber(resultUserInfo?.stakeBlock.toString())),
                    unstakeLockTime:Number(resultUserInfo?.unstakeLockTime.toString()),
                    pendingReward:Number(new BigNumber(resultPenddingReward.toString()))/1E18,
                }
            } 
        }
        catch(error) {
            console.log(error)
            return {
                userStaked : {
                    amount:0,
                    stakeBlock:0,
                    unstakeLockTime:0,
                    pendingReward:0
                }
            }
           
        }
    } else {
        return {
            userStaked : {
                amount:0,
                stakeBlock:0,
                unstakeLockTime:0,
                pendingReward:0
            }
        }
    }
    
}
export const fetchDataEndBlock = async (): Promise<endBlockProps> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.poolRun),
                name: 'endBlock',
                params: []
            },
           
        ]
        const [ resultEndBlock ] = await multicall(poolRunAbi, calls)
        return {
            endBlock:Number(resultEndBlock?.toString())
        }
    }
    catch(error) {
        console.log(error)
        return {
            endBlock:0
        }
       
    }
}