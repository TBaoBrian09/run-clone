import React, { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { getAddress } from "utils/addressHelpers"
import multicall from "utils/multicall"
import BigNumber from "bignumber.js"
import { ERC20_ABI } from "config/abi/erc20"
import tokens from "config/constants/tokens"

export const CheckAllowance = (requested) => {
    const [ balanceOf, setBalanceOf ] = useState(0)
    const { account } = useWeb3React()
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const calls = [
                {
                  address: getAddress(tokens.Run.address),
                  name: 'balanceOf',
                  params: [account]
                },
             ]
            const result = await multicall(ERC20_ABI, calls)
            setBalanceOf(Number(new BigNumber(result).toString())/1E18)
        } catch (e) {
          console.log(e)
        }
      }
      if (account) {
        fetchBalance()
      }
    }, [account, requested])
  
    return { balanceOf }
}