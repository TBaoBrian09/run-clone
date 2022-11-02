import React, { useState } from 'react'
import {
  ButtonMenu,
  ButtonMenuItem,
  CloseIcon,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
} from '@phamphu19498/runtogether-uikit'
import { Heading } from 'components/Pancake-uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
}

interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}

export const LOW_BNB_BALANCE = new BigNumber('2000000000') // 2 Gwei

const styleActive = { borderBottom: '3px solid #49A2F2', color: '#49A2F2', background: 'transparent' }

const CustomModalContainer = styled(ModalContainer)`
 padding: 60px 32px 50px 32px;
`
 
const ModalHeader = styled(UIKitModalHeader)`
  background: ${({ theme }) => theme.colors.modalHeaderWhite};
`

const Tabs = styled.div`
  padding: 16px 24px;
`
const CustomButtonMenuItem = styled(ButtonMenuItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 112px;
  border-radius: 0px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: 600px) {
    width: 100px;
  }
`
const CustomButtonMenu = styled(ButtonMenu)`
  background: ${({ theme }) => theme.colors.background};
  @media only screen and (max-width: 600px) {
    margin-left: -1rem;
  }
`

const CustomIconButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #22252d;
  width: 40px;
  height: 40px;
  border-radius: 48px;
`

const CsCloseIcon = styled(CloseIcon)`
  fill: #FCFCF9;
`

const WalletModal: React.FC<WalletModalProps> = ({ initialView = WalletView.WALLET_INFO, onDismiss }) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  return (
    <CustomModalContainer position='relative' maxWidth="550px" minWidth="340px">
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('Your Wallet')}</Heading>
        </ModalTitle>
        <CustomIconButton variant="text" onClick={onDismiss}>
          <CsCloseIcon width="24px" color="whiteColor" />
        </CustomIconButton>
      </ModalHeader>
      <Tabs>
        <CustomButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
          <CustomButtonMenuItem style={view === WalletView.WALLET_INFO ? styleActive : undefined}>
            {t('Wallet')}
          </CustomButtonMenuItem>
          <CustomButtonMenuItem style={view === WalletView.TRANSACTIONS ? styleActive : undefined}>
            {t('Transactions')}
          </CustomButtonMenuItem>
        </CustomButtonMenu>
      </Tabs>
      <ModalBody p="24px" maxWidth="400px" width="100%">
        {view === WalletView.WALLET_INFO && <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />}
        {view === WalletView.TRANSACTIONS && <WalletTransactions />}
      </ModalBody>
    </CustomModalContainer>
  )
}

export default WalletModal
