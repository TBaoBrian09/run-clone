import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useMysteryBoxContract } from 'hooks/useContract'

export const useBuy = (amount, onRefresh) => {
  const { t } = useTranslation();
  const [ requestedBuy, setRequestBuy ] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { callWithGasPrice } = useCallWithGasPrice();
  const [ isClose, setClose ] = useState(false);  
  const mysteryBoxContract = useMysteryBoxContract(getAddress(contract.mysteryBox));
  const [ pendingBuy, setPendingBuy ] = useState(false)
  const handleBuy = useCallback(async () => {
    setPendingBuy(true)
    try {
      const tx = await callWithGasPrice(mysteryBoxContract, 'buyBox', [amount]);
      const receipt = await tx.wait();

      if (receipt.status) {
        toastSuccess(
          t('Successfully purchase'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setClose(true);
        setRequestBuy(false);
        onRefresh(Date.now());
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestBuy(false);
        
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'));
    } finally {
      setPendingBuy(false);
    }
  }, [
    amount,
    mysteryBoxContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingBuy,
    onRefresh
  ]);
 

  return { handleBuy, requestedBuy, pendingBuy, isClose }
}
