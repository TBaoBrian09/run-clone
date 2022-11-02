import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useRunMarketplaceContract } from 'hooks/useContract'

export const useBuy = (saleId) => {
  const [requestedBuy, setRequestBuy] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [ isClose, setClose ] = useState(false)
  const { t } = useTranslation()
  const marketplaceContract = useRunMarketplaceContract(getAddress(contract.runMarketplace));
  const [ pendingBuy, setPendingBuy ] = useState(false)
  const handleBuy = useCallback(async () => {
    setPendingBuy(true)
    try {
      const tx = await callWithGasPrice(marketplaceContract, 'buyItem', [saleId])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successfully purchase'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setClose(true)
        setRequestBuy(true)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestBuy(false)
        
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingBuy(false)
    }
  }, [
    saleId,
    marketplaceContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingBuy
  ])
 

  return { handleBuy, requestedBuy, pendingBuy, isClose }
}
