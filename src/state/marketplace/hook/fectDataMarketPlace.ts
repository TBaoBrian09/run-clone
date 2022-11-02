import React from "react";
import BigNumber from "bignumber.js";
import tokens from "config/constants/tokens";
import multicall from "utils/multicall";
import runNftAbi from "config/abi/RunTogetherBox.json"
import { getAddress } from "utils/addressHelpers";
import contracts from "config/constants/contracts";
import RunMarketplace from "config/abi/RunMarketplace.json"
import { TokenIdsProps, NftInfoProps, TotalSellProps, SellListProps, ListSellItemsProps } from "../type"

type BalanceProps = {
    balance: number
}


export const fetchBalanceNft = async (account:string): Promise<BalanceProps> => {
   try {
        const calls = [
          {
            address: getAddress(tokens.RunTogetherBox.address),
            name: 'balanceOf',
            params: [account]
          }
        ]
        const result = await multicall(runNftAbi, calls)
        const resultNumber = new BigNumber(result.toString()).toNumber();
        return {
          balance: resultNumber
        } 
      } catch (e) {
        console.log(e)
        return {
          balance: 0
        } 
      }
}

export const fetchTokensId = async (account:string, balance:number): Promise<TokenIdsProps> => {
    try {
      const listId = []
      const calls = [];
      for (let index = 0; index < balance; index++) {
          calls.push({
              address: getAddress(tokens.RunTogetherBox.address),
              name: 'tokenOfOwnerByIndex',
              params: [account, index]
          })
      }
      const result = await multicall(runNftAbi, calls);
      for( let index = 0;index < result.length;index++){
          listId.push(parseInt(result[index].toString()))
      }
      return {
        tokenIds:listId
      }
  }
  catch(error) {
      console.log(error)
      return {
        tokenIds:[]
      }
  }
}
export const fetchBoxType = async (listNftId:any): Promise<NftInfoProps> => {
  try {
    const calls = [];
      for (let index = 0; index < listNftId.length; index++) {
          calls.push({
              address: getAddress(tokens.RunTogetherBox.address),
              name: 'getBoxType',
              params: [listNftId[index]]
          })
      }
    const result = await multicall(runNftAbi, calls);
    const mergeData = result.map((item, i) => {
      return { nftId:listNftId[i], nftType: parseInt(item.toString()) }
    })
    return {
      nftInfo:mergeData
    }
  }
  catch(error) {
      console.log(error)
      return {
        nftInfo:[]
      }
  }
}
export const fetchTotalSell = async (): Promise<TotalSellProps> => {
    try {
      const calls = [
            {
              address: getAddress(contracts.runMarketplace),
              name: 'saleItemsCount',
              params: []
            }
          ]
          const [result] = await multicall(RunMarketplace, calls)
          return {
            totalSell: Number(new BigNumber(result).toJSON())
          }
    }
    catch(error) {
      console.log(error)
      return {
        totalSell: 0
      }
    }
}

export const fetchItemsSellByUser = async (totalSellItems:number, account:string|undefined): Promise<SellListProps> => {
  try {
    const calls = [];
      for (let index = 0; index < totalSellItems; index++) {
          calls.push({
              address: getAddress(contracts.runMarketplace),
              name: 'saleItems',
              params: [index]
          })
      }
    const result = await multicall(RunMarketplace, calls);
    const filterData = result.filter(data=> data.seller.toUpperCase() === account.toUpperCase() && data.isSold === false )
    const data = filterData.map((item, i) => {
      return { 
        saleId: Number(item.saleId.toString()),
        nftId: Number(item.nftId.toString()),
        priceListing: new BigNumber(item.priceListing.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber(),
        isSold:item.isSold,
        seller:item.seller,
        buyer:item.buyer,
        currency:item.currency,
        nft:item.nft,
        boxType:new BigNumber(item.boxType.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()*1E18,
        adminSale:item.adminSale
       }
    })
    return {
      listItemsSell:data
    }
  }
  catch(error) {
      console.log(error)
      return {
        listItemsSell:[]
      }
  }
}

export const fetchItemsSell = async (totalSellItems:number): Promise<ListSellItemsProps> => {
  try {
    const calls = [];
      for (let index = 0; index < totalSellItems; index++) {
          calls.push({
              address: getAddress(contracts.runMarketplace),
              name: 'saleItems',
              params: [index]
          })
      }
    const result = await multicall(RunMarketplace, calls);
    const filterData = result.filter(data=> data.isSold === false )
    const data = filterData.map((item, i) => {
      return { 
        saleId: Number(new BigNumber(item.saleId.toString())),
        nftId: item.nftId.toString(),
        priceListing: new BigNumber(item.priceListing.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber(),
        isSold:item.isSold,
        seller:item.seller,
        buyer:item.buyer,
        currency:item.currency,
        nft:item.nft,
        boxType:new BigNumber(item.boxType.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()*1E18,
        adminSale:item.adminSale
       }
    })
    return {
      listItems:data
    }
  }
  catch(error) {
      console.log(error)
      return {
        listItems:[]
      }
  }
}