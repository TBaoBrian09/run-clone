import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from 'hooks/useRefresh'


export const GetBlockNumber = () => {
    const [ block, setBlockNumber ] = useState(0)
    const { slowRefresh } = useRefresh()
    useEffect(() => {
        const getBlockNumber = async () =>{
        try {
            const blockNumber = await simpleRpcProvider.getBlockNumber()
            setBlockNumber(blockNumber)
        } catch (error) {
            console.error(error);
        }
    }
        getBlockNumber()
    // console.log("block", block)
    }, [slowRefresh]) // eslint-disable-line react-hooks/exhaustive-deps
    return { block }
}