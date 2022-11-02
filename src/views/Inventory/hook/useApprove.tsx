import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useBounty, useRunTogether } from 'hooks/useContract'

export const useApproveForAll = () => {
  const [requestedApprovalForAll, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const marketPlace = getAddress(contract.runMarketplace)
  const runContract = useRunTogether(getAddress(tokens.RunTogetherBox.address)) 
  const [pendingForAll, setPendingTx] = useState(false)

  const handleApproveForAll = useCallback(async () => {
    setPendingTx(true)
    try {
      setRequestedApproval(true)
      const tx = 	await callWithGasPrice(runContract, 'setApprovalForAll', [marketPlace, 'true'])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally{
        setPendingTx(false)
    }
  }, [
    runContract,
    marketPlace,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
  ])

  return { handleApproveForAll, requestedApprovalForAll, pendingForAll }
}
