import React, { useMemo, useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import { Modal, ModalBody, Text, Flex, InjectedModalProps, Button } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { AppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'
import styled from 'styled-components'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function renderTransactions(transactions: TransactionDetails[]) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} />
      })}
    </Flex>
  )
}
const CustomModal = styled(Modal)`
 padding:40px 35px;
 @media (max-width:600px){
    padding:40px 0 10px!important;
 }

` 


const TransactionsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const allTransactions = useAllTransactions()

  const { t } = useTranslation()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt)

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <CustomModal title={t('Recent Transactions')} headerBackground="transparent" onDismiss={onDismiss}>
      {account && (
        <ModalBody>
          {!!pending.length || !!confirmed.length ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between',display:'flex'}}>
                <Text>{t('Recent Transactions')}</Text>
                <Button style={{color:'#FF592C'}} variant="text" scale="md" onClick={clearAllTransactionsCallback}>
                  {t('Clear all')}
                </Button>
              </AutoRow>
              {renderTransactions(pending)}
              {renderTransactions(confirmed)}
            </>
          ) : (
            <Text color="text" textAlign='center'>{t('No recent transactions')}</Text>
          )}
        </ModalBody>
      )}
    </CustomModal>
  )
}

export default TransactionsModal
