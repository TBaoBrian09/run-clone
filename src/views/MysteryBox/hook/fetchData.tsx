import contracts from 'config/constants/contracts';
import { useEffect, useState } from 'react';
import { getAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import mysteryBox from "config/abi/mysteryBox.json";
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import tokens from 'config/constants/tokens';
import erc20ABI from 'config/abi/erc20.json'

export const GetPriceBox = () => {
    const [ price, setPrice ] = useState(0);
    useEffect(() => {
        const getPriceBox = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.mysteryBox),
                        name: 'price',
                        params: []
                    }
                ]
                const result = await multicall(mysteryBox, calls);
                setPrice(result);
            }
            catch(error) {
                console.log(error)
            }
        }
        getPriceBox();
    }, []);
    return { price }
}

export const GetAmountSold = (refresh: number) => {
    const [inforSold, setInforSold] = useState({
        sold: 0,
        maxSell: 0
    });
    useEffect(() => {
        const fetchInforSell = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.mysteryBox),
                        name: 'maxNftToBuy',
                        params: []
                    },
                    {
                        address: getAddress(contracts.mysteryBox),
                        name: 'numOfBuy',
                        params: []
                    }
                ]
                const [ resultMaxNftToBuy, resultNumOfBuy ] = await multicall(mysteryBox, calls);
                setInforSold({
                    sold: Number(new BigNumber(resultNumOfBuy).toJSON()),
                    maxSell: Number(new BigNumber(resultMaxNftToBuy).toJSON())
                });
            }  catch (e) {
                console.log(e)
            }         
        }
        fetchInforSell(); 
    }, [refresh]);
    return { inforSold }
}

export const GetStartEndTime = () => {
    const [ startEndTime, setStartEndTime ] = useState({
        startIn: 0,
        endIn: 0
    });
    useEffect(() => {
        const fetchTimeStartEndIn = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.mysteryBox),
                        name: 'startTimeBuy',
                        params: []
                    },
                    {
                        address: getAddress(contracts.mysteryBox),
                        name: 'endTimeBuy',
                        params: []
                    }
                ]
                const [ resultStartTimeBuy, resultEndTimeBuy ] = await multicall(mysteryBox, calls);
                setStartEndTime({
                    startIn: Number(new BigNumber(resultStartTimeBuy).toJSON()),
                    endIn: Number(new BigNumber(resultEndTimeBuy).toJSON())
                });
            } catch (e) {
                console.log(e)
            }
        }
        fetchTimeStartEndIn();
    }, []);
    return { startEndTime }
}

export const FetchDataUser = (requestedApproval, refresh: number) => {
    const [ dataBalance, setDataBalance ] = useState({
        balanceOf: 0,
        isApprove: 0
    });
    const { account } = useWeb3React();
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const calls = [
                {
                    address: getAddress(tokens.busd.address),
                    name: 'balanceOf',
                    params: [account]
                },
                {
                    address: getAddress(tokens.busd.address),
                    name: 'allowance',
                    params: [account, getAddress(contracts.mysteryBox)]
                },
             ]
            const [ resultBalance, allowance ] = await multicall(erc20ABI, calls);

            setDataBalance({
                balanceOf: Number(new BigNumber(resultBalance).toJSON()) /1E18,
                isApprove: Number(new BigNumber(allowance).toJSON())
            })
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, requestedApproval, refresh])
    return { dataBalance }
}