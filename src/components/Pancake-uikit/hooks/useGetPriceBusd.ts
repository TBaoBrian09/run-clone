import BigNumber from 'bignumber.js'
import { getPanCakeRouterContract } from '../../../utils/contractHelpers'
import { getAddress } from '../../../utils/addressHelpers'
import tokens from '../../../config/constants/tokens'

const useGetPriceBusd = async(contract: string, decimals: number, swap = false) => {
    const pancakeRouterContract = getPanCakeRouterContract()
    const contractBUSD = getAddress(tokens.busd.address)
    const contractWBNB = getAddress(tokens.wbnb.address)
    const oneToken = 1 * (10 ** decimals)
    const params = swap ? [contract, contractWBNB, contractBUSD] : [contract,contractBUSD]
    const price = await pancakeRouterContract.getAmountsOut(oneToken.toString(), params)
    const endArr = price && price.length > 0 ? price[price.length - 1] : 0
    return (endArr / 10 ** 18)
}

export default useGetPriceBusd