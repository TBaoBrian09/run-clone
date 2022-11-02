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
import { BASE_URL_LISTONSALE, BASE_URL_INWALLET, X_API_KEY } from "config";

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
                    if(result[index].seller === account && result[index].isSold === false ) {
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
export const ChekcSellerWhitelist = () => {
    const [ isWhitelist, setWhitelise ] = useState(false)
    const { account } = useWeb3React()
    useEffect(() => {
        const checkWhitelist = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.runMarketplace),
                        name: 'sellerListMap',
                        params: [account]
                    }
                ]
                const [result] = await multicall(RunMarketplace, calls);
                setWhitelise(result[0])
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (account) {
            checkWhitelist()
        }
      }, [account])

    return { isWhitelist }
}

export const GetListOnsale = () => {
    const [ listOnSale, setListOnSale ] = useState([])
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        const fetchOnSale = async () =>{
          try {
            const {data: response} = await axios.get(`${BASE_URL_LISTONSALE}`);
            setListOnSale(response.result.filter(d=> d.seller.toUpperCase() === account.toUpperCase()));
          } catch (error) {
            console.error(error);
          }
        }
        if ( account ) {
            fetchOnSale();
        }
      }, [account, fastRefresh]);
    return { listOnSale }
}
export const GetListInwallet = () => {
    const [ listInwallet, setListInwallet ] = useState([])
    const { account } = useWeb3React()
    useEffect(() => {
        const fetchOnWallet = async () =>{
          try {
            const {data: response} = await axios.get(`${BASE_URL_INWALLET}?wallet=${account}`);
            setListInwallet(response.result);
          } catch (error) {
            console.error(error);
          }
        }
        if ( account ) {
            fetchOnWallet();
        }
      }, [account]);

    return { listInwallet }
}
export const GetAllNftByCurl = () => {
    const [ ListNft, setListNft ] = useState([])
    const [ listNftId, setListNftId ] = useState([])
    const { account } = useWeb3React()
    const NftAdress = getAddress(tokens.RunTogetherBox.address)
    const chainId = getAddress(contracts.bscChainId)
    useEffect(() => {
        const fetchOnWallet = async () =>{
        const objId = []
          try {
            const {data: response} = await axios({
                method: 'GET',
                url: `https://deep-index.moralis.io/api/v2/nft/${NftAdress}/owners?chain=${chainId}&format=decimal`,
                headers: {
                    "X-API-Key": X_API_KEY
                }
            });
            const filterData = response.result.filter(d=> d.owner_of.toUpperCase() === account.toUpperCase())
            setListNft(filterData);
            for ( let index=0;index<filterData.length;index++){
                objId.push(filterData[index].token_id)
            }
            setListNftId(objId)
          } catch (error) {
            console.error(error);
          }
        }
        if ( account ) {
            fetchOnWallet();
        }
      }, [account, NftAdress, chainId]);

    return { ListNft, listNftId }
}