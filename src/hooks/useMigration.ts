import { useEffect, useState } from 'react'
import LTDMigrationABI from 'config/abi/LTDMigration.json'
import ltdTokenABI from 'config/abi/LTDToken.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import useLastUpdated from 'hooks/useLastUpdated'
import { getMigrationContract } from 'utils/contractHelpers'

export enum FetchStatus {
    NOT_FETCHED = 'not-fetched',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export const fetchUserAllowance = async(account) => {
    const calls = [{
        address: getAddress(tokens.oldLiveTrade.address),
        name: 'allowance',
        params: [account, getAddress(contract.ltdMigration)]
    }]

    const [allowance] = await multicall(ltdTokenABI, calls)
    return Number(new BigNumber(allowance).toJSON())
}

export const checkMigrationWhitelist = async(account) => {
    const calls = [
        {
            address: getAddress(contract.ltdMigration),
            name: 'checkAccountWhitelist',
            params: [account,]
        },
        {
            address:getAddress(contract.ltdMigration),
            name: 'amountLtdPerAccount',
            params: [account,]
        }
    ]

    const [isWhitelist,userAmount] = await multicall(LTDMigrationABI, calls)
    return {
        isWhitelist: isWhitelist[0],
        userAmount: Number(new BigNumber(userAmount).toJSON()),
    }
}

export const CheckMigrationWhitelistV2 = (status) => {
    const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
    const [userMigration, setUserMigration] = useState({isWhitelist: false, amount: 0})
    const { account } = useWeb3React()
    const { lastUpdated, setLastUpdated } = useLastUpdated()
  
    useEffect(() => {
      const fetchUserWhitelist = async () => {
        try {
          const migrationContract = getMigrationContract()
          const whitelist = await migrationContract.checkAccountWhitelist(account);
          const value = await migrationContract.amountLtdPerAccount(account);

          setUserMigration({isWhitelist: whitelist, amount: Math.floor(value/1E18) })
          setFetchStatus(FetchStatus.SUCCESS)
        } catch (e) {
          console.log(e)
          setFetchStatus(FetchStatus.FAILED)
        }
      }
  
      if (account) {
        fetchUserWhitelist()
      }
    }, [account, lastUpdated, setUserMigration, setFetchStatus, status])
  
    return { userMigration, fetchStatus, refresh: setLastUpdated }
}
