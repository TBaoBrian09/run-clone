import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import ltdMarketplaceABI from 'config/abi/LTDMarketplace.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import contract from 'config/constants/contracts'
import useRefresh from './useRefresh'


export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export async function getSaleItemById (id) {
    const calls = [{
        address: getAddress(contract.ltdMarketplace),
        name: 'saleItems',
        params: [id]
    }]

    const result = await multicall(ltdMarketplaceABI, calls);
    return result ? result[0] : null;
}

export const useSaleItemById = (id) => {
  
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [saleObject, setSaleObject] = useState(null)


  useEffect(() => {
    const fetchSaleItem = async () => {
      try {
        if (id < 0) {
          setSaleObject(null)
        } else {
          console.log(id)
          const result = await getSaleItemById(id);
          setSaleObject(result)
        }
        setFetchStatus(FetchStatus.SUCCESS)
      } catch (e) {
        console.log(e)
        setFetchStatus(FetchStatus.FAILED)
      }
    }
    fetchSaleItem();
  }, [id, setFetchStatus])

  return { saleObject , fetchStatus}
}

export const useCountSaleItem = () => {
  
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [totalSaleItems, setLiveSaleItems] = useState(0)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchSaleItem = async () => {
      try {
        const calls = [{
          address: getAddress(contract.ltdMarketplace),
          name: 'saleItemsCount'
        }
      ]
  
        const [saleItemsCount ] = await multicall(ltdMarketplaceABI, calls);
        const resultNumber = new BigNumber(saleItemsCount.toString()).toNumber();
        setLiveSaleItems(resultNumber)
        setFetchStatus(FetchStatus.SUCCESS)
      } catch (e) {
        console.log(e)
        setFetchStatus(FetchStatus.FAILED)
      }
    }
    fetchSaleItem();
  }, [slowRefresh, setFetchStatus])

  return { totalSaleItems , fetchStatus}
}