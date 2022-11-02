import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import tokens from 'config/constants/tokens'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { TEAM_HOLDER_ADDRESS } from 'config/constants/teamHolders'
import { useBurnedBalance, useHolderBalance, useKRC20HolderBalance } from './useTokenBalance'


/**
 * A helper hook to keep track of the time between events
 * Can also be used to force an effect to re-run
 */
export const useGetLiveTadeStats = (ltdPrice: number) => {
  
    const ltdTokenAddress = tokens.livetrade.address[ChainId.MAINNET]
    const burnedBalance = useBurnedBalance(ltdTokenAddress);
    const teamHolderBalances: any = {}

    // Foundation
    teamHolderBalances.foundationReserve = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.foundationReserve)
    teamHolderBalances.foundationReserveTreasury = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.foundationReserveTreasury)
    
    // Team
    teamHolderBalances.teamTreasury = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.teamTreasury)
    teamHolderBalances.team = useHolderBalance( ltdTokenAddress,TEAM_HOLDER_ADDRESS.team)

    // Airdrop
    teamHolderBalances.communityAirdropTreasury = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.communityAirdropTreasury)
    teamHolderBalances.communityAirdrop = useHolderBalance( ltdTokenAddress,TEAM_HOLDER_ADDRESS.communityAirdrop)

    // Marketing
    teamHolderBalances.productMarketingTreasury = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.productMarketingTreasury)
    teamHolderBalances.productMarketing = useHolderBalance( ltdTokenAddress,TEAM_HOLDER_ADDRESS.productMarketing)

    // Partnership
    teamHolderBalances.partnershipEcosystemTreasury = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.partnershipEcosystemTreasury)
    teamHolderBalances.partnershipEcosystem = useHolderBalance( ltdTokenAddress,TEAM_HOLDER_ADDRESS.partnershipEcosystem)

    // strategicSale
    teamHolderBalances.strategicSaleTreasury = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.strategicSaleTreasury)
    teamHolderBalances.strategicSale = useHolderBalance( ltdTokenAddress,TEAM_HOLDER_ADDRESS.strategicSale)

    // privateSale
    teamHolderBalances.privateSaleTreasury = useHolderBalance(ltdTokenAddress, TEAM_HOLDER_ADDRESS.privateSaleTreasury)
    teamHolderBalances.privateSale = useHolderBalance( ltdTokenAddress,TEAM_HOLDER_ADDRESS.privateSale)

    // public sale
    teamHolderBalances.publicSale = useHolderBalance( ltdTokenAddress,TEAM_HOLDER_ADDRESS.publicSale)

    let totalLockedBalance = new BigNumber(0)
    Object.keys(teamHolderBalances).forEach((key) => {
        totalLockedBalance = totalLockedBalance.plus(teamHolderBalances[key])
    })

    const balanceCirculation = 500000000 - +getFullDisplayBalance(totalLockedBalance, 18, 0) - +getFullDisplayBalance(burnedBalance, 18, 0)
    
    const totalBurnBalance = useMemo(() => {
        return burnedBalance.isGreaterThan(0) ? +getFullDisplayBalance(burnedBalance, 18, 0) : 0
    }, [burnedBalance])

    const totalSupply = 500000000 - totalBurnBalance
    const totalLocked = +getFullDisplayBalance(totalLockedBalance, 18, 0);
    const marketCap = ltdPrice*balanceCirculation;
  return { ltdTokenAddress, balanceCirculation, totalSupply, totalBurnBalance, totalLocked, marketCap }
}
