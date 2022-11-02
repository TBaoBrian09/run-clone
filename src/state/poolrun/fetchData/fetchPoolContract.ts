import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import { URL } from "config/index"
import BigNumber from "bignumber.js";
import { getAddress } from "utils/addressHelpers";
import tokens from "config/constants/tokens";
import contracts from "config/constants/contracts";
import erc20ABI from 'config/abi/erc20.json'
import poolRunAbi from "config/abi/poolRunAbi.json"
import { tvlProps, endTimeProps, startTimeProps } from "../type";

export const fetcTvlPoolData = async (): Promise<tvlProps> => {
    try {
        const calls = [
            {
                address: getAddress(tokens.Run.address),
                name: 'balanceOf',
                params: [getAddress(contracts.poolRun)]
            },
        ]
        const [ result ] = await multicall(erc20ABI, calls)
        return {
            tvl:Number(result?.toString())/1E18
        }
    }
    catch(error) {
        console.log(error)
        return {
            tvl:0 
        }
       
    }
}

export const fetchEndTimePool = async (): Promise<endTimeProps> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.poolRun),
                name: 'endTime',
                params: []
            },
        ]
        const [ result ] = await multicall(poolRunAbi, calls)
        return {
            endTime:Number(result?.toString())
        }
    }
    catch(error) {
        console.log(error)
        return {
            endTime:0 
        }
       
    }
}

export const fetchStartTimePool = async (): Promise<startTimeProps> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.poolRun),
                name: 'startTime',
                params: []
            },
        ]
        const [ result ] = await multicall(poolRunAbi, calls)
        return {
            startTime:Number(result?.toString())
        }
    }
    catch(error) {
        console.log(error)
        return {
            startTime:0 
        }
       
    }
}
