import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js"
import votingProposal from "config/abi/votingProposals.json"
import { useWeb3React } from "@web3-react/core";

export const FetchVotingDuration =  (contractAddress) =>{
    const [stakeVotingDuration, setStakeVotingDuration] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { account } = useWeb3React();  
    useEffect(()=>{
         const getminAmountToWin = async ()=>{
             try {
                 const calls = [
                    {
                        address: contractAddress,
                        name: 'votingDuration',
                        params: []
                    },
                 ]   
                 const [resultvotingDuration] = await multicall(votingProposal, calls);
                 setStakeVotingDuration( Number(new BigNumber(resultvotingDuration).toString()))
             }
             catch(error) {
                console.log(error)
            }
         }
            getminAmountToWin()
    },[contractAddress, account])
    return {stakeVotingDuration}
}

