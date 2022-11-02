import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  Flex,
  LogoutIcon,
  UserMenu as UIKitUserMenu,
  UserMenuItem,
  useModal
} from 'components/Pancake-uikit'
import { useHistory } from 'react-router';
import useAuth from 'hooks/useAuth'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'



const UserMenu = () => {
  const { t } = useTranslation()
  const history = useHistory();
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const avatarSrc =  undefined
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)
  
  const MovetoAdminBox = () => {
    history.push(`/adminstrator`)
  }
  const MovetoYourNFts = () => {
    history.push(`/mynfts`)
  }
  if (!account) {
    return (
        <ConnectWalletButton scale="sm" />
    )
  }

  return (
    <UIKitUserMenu account={account} avatarSrc={avatarSrc}>
      {/* <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} /> */}
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
        </Flex>
      </UserMenuItem>
    </UIKitUserMenu>
  )
}

export default UserMenu
