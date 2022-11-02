import React,{ useState, useCallback } from 'react'
import { useAppDispatch } from 'state'
import { Text, Button } from 'components/Pancake-uikit'
import Balance from 'components/Balance'
import { ethers } from 'ethers'
import { useBabyShark, usePoolNft } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { Skeleton } from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { updatePoolNftUserAllowance, updatePoolNftUserStakedBalance } from 'state/actions'
import { useTranslation } from 'contexts/Localization'
import { PoolNft } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import eggs from 'config/constants/eggs'

interface StatstProps {
  title?: string,
	value: string,
	userDataLoaded: boolean,
	account: string
}

const Stats: React.FC<StatstProps> = ({ title, value, userDataLoaded, account }) => {
	return(
		<StatsWrap>
			<Text>{title}</Text>
			{
				(userDataLoaded && account) ? <Balance value={Number(value)} decimals={0} /> : <Skeleton width="120px" height="16px" />
			}
		</StatsWrap>
	)
}

interface CardProps {
	data: PoolNft,
	userDataLoaded?: boolean
	account: string
}

const CLAIM_POINT = 86400

const Card: React.FC<CardProps> = ({ data, userDataLoaded, account }) => {
	const [requestedApproval, setRequestedApproval] = useState(false)
	const [requestedStake, setRequestedStake] = useState(false)
	const [requestedWithdraw, setRequestedWithdraw] = useState(false)
	const [requestedClaim, setRequestedClaim] = useState(false)
	const { media, name, userData, contractAddress, nftId, stakingToken, decimals } = data
	const { pointBalance, allowance, stakingTokenBalance, stakedBalance } = userData
	const stakedBl = Number(stakedBalance.toString())
	const balances = Number(stakingTokenBalance.div(10**decimals).toString())
	const isApprove = Number(allowance.toString())
	const { toastSuccess, toastError } = useToast()
	const babySharkContract = useBabyShark()
	const { callWithGasPrice } = useCallWithGasPrice()
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const address = getAddress(contractAddress)
	const nftContract = usePoolNft(nftId)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const tx = await callWithGasPrice(babySharkContract, 'approve', [address, ethers.constants.MaxUint256])
			const receipt = await tx.wait()

			dispatch(updatePoolNftUserAllowance(nftId, account))
			if (receipt.status) {
				toastSuccess(
					t('Contract Enabled'),
					<ToastDescriptionWithTx txHash={receipt.transactionHash}>
					{t('You can now stake in the %symbol% pool!', { symbol: stakingToken.symbol })}
					</ToastDescriptionWithTx>,
				)
				setRequestedApproval(false)
			} else {
				// user rejected tx or didn't go thru
				toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
				setRequestedApproval(false)
			}
		} catch (e) {
			setRequestedApproval(false)
			toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
		}
		}, [
		account,
		dispatch,
		babySharkContract,
		address,
		nftId,
		stakingToken,
		t,
		toastError,
		toastSuccess,
		callWithGasPrice,
	])

	const handleStake = useCallback(async () => {
		try {
			setRequestedStake(true)
			const tx = await callWithGasPrice(nftContract, 'stake', [new BigNumber(10000000*10**9).toString()])
			const receipt = await tx.wait()

			dispatch(updatePoolNftUserStakedBalance(nftId, account))
			if (receipt.status) {
				toastSuccess(
					t('Contract Enabled'),
					<ToastDescriptionWithTx txHash={receipt.transactionHash}>
					{t('You can now stake in the %symbol% pool!', { symbol: stakingToken.symbol })}
					</ToastDescriptionWithTx>,
				)
				setRequestedStake(false)
			} else {
				// user rejected tx or didn't go thru
				toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
				setRequestedStake(false)
			}
		} catch (e) {
			console.log(e)
			setRequestedStake(false)
			toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
		}
		}, [
		account,
		dispatch,
		nftContract,
		nftId,
		stakingToken,
		t,
		toastError,
		toastSuccess,
		callWithGasPrice,
	])

	const handleWithdraw = useCallback(async () => {
		try {
			setRequestedWithdraw(true)
			const tx = await callWithGasPrice(nftContract, 'withdraw', [new BigNumber(10000000*10**9).toString()])
			const receipt = await tx.wait()

			dispatch(updatePoolNftUserStakedBalance(nftId, account))
			if (receipt.status) {
				toastSuccess(
					t('Withraw successful'),
					<ToastDescriptionWithTx txHash={receipt.transactionHash}>
					{t('You just withdraw %symbol% in pool!', { symbol: stakingToken.symbol })}
					</ToastDescriptionWithTx>,
				)
				setRequestedWithdraw(false)
			} else {
				// user rejected tx or didn't go thru
				toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
				setRequestedWithdraw(false)
			}
		} catch (e) {
			console.log(e)
			setRequestedWithdraw(false)
			toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
		}
		}, [
		account,
		dispatch,
		nftContract,
		nftId,
		stakingToken,
		t,
		toastError,
		toastSuccess,
		callWithGasPrice,
	])

	const handleClaim = useCallback(async () => {
		try {
			setRequestedClaim(true)
			const tx = await callWithGasPrice(nftContract, 'claim', [])
			const receipt = await tx.wait()

			dispatch(updatePoolNftUserStakedBalance(nftId, account))
			if (receipt.status) {
				toastSuccess(
					t('Claim successful'),
					<ToastDescriptionWithTx txHash={receipt.transactionHash}>
					{t('You just claim a nft')}
					</ToastDescriptionWithTx>,
				)
				setRequestedClaim(false)
			} else {
				// user rejected tx or didn't go thru
				toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
				setRequestedClaim(false)
			}
		} catch (e) {
			console.log(e)
			setRequestedClaim(false)
			toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
		}
		}, [
		account,
		dispatch,
		nftContract,
		nftId,
		t,
		toastError,
		toastSuccess,
		callWithGasPrice,
	])

	const statusNft = (point: number): string => {
		const eggsMedia = eggs.filter(d => d.id === 1)
		if (point < 86400) return eggsMedia[0].media
		return media
	}

	const canClaim = CLAIM_POINT >= pointBalance
	return(
		<Container>
			<CardImage backgroundImage={statusNft(pointBalance)}>
				<Text padding="20px">{ name }</Text>
			</CardImage>
			<CardBody>
				<BodyStats>
					<Stats title="Claim Points" value={CLAIM_POINT.toString()} userDataLoaded={userDataLoaded} account={account} />
					<Stats title="Point Balance" value={new BigNumber(pointBalance).toString()} userDataLoaded={userDataLoaded} account={account} />
				</BodyStats>
				{/* <Text marginTop="20px" padding="0 20px" marginBottom="10px" color="#e74c3c">19% fee will be charged upon staking and withdrawal.</Text> */}
				<ButtonWrap>
					{
						account ?
							(isApprove === 0)
								?	
									<Button onClick={handleApprove} disabled={requestedApproval}>{t('Enable')}</Button>
								:
								(balances < 10000000 && stakedBl === 0)
									?
										<Text marginTop="20px" color="#e74c3c">It takes you 10,000,000 BKS to Stake, please check BKS in wallet.</Text>
									:
										<>
											<Button onClick={handleStake} disabled={requestedStake}>{t('Stake')}</Button>
											<Button disabled={requestedClaim || canClaim} onClick={handleClaim}>{t('Claim')}</Button>
											<Button onClick={handleWithdraw} disabled={requestedWithdraw}>{t('Withdraw')}</Button>
										</>
						:
							<Button>{t('Unlock Wallet')}</Button>
					}
				</ButtonWrap>
			</CardBody>
		</Container>
	)
}

const Container = styled.div`
	flex: 1 0 277px;
`

const CardImage =  styled.div<{ backgroundImage: string }>`
	background-image: url(${({ backgroundImage }) => (backgroundImage ? `${backgroundImage}` : 'none')});
	height: 200px;
	background-color: #fff;
	border-radius: 14px;
	background-position: center;
	background-size: 55%;
	background-repeat: no-repeat;
	position: relative;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;

	:before {
		content: '';
		background-image: url(/images/watermark.png);
		width: 40px;
    height: 40px;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.7;
    right: 5px;
    top: 5px;
	}
`

const CardBody = styled.div`
	height: 275px;
	background-color: #fff;
	border-radius: 14px;
`

const BodyStats = styled.div`
	display: flex;
	position: relative;
	:before {
		content: '';
		height: 96px;
		width: 1px;
		background-color: #D0D0D0;
		position: absolute;
		left: 50%;
		top: 0;
	}
`

const StatsWrap = styled.div`
	flex: 1;
	padding-left: 20px;
	padding-top: 20px;
	height: 96px;
`

const ButtonWrap = styled.div`
	padding: 0 20px;
	> button {
		width: 100%;
		margin-bottom: 10px;
	}
`

export default Card