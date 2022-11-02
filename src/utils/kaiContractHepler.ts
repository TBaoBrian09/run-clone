import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/kaiProviders'
import erc20abi from 'config/abi/erc20.json'

const getContract = (abi: any, address: string) => {
    return new ethers.Contract(address, abi, simpleRpcProvider)
}

export const getKrc20Contract = (tokenAddress: string) => {
    return getContract(erc20abi, tokenAddress)
}