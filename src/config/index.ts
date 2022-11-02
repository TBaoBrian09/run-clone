import { ChainId } from '@pancakeswap/sdk'
import BigNumber from "bignumber.js/bignumber"
import { BIG_TEN } from 'utils/bigNumber'



BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com',
}

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)
const id = process.env.REACT_APP_CHAIN_ID
export const CAKE_PER_BLOCK = new BigNumber(0.07)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = ''
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_URL}/pool`
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]
export const BASE_BSC_URL = BASE_BSC_SCAN_URLS[process.env.REACT_APP_CHAIN_ID]
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const TRANDING_FEE = 3
export const TRANSFER_FEE = 5
export const LINK_BOX_RUNGTOGETHER = "https://runtogether-s3.s3.ap-southeast-1.amazonaws.com"
export const BASE_URL_LISTONSALE = "https://cpp6fapx3xvw.usemoralis.com:2053/server/functions/EventSales"
export const BASE_URL_INWALLET = "https://5s3iedtqrrh1.usemoralis.com:2053/server/functions/BalanceNFT"
export const X_API_KEY = "bs3KPqselIh2JpCMX9EyS3ey0QwhNCwLCuLjk62EjKfH3hzuSGq7Ae4ODXtTsaiq"
export const BASE_URL_NFT_MARKETPLACE = "https://esirlcnqosl6.usemoralis.com:2053/server/functions/EventSales"
export const GET_NFT_BALANCE = "https://deep-index.moralis.io/api/v2/nft"
export const GET_NFT_BALANCE_OWNER = "https://deep-index.moralis.io/api/v2"
export const URL = process.env.REACT_APP_API_AUTH
export const startTimeStake = 1662469200000
export const LIMIT_VOTING = 100
export const MIN_CREATE_VOTING_PROPOSALS = 1000000
export const URL_SNAPSHORT_VOTING ="https://f94oec9qww0r.usemoralis.com:2053/server/functions/StakeToVote?"
export const MIN_OPEN_POOL_STORE = 2500000
export const AMOUNT_FULL_POOL = "2500000"
export const APIKEY = "UEZWF2A6BISXQRNTP1G33VGQAXU7IB3WNJ"

export const KAI_RPC_ENDPOINT = 'https://rpc.kardiachain.io'