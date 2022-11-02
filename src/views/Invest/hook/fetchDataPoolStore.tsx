import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import poolStoreAbi from "config/abi/poolStore.json"
import poolProposalAbi from "config/abi/poolProposals.json"
import { useWeb3React } from "@web3-react/core";

export const GetTotalProfitAmount = (contractAddress, refresh) => {
    const [ totalProfitAmount, setTotalProfitAmount ] = useState(0)
    useEffect(() => {
        const getTotalProfitAmount = async () => {
            try {
                const calls = [
                    {
                    address: contractAddress,
                    name: 'lastTotalProfitAmount ',
                    params: []
                  }
            ]
                const resultTotalProfitAmount = await multicall(poolStoreAbi, calls)
                setTotalProfitAmount(Number(new BigNumber(resultTotalProfitAmount[0].toString()).dividedBy(1E18)))
            }
            catch(error) {
                console.log(error)
            }
        }
        getTotalProfitAmount()
      }, [contractAddress, refresh])
    return { totalProfitAmount }
}

export const GetPendingRewardPoolStore = (contractAddress, refresh,callback) => {
    const [ pendingRewardPoolStore, setPendingReward ] = useState(0)
    const { account } = useWeb3React()
    useEffect(() => {
        const getTotalProfitAmount = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'pendingRewardAll',
                        params: [account]
                    },
                ]
                const [ resultPenddingReward ] = await multicall(poolStoreAbi, calls)
                setPendingReward(Number(new BigNumber(resultPenddingReward.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account) {
            getTotalProfitAmount()
        } else {
            setPendingReward(0)
        }
      }, [ contractAddress, refresh, account,callback ])

    return { pendingRewardPoolStore }
}

export const GetPendingRewardProposal = (contractAddress,callback, refresh) =>{
    const [pendingProposal,setpendingProposal] = useState(0);
    const {account} = useWeb3React();
    useEffect(() => {
        const getTotalProposal = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'pendingReward',
                        params: [account]
                    },
                ]
                const [ resultPenddingReward ] = await multicall(poolProposalAbi, calls);
                setpendingProposal(Number((resultPenddingReward.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account && contractAddress) {
            getTotalProposal()
        } else {
            setpendingProposal(0)
        }
      }, [ contractAddress, account, callback, refresh])
      return {pendingProposal}
}
export const GetSnapshotCount = (poolStoreAddress) =>{
    const [snapshotCount,setSnapshotCount] = useState(0);
    useEffect(() => {
        const getSnapshotCount = async () => {
            try {
                const calls = [
                    {
                        address: poolStoreAddress,
                        name: 'snapshotCount',
                        params: []
                    }
                ]
                const [ resultSnapShortCount ] = await multicall(poolStoreAbi, calls)
                setSnapshotCount(Number((resultSnapShortCount?.toString())))
            }
            catch(error) {
                console.log(error)
                setSnapshotCount(0)
               
            }
        }
        if (poolStoreAddress) {
            getSnapshotCount()
        } else {
            setSnapshotCount(0)
        }
      }, [ poolStoreAddress ])
      return {snapshotCount}
}

export const GetSnapshotList = (poolStoreAddress, poolLength) =>{
    const [snapshotList,setSnapshotList] = useState([]);
    useEffect(() => {
        const getSnapshotList = async () => {
            try {
                const calls = []
                const newarr = [];
                for (let i = 0; i < poolLength; i++) {
                    calls.push(
                        {
                            address: poolStoreAddress,
                            name: 'poolInfo',
                            params: [i]
                        }
                    )
                }
                const resultPoolInfo = await multicall(poolStoreAbi, calls)
               
                for (let i = 0; i < resultPoolInfo?.length; i++) {     
                    if (resultPoolInfo[i]?.isStopPool === true) {
                        newarr.push({
                            lastRewardBlock:Number(new BigNumber(resultPoolInfo[i].lastRewardBlock.toString())),
                            lastTimestamp:Number(new BigNumber(resultPoolInfo[i].lastTimestamp.toString())),
                            totalProfitAmount:Number(new BigNumber(resultPoolInfo[i].totalProfitAmount.toString()).dividedBy(1E18)),
                        })
                    }       
                   
                }              
                setSnapshotList(newarr);
            }
            catch(error) {
                console.log(error)
                setSnapshotList([])
            }
        }
        if (poolLength) {
            getSnapshotList()
        } else {
            setSnapshotList([])
        }
      }, [ poolStoreAddress, poolLength])
      return {snapshotList}
}
