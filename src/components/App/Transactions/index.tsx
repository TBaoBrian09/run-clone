import React from 'react'
import { HistoryIcon, useModal } from '@phamphu19498/runtogether-uikit'
import { Button } from 'components/Pancake-uikit'
import useTheme from 'hooks/useTheme'
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const { theme } = useTheme()
  return (
    <>
      <Button variant="text" p={0} onClick={onPresentTransactionsModal} ml="16px">
        <HistoryIcon color={theme.isDark ? 'textSubtle' : '#101133'} width="24px" />
      </Button>
    </>
  )
}

export default Transactions
