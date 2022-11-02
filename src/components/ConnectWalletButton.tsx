import React from 'react'
import { useWalletModal, useModal, Button } from '@phamphu19498/runtogether-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <CsButton onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </CsButton>
  )
}

export default ConnectWalletButton

const CsButton = styled(Button)`
  padding: 12px 16px;
  border-radius: 90px;
  width: 161px;
  height: 42px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #23262f;
  background: #fcfcfd;
  border: 2px solid #e6e8ec;
  box-shadow: none;

  @media screen and (max-width: 320px) {
    width: 130px;
    font-size: 12px;
    padding: 12px 0px;
  }
`
