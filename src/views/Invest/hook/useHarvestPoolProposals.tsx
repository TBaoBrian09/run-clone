import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { usePoolProposalsContract } from 'hooks/useContract'

export const useHavest = (contractAddress, amount, useAddress, onRefresh) => {
  const [requestedHarvest, setRequestedHarvest] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const poolProposalsContract = usePoolProposalsContract(contractAddress)
  const [ pendingHarvestd, setPendingHarvestd ] = useState(false)
  const convertAmout = new BigNumber((amount*1E18).toString()).toString();
  const handleHarvest = useCallback(async () => {
    setPendingHarvestd(true)
    try {
      
      const tx = await callWithGasPrice(poolProposalsContract, 'withdraw', [0, useAddress])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful Harvest'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedHarvest(true)
        setPendingHarvestd(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedHarvest(false)
        setPendingHarvestd(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingHarvestd(false)
    }
  }, [
    poolProposalsContract,
    useAddress,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingHarvestd,
    onRefresh
  ])

  return { handleHarvest, requestedHarvest, pendingHarvestd }
}
