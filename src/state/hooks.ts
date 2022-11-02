import { useEffect, } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { ethers } from 'ethers'
import { State } from './types'
import fetchReferralInfo from './referrals/fetchReferralsInfo'

const saveReferrer = async (account, ref) => {
  if (!ethers.utils.isAddress(ref) || account === ref) {
    return
  }
  const referralData = await fetchReferralInfo(account)
  if (referralData.referrer === '0x0000000000000000000000000000000000000000') {
    localStorage.setItem('REFERRER', ref)
  }
}

export const useSaveReferrer = () => {
  // eslint-disable-next-line
  const search = window.location.search
  const ref = new URLSearchParams(search).get('ref')
  const { account } = useWeb3React()
  useEffect(() => {
    if (account && ref) {
      saveReferrer(account, ref)
    }
  }, [account, ref])
}

export const useGetReferralInfo = () => {
    return useSelector((state: State) => state.referrals.data)
}