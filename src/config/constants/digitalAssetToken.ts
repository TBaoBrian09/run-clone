import { ChainId } from '@pancakeswap/sdk'
import { AssetToken } from './types'
import tokens  from './tokens'

const digitalAssetToken: AssetToken[] = [
    {
      "name": "Binance Pegged BUSD",
      "symbol": "BUSD",
      "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      "chainId": 56,
      "decimals": 18,
      "logoURI": "https://tokens.pancakeswap.finance/images/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
    },
    {
      "name": "Binance Pegged USDT",
      "symbol": "USDT",
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "chainId": 56,
      "decimals": 18,
      "logoURI": "https://tokens.pancakeswap.finance/images/0x55d398326f99059fF775485246999027B3197955.png"
    },
    {
      "name": "LiveTrade",
      "symbol": "LTD",
      "address": "0xdbad544416df0677254645422bb560af8408cae7",
      "chainId": 56,
      "decimals": 18,
      "logoURI": "/images/coins/0xdbad544416df0677254645422bb560af8408cae7.svg"
    },
    {
      "name": "Bami",
      "symbol": "BAMI",
      "address": "0xe2d3486f46EFBd4199ea087E9e466dCC35EE0248",
      "chainId": 56,
      "decimals": 18,
      "logoURI": "/images/coins/0xe2d3486f46efbd4199ea087e9e466dcc35ee0248.png"
    },
    {
      "name": "HeroesTD",
      "symbol": "HTD",
      "address": "0x5E2689412Fae5c29BD575fbe1d5C1CD1e0622A8f",
      "chainId": 56,
      "decimals": 18,
      "logoURI": "/images/tokens/0x5E2689412Fae5c29BD575fbe1d5C1CD1e0622A8f.png"
    }
]

export const bnbCoin = {
  symbol: 'BNB',
  address: tokens.wbnb.address[ChainId.MAINNET],
  name: 'BNB',
  decimals: tokens.wbnb.decimals,
  logoURI: 'https://tokens.pancakeswap.finance/images/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png'
}

export default digitalAssetToken;