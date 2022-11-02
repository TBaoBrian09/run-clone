import React, { useState, useEffect } from "react";
import { getAddress } from "utils/addressHelpers";
import RunTogetherBox from "config/abi/RunTogetherBox.json"
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import tokens from "config/constants/tokens";
import { useWeb3React } from "@web3-react/core";
import { parseInt } from "lodash";
import axios from 'axios'
import useRefresh from 'hooks/useRefresh'
import contracts from "config/constants/contracts";
import RunMarketplace from "config/abi/RunMarketplace.json"
import { ERC20_ABI } from "config/abi/erc20";


export const FetchApprove = (requestedApprovalForAll) => {
    const [ dataApprove, setDataApprove ] = useState(false)
    const { account } = useWeb3React()
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const approvedForAll = [
                {
                  address: getAddress(tokens.RunTogetherBox.address),
                  name: 'isApprovedForAll',
                  params: [account, getAddress(contracts.runMarketplace)]
                },
             ]
            const [ resultForAll ] = await multicall(RunTogetherBox, approvedForAll)
            setDataApprove(resultForAll[0])
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, requestedApprovalForAll])
  
    return { dataApprove }
}


export const GetSimpleBoxType = (nftId) => {
    const [ boxType, setBoxType ] = useState(0)
    useEffect(() => {
        const getListBoxType = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(tokens.RunTogetherBox.address),
                        name: 'getBoxType',
                        params: [nftId]
                    }
                ]
                const result = await multicall(RunTogetherBox, calls);
                setBoxType(Number(new BigNumber(result[0]).toJSON()))
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (nftId) {
            getListBoxType()
        }
      }, [nftId])

    return { boxType }
}

export const FetchApproveContractTransfer = (requestedApproval) => {
    const [ allowance, setAllowance ] = useState(false)
    const { account } = useWeb3React()
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const approvedForAll = [
                {
                  address: getAddress(tokens.RunTogetherBox.address),
                  name: 'isApprovedForAll',
                  params: [account, getAddress(contracts.withdrawNftRun)]
                },
             ]
            const [ resultForAll ] = await multicall(RunTogetherBox, approvedForAll)
            setAllowance(resultForAll[0])
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, requestedApproval])
  
    return { allowance }

}

export const FetchApproveFee = (requestedApproveFee) => {
  const [ isApproveFee, setApproveFee ] = useState(0)
  const { account } = useWeb3React()
  useEffect(() => {
    const fetchApproveFee = async () => {
      try {
           const approvedForAll = [
              {
                address: getAddress(tokens.Run.address),
                name: 'allowance',
                params: [account, getAddress(contracts.withdrawNftRun)]
              },
           ]
          const [ resultFee ] = await multicall(ERC20_ABI, approvedForAll)
          setApproveFee(Number(new BigNumber(resultFee).toString()))
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetchApproveFee()
    }
  }, [account, requestedApproveFee])

  return { isApproveFee }
}

export const FetchBalanceFee = () => {
  const [ balanceFee, setBalanceFee ] = useState(0)
  const { account } = useWeb3React()
  useEffect(() => {
    const fetchBalanceFee = async () => {
      try {
           const approvedForAll = [
              {
                address: getAddress(tokens.Run.address),
                name: 'balanceOf',
                params: [account]
              },
           ]
          const [ resultFee ] = await multicall(ERC20_ABI, approvedForAll)
          setBalanceFee(Number(new BigNumber(resultFee).toString())/1E18)
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetchBalanceFee()
    }
  }, [account])

  return { balanceFee }
}




