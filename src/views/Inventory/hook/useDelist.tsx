import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contracts from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useRunMarketplaceContract } from 'hooks/useContract'

export const useDelist = (saleIndex, onRefresh) => {
  const [requestedDelist, setRequested] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const [ isClose, setClose ] = useState(false)
  const marketplaceContract = useRunMarketplaceContract(getAddress(contracts.runMarketplace));
  const [pendingDelist, setPendingTx] = useState(false)
  const handleDelist = useCallback(async () => {
    setPendingTx(true)
    try {
      const tx = 	await callWithGasPrice(marketplaceContract, 'delistItem', [saleIndex])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful delisting'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequested(true)
        setClose(true)
        onRefresh(true)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequested(false)
        setPendingTx(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    } finally {
        setPendingTx(false)
    }
  }, [
    marketplaceContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    saleIndex,
    onRefresh
  ])

  return { handleDelist, requestedDelist, pendingDelist, isClose }
}
