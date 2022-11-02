import { MenuEntry } from 'components/Pancake-uikit'
import { ContextApi } from 'contexts/Localization/types'
import { MenuItemsType } from '@phamphu19498/runtogether-uikit';
import { Colors } from "../Pancake-uikit/theme/types";

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}

export const status = {
  LIVE: <LinkStatus>{
    text: "LIVE",
    color: "failure",
  },
  SOON: <LinkStatus>{
    text: "Coming",
    color: "warning",
  },
  NEW: <LinkStatus>{
    text: "NEW",
    color: "success",
  },
};

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

export const configIsConnect: (t: ContextApi['t']) => MenuItemsType[] = (t) => [
  {
    label: t('Marketplace'),
    icon: 'Marketplace',
    href: '/marketplace',
    isBottomNav:false,
    showItemsOnMobile:true,
    items: [ 
      {
        label: t('Marketplace'),
        href: '/marketplace',
      },
      {
        label: t('Mystery Box'),
        href: '/mysterybox',
      }
    ]
  },
  {
    label: t('Account'),
    icon: 'Account',
    href: '/account',
    isBottomNav:false,
    showItemsOnMobile:true,
    items: [
      {
        label: t('My Balance'),
        href: '/mybalance',
      },
      {
        label: t('Inventory'),
        href: '/inventory/0',
      },
      {
        label: t('Account'),
        href: '/account',
      },
    ]
  },
  {
    label: t('Earn'),
    icon: 'Earn',
    href: '/farms',
    isBottomNav:false,
    showItemsOnMobile:true,
    items: [
      {
        label: t('Invest Together'),
        href: '/investtogether',
      },
      {
        label: t('Pawn NFT'),
        href: 'https://dapp.bami.money/pawn',
        type:1
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
      {
        label: t('Farms'),
        href: '/farms',
      },
    ]
  },
  {
    label: t('Partners'),
    icon: 'Partner',
    href: '/mypartner',
    isBottomNav:false,
    showItemsOnMobile:false,
    items: [
      {
        label: t('Partners'),
        href: '/mypartner',
      },
    ]
  },
  {
    label: t('Exchange'),
    icon: 'ExChange',
    href: '/swap',
    isBottomNav:false,
    showItemsOnMobile:true,
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ]
  },
]

export const configDisconnect: (t: ContextApi['t']) => MenuItemsType[] = (t) => [
  {
    label: t('Marketplace'),
    icon: 'Marketplace',
    href: '/marketplace',
    isBottomNav:false,
    showItemsOnMobile:false,
    items: [ 
     
    ]
  },
  {
    label: t('Inventory'),
    icon: 'Account',
    href: '/inventory/0',
    isBottomNav:false,
    showItemsOnMobile:false,
    items: [
      {
        label: t('Inventory'),
        href: '/inventory/0',
      },
    ]
  },
  {
    label: t('Earn'),
    icon: 'Earn',
    href: '/farms',
    isBottomNav:false,
    showItemsOnMobile:true,
    items: [
      {
        label: t('Invest Together'),
        href: '/investtogether',
      },
      {
        label: t('Pawn NFT'),
        href: '/pawnnft',
      },
      {
        label: t('Pool'),
        href: '/pools',
      },
      {
        label: t('Farm'),
        href: '/farms',
      },
    ]
  },
]


export const dataRegisterLink = [
  {
    title: '',
    href: ''
  },
  {
    title: '',
    href: ''
  }
]

// export default configIsConnect 
