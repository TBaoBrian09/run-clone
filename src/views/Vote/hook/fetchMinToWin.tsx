import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js"
import votingProposal from "config/abi/votingProposals.json"
import { useWeb3React } from "@web3-react/core";

export const FetchMinToWin =  (contractAddress) =>{
    const [stakeMinToWin, setStakeMinToWin] = useState("0");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { account } = useWeb3React();  
    useEffect(()=>{
         const getminAmountToWin = async ()=>{
             try {
                 const calls = [
                    {
                        address: contractAddress,
                        name: 'minAmountToWin',
                        params: []
                    },
                 ]   
                 const [resultMinTOWint] = await multicall(votingProposal, calls);
                 setStakeMinToWin((new BigNumber(resultMinTOWint).dividedBy(1E18)).toString(),)
             }
             catch(error) {
                console.log(error)
            }
         }
            getminAmountToWin()
    },[contractAddress, account])
    return {stakeMinToWin}
}

