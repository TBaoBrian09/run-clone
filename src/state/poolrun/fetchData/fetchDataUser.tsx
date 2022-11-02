import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import { URL } from "config/index"
import BigNumber from "bignumber.js";
import { getAddress } from "utils/addressHelpers";
import tokens from "config/constants/tokens";
import contracts from "config/constants/contracts";
import erc20ABI from 'config/abi/erc20.json'
import { user } from "../type";

export const fetchData = async (account:string): Promise<user> => {
    if ( account ) {
        try {
            const calls = [
                {
                    address: getAddress(tokens.Run.address),
                    name: 'balanceOf',
                    params: [account]
                },
                {
                    address: getAddress(tokens.Run.address),
                    name: 'allowance',
                    params: [account, getAddress(contracts.poolRun)]
                },
            ]
            const [ resultBalance, requestedApprove ] = await multicall(erc20ABI, calls)
    
            return {
                dataUser : {
                    balanceOf:Number(new BigNumber(resultBalance).toJSON())/1E18,
                    allowance:Number(new BigNumber(requestedApprove).toJSON())
                }
            }
        }
        catch(error) {
            console.log(error)
            return {
                dataUser : {
                    balanceOf:0,
                    allowance:0
                }
            }
           
        }
    } else {
        return {
            dataUser : {
                balanceOf:0,
                allowance:0
            }
        }
    }
    
}