import { Button } from 'components/Pancake-uikit'
import { useWalletModal } from '@phamphu19498/runtogether-uikit'
import useAuth from 'hooks/useAuth'
import React from 'react'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      Unlock Wallet
    </Button>
  )
}

export default UnlockButton
