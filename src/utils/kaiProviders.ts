import { ethers } from 'ethers'
import { KAI_RPC_ENDPOINT } from 'config/index'

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(KAI_RPC_ENDPOINT)
export default null
