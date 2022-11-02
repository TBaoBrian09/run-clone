import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import useLastUpdated from 'hooks/useLastUpdated'
import { multicallv2 } from 'utils/multicall'
import { getAirdropContract } from 'utils/contractHelpers'
import { getAddress } from 'utils/addressHelpers'
import ltdAirdropAbi from 'config/abi/ltdAirdropAbi.json'
import { listTokenEarn } from "views/Airdrop/config"
import tokens from 'config/constants/tokens'
import { BIG_ZERO } from 'utils/bigNumber'

export enum FetchStatus {
    NOT_FETCHED = 'not-fetched',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export const FetchUserV2 = (requestedClaimed, airdropContract, account) => {
    const [fetchStatus, setFetchStatus] = useState('not-fetched')
    const [dataUserV2, setDataUser] = useState({
        endTimeClaim: 0,
        startTimeClaim: 0,
        userClaimed: false,
        isWhitelist:false,
    })
  
    useEffect(() => {
      const fetchDataUser = async () => {
        try {
           
          const call = [{
              address: getAddress(airdropContract),
              name: 'startTime',
              params: []
          },
          {
              address: getAddress(airdropContract),
              name: 'endTime',
              params: []
          },
          {
              address: getAddress(airdropContract),
              name: 'airdropUserClaimed',
              params: [account]
          },
          {
              address: getAddress(airdropContract),
              name: 'userIsWhitelist',
              params: [account]
          }
        ]


          const [startTime, endTime, airdropUserClaimed, userIsWhitelist] = await multicallv2(ltdAirdropAbi, call)
          setDataUser({
              endTimeClaim: Number(new BigNumber(endTime).toJSON()),
              startTimeClaim: Number(new BigNumber(startTime).toJSON()),
              userClaimed: airdropUserClaimed[0],
              isWhitelist: userIsWhitelist[0]
          })

          setFetchStatus('success')
        } catch (e) {
          console.log(e)
          setFetchStatus('failed')
        }
      }
  
      if (account) {
        fetchDataUser()
      }
    }, [account, setDataUser, setFetchStatus, requestedClaimed, airdropContract])
  
    return { dataUserV2, fetchStatus }
}

export const FetchAmountClaim = (tokenContract, airdropContract) => {
  // console.log(airdropContract)
  const [fetchStatus, setFetchStatus] = useState('not-fetched')
  const [amount, setAmount] = useState(BIG_ZERO)
  const { account } = useWeb3React()

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
          const call = [{
                address: getAddress(airdropContract),
                name: 'airdropTokenAmountMap',
                params: [account, getAddress(tokenContract)]
            }
          ]

          const [airdropTokenAmountMap] = await multicallv2(ltdAirdropAbi, call)
          setAmount(new BigNumber(airdropTokenAmountMap))

          setFetchStatus('success')
        } catch (e) {
          console.log(e)
          setFetchStatus('failed')
        }
    }

    if (account) {
      fetchDataUser()
    }
  }, [account, setFetchStatus, tokenContract, airdropContract])

  return { amount, fetchStatus }
}

export const GetTokenEarnUser = () => {
  const [fetchStatus, setFetchStatus] = useState('not-fetched')
 
  const { account } = useWeb3React()
  const [balance, setBalance] = useState({
    htd: 0,
    adt: 0,
    bami: 0,
})
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
          const airdropContract = getAirdropContract()
          const HTD = await airdropContract.airdropTokenAmountMap(account, getAddress(tokens.htd.address));
          const ADT = await airdropContract.airdropTokenAmountMap(account, getAddress(tokens.adt.address));
          const BAMI = await airdropContract.airdropTokenAmountMap(account, getAddress(tokens.BAMI.address));
          setBalance({
            htd:  HTD,
            adt: ADT,
            bami: BAMI,
        })

        setFetchStatus('success')
      } catch (e) {
        console.log(e)
        setFetchStatus('failed')
      }
    }

    if (account) {
      fetchDataUser()
    }
  }, [account, setBalance, setFetchStatus])

  return { balance, fetchStatus }
}

