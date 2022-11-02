import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import poolStoreAbi from "config/abi/poolStore.json"
import poolProposalAbi from "config/abi/poolProposals.json"
import { useWeb3React } from "@web3-react/core";

export const GetDataPoolLength = (contractAddress) => {
    const [ poolLength, setpoolLength ] = useState(0)
    useEffect(() => {
        const getPoolLength = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'poolLength',
                        params: []
                    },
                ]
                const [ resultPoollength ] = await multicall(poolStoreAbi, calls)               
                setpoolLength(Number(new BigNumber(resultPoollength.toString())))
            }
            catch(error) {
                console.log(error)
            }
        }
        getPoolLength()
      }, [ contractAddress ])

    return { poolLength }
}