import React from 'react'
import { useWalletModal, useModal, Button } from '@phamphu19498/runtogether-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const ConnectWalletButtonFarms = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <CsButton onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </CsButton>
  )
}

export default ConnectWalletButtonFarms

const CsButton = styled(Button)`
  padding: 24px 16px;
  border-radius: 90px;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  background: #FF592C;
  border: 2px solid #e6e8ec;
  box-shadow: none;
`
