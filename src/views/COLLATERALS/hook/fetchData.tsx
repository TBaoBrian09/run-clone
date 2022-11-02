import React, { useState, useEffect } from "react";
import { getAddress } from "utils/addressHelpers";
import RunTogetherBox from "config/abi/RunTogetherBox.json"
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import tokens from "config/constants/tokens";
import { useWeb3React } from "@web3-react/core";
import { parseInt } from "lodash";
import useRefresh from 'hooks/useRefresh'
import contracts from "config/constants/contracts";
import RunMarketplace from "config/abi/RunMarketplace.json"
import erc20ABI from 'config/abi/erc20.json'
import axios from 'axios'
import { BASE_URL_LISTONSALE, BASE_URL_INWALLET } from "config";

export const GetBalanceOf = () => {
    const { account } = useWeb3React()
    const [ balance, setBalance ] = useState(0)
    useEffect(() => {
        const getBalance = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(tokens.RunTogetherBox.address),
                        name: 'balanceOf',
                        params: [account]
                    }
                ]
                const [result] = await multicall(RunTogetherBox, calls)
                setBalance(Number(new BigNumber(result).toJSON()))
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            getBalance()
        }
      }, [account])

    return { balance }
}
export async function getNftId (account, balance) {
    const calls = [];
    for (let index = 0; index < balance; index++) {
        calls.push({
            address: getAddress(tokens.RunTogetherBox.address),
            name: 'tokenOfOwnerByIndex',
            params: [account, index]
        })
    }
    const result = await multicall(RunTogetherBox, calls);
    return result
}
export const GetListNftId = (balance) => {
    const { account } = useWeb3React()
    const [ listNftId, setListNftId ] = useState([])
    useEffect(() => {
        const getBalance = async () => {
            const listId = []
            try {
                const calls = [];
                for (let index = 0; index < balance; index++) {
                    calls.push({
                        address: getAddress(tokens.RunTogetherBox.address),
                        name: 'tokenOfOwnerByIndex',
                        params: [account, index]
                    })
                }
                const result = await multicall(RunTogetherBox, calls);
                for( let index = 0;index < result.length;index++){
                    listId.push(parseInt(result[index].toString()))
                }
                setListNftId(listId)
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            getBalance()
        }
      }, [account, balance])

    return { listNftId }
}

export const GetTokenURL = (listNftId) => {
    const [ listTokenUrl, setListTokenUrl ] = useState([])
    const { account } = useWeb3React()
    useEffect(() => {
        const getListTokenUrl = async () => {
            const listId = []
            try {
                const calls = [];
                for (let index = 0; index < listNftId.length; index++) {
                    calls.push({
                        address: getAddress(tokens.RunTogetherBox.address),
                        name: 'tokenURI',
                        params: [listNftId[index]]
                    })
                }
                const result = await multicall(RunTogetherBox, calls);
                for( let index = 0;index < result.length;index++){
                    listId.push(result[index].toString())
                }
                setListTokenUrl(listId)
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            getListTokenUrl()
        }
      }, [account, listNftId])

    return { listTokenUrl }
}

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
export const GetTotalSell = () => {
    const [ totalSell, setTotalSell ] = useState(0)
    const { account } = useWeb3React()
    const { slowRefresh } = useRefresh()
    useEffect(() => {
        const getItems = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.runMarketplace),
                        name: 'saleItemsCount',
                        params: []
                    }
                ]
                const [result] = await multicall(RunMarketplace, calls)
                setTotalSell(Number(new BigNumber(result).toJSON()))
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            getItems()
        }
      }, [account, slowRefresh])
  
    return { totalSell }
}
export const GetOnSale = (totalItem) => {
    const { account } = useWeb3React()
    const [ listOnSell, setOnSell ] = useState([])
    const [ listNft, setListSell ] = useState([])
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        const getListOnSell = async () => {
            const listId = []
            const listSell = []
            try {
                const calls = [];
                for (let index = 0; index < totalItem; index++) {
                    calls.push({
                        address: getAddress(contracts.runMarketplace),
                        name: 'saleItems',
                        params: [index]
                    })
                }
                
                const result = await multicall(RunMarketplace, calls);
                for( let index = 0;index < result.length;index++){
                    if( result[index].isSold === false ) {
                        listId.push(parseInt(result[index].nftId))
                        listSell.push(result[index])
                    }
                }
                setOnSell(listId)
                setListSell(listSell)
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            getListOnSell()
        }
      }, [account, totalItem, fastRefresh])

    return { listOnSell, listNft }
}
export const GetBoxType = (listNftId) => {
    const [ listBoxType, setListBoxType ] = useState([])
    const { account } = useWeb3React()
    useEffect(() => {
        const getListBoxType = async () => {
            const listId = []
            try {
                const calls = [];
                for (let index = 0; index < listNftId.length; index++) {
                    calls.push({
                        address: getAddress(tokens.RunTogetherBox.address),
                        name: 'getBoxType',
                        params: [listNftId[index]]
                    })
                }
                const result = await multicall(RunTogetherBox, calls);
                for( let index = 0;index < result.length;index++){
                    listId.push(result[index].toString())
                }
                setListBoxType(listId)
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            getListBoxType()
        }
      }, [account, listNftId])

    return { listBoxType }
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
export const GetSimpleSellItem = (saleId, requestedBuy) => {
    const [ sellItems, setSellItems ] = useState([])
    useEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.runMarketplace),
                        name: 'saleItems',
                        params: [saleId]
                    }
                ]
                const result = await multicall(RunMarketplace, calls);
                setSellItems(result)
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (saleId) {
            getSimpleSellIetms()
        }
      }, [saleId, requestedBuy])

    return { sellItems }
}
export const FetchDataUser = (requestedApproval) => {
    const [ dataBalance, setDataBalance ] = useState({
        balanceOf:0,
        isApprove:0
    })
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
                {
                    address: getAddress(tokens.Run.address),
                    name: 'allowance',
                    params: [account, getAddress(contracts.runMarketplace)]
                },
             ]
            const [ resultBalance, requestedApprove ] = await multicall(erc20ABI, calls)
           
            setDataBalance({
                balanceOf:Number(new BigNumber(resultBalance).toJSON())/1E18,
                isApprove:Number(new BigNumber(requestedApprove).toJSON())
            })
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, requestedApproval])
    return { dataBalance }
}
export const GetListOnsale = () => {
    const [ listOnSale, setListOnSale ] = useState([])
    useEffect(() => {
        const fetchOnSale = async () =>{
          try {
            const {data: response} = await axios.get(`${BASE_URL_LISTONSALE}`);
            setListOnSale(response.result);
          } catch (error) {
            console.error(error);
          }
        }
        fetchOnSale();
      }, []);
 
    return { listOnSale }
}
export const GetTokenBalance = (tokensAddress) => {
    const [ tokenBalance, setTokenBalce ] = useState(0)
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const calls = [
                {
                  address: getAddress(tokensAddress),
                  name: 'balanceOf',
                  params: [account]
                },
             ]
            const result = await multicall(erc20ABI, calls)
            setTokenBalce(Number(new BigNumber(result).toJSON())/1E18)
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, tokensAddress, fastRefresh])
  
    return { tokenBalance }
}