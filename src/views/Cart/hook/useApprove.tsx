import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import { fetchAllowanceMarketMultiBuy } from 'state/multiBuyBox/fetchData'
import { fetchDataUser } from "state/multiBuyBox/actions"
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'

export const useApprove = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const tokenContract = useERC20(getAddress(tokens.busd.address))
  const marketMultiContract = getAddress(contract.runMarketplaceMultiByBox)
  const [ pendingTx, setPendingTx ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleApprove = useCallback(async () => {
    setPendingTx(true)
    try {
      
      const tx = await callWithGasPrice(tokenContract, 'approve', [marketMultiContract, ethers.constants.MaxUint256])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproval(true)
        setPendingTx(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
        setPendingTx(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    } finally {
      setPendingTx(false)
      try {
          const result = await fetchAllowanceMarketMultiBuy(account)
          dispatch(fetchDataUser(result))
      } catch (e) {
          console.log(e)
      }
    }
  }, [
    tokenContract,
    marketMultiContract,
    account,
    dispatch,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingTx,
  ])

  return { handleApprove, requestedApproval, pendingTx }
}
