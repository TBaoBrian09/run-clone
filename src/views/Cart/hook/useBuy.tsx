import { useWeb3React } from '@web3-react/core'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { useTranslation } from 'contexts/Localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useMarketMultiBuy } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchBalanceNftInMarket, selectAmountMetaRace, selectAmountMetaRich, selectAmountMetaRun, selectAmountMetaRush } from 'state/multiBuyBox/actions'
import { fetchBalanceNftInMarkeMultiBuy } from 'state/multiBuyBox/fetchData'
import { getAddress } from 'utils/addressHelpers'

export const useBuy = (listItems, onRefresh) => {
  const [requestedBuy, setRequestedBuy] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const marketMultiContract = useMarketMultiBuy(getAddress(contract.runMarketplaceMultiByBox))
  const [ pendingBuy, setPendingBuy ] = useState(false)
  useEffect(()=>{
    setPendingBuy(false)
  },[account])
  const dispatch = useDispatch<AppDispatch>()
  const handleBuy = useCallback(async () => {
    setPendingBuy(true)
    try {
      const tx = await callWithGasPrice(marketMultiContract, 'buyItem', [listItems])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
            t('Successfully purchase'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedBuy(true)
        onRefresh(Date.now())
        setPendingBuy(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedBuy(false)
        setPendingBuy(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingBuy(false)
    } finally {
        
        try {
            const resultBoxOfMarket = await fetchBalanceNftInMarkeMultiBuy() 
            dispatch(fetchBalanceNftInMarket(resultBoxOfMarket))
            dispatch(selectAmountMetaRush({totalMetaRush:0}))
            dispatch(selectAmountMetaRun({totalMetaRun:0}))
            dispatch(selectAmountMetaRace({totalMetaRace:0}))
            dispatch(selectAmountMetaRich({totalMetaRich:0}))
            
        } catch (e) {
            console.log(e)
        }
    }
  }, [
    marketMultiContract,
    dispatch,
    listItems,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingBuy,
    onRefresh
  ])
 

  return { handleBuy, requestedBuy, pendingBuy }
}
