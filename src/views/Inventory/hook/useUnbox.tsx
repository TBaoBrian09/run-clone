import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useMysteryBoxContract } from 'hooks/useContract'
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from 'react-redux'
import { AppDispatch } from "state/index"
import { fetchBalanceNft } from 'state/marketplace/hook/fectDataMarketPlace';
import { fetchBalance } from "state/marketplace/actions"
import { FetchDataRunBoxIsOpen } from 'state/inventory/hook/fetchDataMysteryBox'

export const useUnboxMystery = (nftId, onRefresh) => {
    const [ requested, setRequested ] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const mysteryBoxContract = useMysteryBoxContract(getAddress(contract.mysteryBox)) 
    const [ pendingTx, setPendingTx ] = useState(false)
    const [ isClose, setClose ] = useState(false)
    const { dataBox } = FetchDataRunBoxIsOpen(nftId);
    const dispatch = useDispatch<AppDispatch>()
    const handleUnboxMystery = useCallback(async () => {
        setPendingTx(true)
        try {
            const tx = 	await callWithGasPrice(mysteryBoxContract, 'openBox', [nftId])
            const receipt = await tx.wait()
            if (receipt.status) { 
                toastSuccess(
                    t('Successfully'),
                    <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                        {t('You successfully open mystery box, please check your items')}
                    </ToastDescriptionWithTx>,
                )               
                setRequested(true)
                setClose(true)   
                onRefresh(Date.now())
            } else {
                // user rejected tx or didn't go thru
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setRequested(false)
            }
        } catch (e) {
            console.error(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        } finally{
            setPendingTx(false);   
            try {
                const result = await fetchBalanceNft(account)
                dispatch(fetchBalance(result))                
            } catch (e) {
                console.log(e)
            }
        }
    }, [
        mysteryBoxContract,
        t,
        toastError,
        toastSuccess,
        callWithGasPrice,
        dispatch,
        account,
        nftId,
        onRefresh
    ])

    return { handleUnboxMystery, requested, pendingTx, isClose, dataBox }
}
