import React, { useState, useEffect} from "react"
import { useWeb3React } from "@web3-react/core"
import { getAddress } from "utils/addressHelpers"
import tokens from "config/constants/tokens"
import multicall from "utils/multicall"
import BigNumber from "bignumber.js"
import erc20Abi from "config/abi/erc20.json"

export const GetTokenBalance = (token, requested=true) => {
    const { account } = useWeb3React()
    const [ balance, setBalance ] = useState(0)
    useEffect(() => {
        const getBalance = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(token),
                        name: 'balanceOf',
                        params: [account]
                    }
                ]
                const [result] = await multicall(erc20Abi, calls)
                setBalance(Number(new BigNumber(result).toJSON())/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            getBalance()
        }
      }, [account, token, requested])

    return { balance }
}