import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useMarketMultiBuy } from 'hooks/useContract'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchTotalBoxOfUser, fetchUserBuyBox } from 'state/multiBuyBox/fetchData'
import { fetchAMountListBoxByUser, fetchTotalBoxofUserBuy } from 'state/multiBuyBox/actions'

export const useClaimNft = () => {
  const [requestedClaimNft, setRequestedClaimNft] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const marketMultiContract = useMarketMultiBuy(getAddress(contract.runMarketplaceMultiByBox))
  const [ pendingClaimNft, setPendingClaimNft ] = useState(false)
  
  const dispatch = useDispatch<AppDispatch>()
  const handleClaimNft = useCallback(async () => {
    setPendingClaimNft(true)
    try {
      const tx = await callWithGasPrice(marketMultiContract, 'claimItem', [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
            t('Successfully Claim'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedClaimNft(true)
        setPendingClaimNft(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedClaimNft(false)
        setPendingClaimNft(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingClaimNft(false)
    } finally {
        setPendingClaimNft(false)
        try {
            const resultUserBuyBox = await fetchUserBuyBox(account)
            dispatch(fetchAMountListBoxByUser(resultUserBuyBox))
            const result = await fetchTotalBoxOfUser(account)
            dispatch(fetchTotalBoxofUserBuy(result))
        } catch (e) {
            console.log(e)
        }
    }
  }, [
    marketMultiContract,
    account, 
    dispatch,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingClaimNft,
  ])

  return { handleClaimNft, requestedClaimNft, pendingClaimNft }
}
