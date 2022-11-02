import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useRunMarketplaceContract } from 'hooks/useContract'

export const useChangePrice = (saleIndex, salePrice) => {
    const [requested, setRequested] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
    const { t } = useTranslation()
    const marketplaceContract = useRunMarketplaceContract(getAddress(contract.runMarketplace));
    const [pendingTx, setPendingTx] = useState(false)
    const [isClose, setClose] = useState(false)
    
    const handleChangePrice = useCallback(async () => {
        setPendingTx(true)
    try {
      setRequested(true)
      const tx = 	await callWithGasPrice(marketplaceContract, 'updateItemPrice', [saleIndex, salePrice])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successfully'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You have changed the selling price of NFT')}
          </ToastDescriptionWithTx>,
        )
        setRequested(false)
        setClose(true)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequested(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally{
        setPendingTx(false)
    }
  }, [
    marketplaceContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    saleIndex,
    salePrice,
  ])

  return { handleChangePrice, requested, pendingTx, isClose }
}
