import React, { useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useRunMarketplaceContract } from 'hooks/useContract'

export const useSell = (nftAddress, nftId, price, currencyAddress) => {
  const [requestedSell, setRequestSell] = useState(false)
  const [ isClose, setClose ] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const [pendingSell, setPenddingSell] = useState(false)
  const marketplaceContract = useRunMarketplaceContract(getAddress(contract.runMarketplace));
  
  const nftContractAddress = getAddress(nftAddress)
  const currencyContractAddress = getAddress(currencyAddress)
  const priceListing = new BigNumber((price*1E18).toString()).toString();
  const handleSell = useCallback(async () => {
    setPenddingSell(true)
    try {
      const tx = await callWithGasPrice(marketplaceContract, 'sellItem', [nftContractAddress, nftId, priceListing, currencyContractAddress])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful sell'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestSell(true)
        setClose(true)
      } else {
        // user rejected tx or didn't go thru
        
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestSell(false)
        
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      
    } finally {
      setPenddingSell(false)
    }
  }, [
    nftContractAddress, nftId, priceListing, currencyContractAddress,
    marketplaceContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
  ])
 

  return { handleSell, requestedSell, pendingSell, isClose }
}
