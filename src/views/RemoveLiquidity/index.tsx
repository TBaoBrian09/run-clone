import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { splitSignature } from '@ethersproject/bytes'
import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, currencyEquals, ETHER, Percent, WETH } from '@pancakeswap/sdk'
import { Text, AddIcon, ArrowDownIcon, CardBody, Slider, Box, Flex, useModal, Button, Progress } from '@phamphu19498/runtogether-uikit'
import { RouteComponentProps } from 'react-router'
import { BigNumber } from '@ethersproject/bignumber'
import { useTranslation } from 'contexts/Localization'
import PageFullWidth from 'components/Layout/PageFullWidth'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import { Wrapper } from 'views/Swap/components/styleds'
import Nav from 'components/Menu/SubNav'
import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { MinimalPositionCard } from '../../components/PositionCard'
import { AppHeader, AppBody } from '../../components/App'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import { LightGreyCard } from '../../components/Card'

import { CurrencyLogo, DoubleCurrencyLogo } from '../../components/Logo'
import { ROUTER_ADDRESS } from '../../config/constants'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCurrency } from '../../hooks/Tokens'
import { usePairContract } from '../../hooks/useContract'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'

import { useTransactionAdder } from '../../state/transactions/hooks'
import StyledInternalLink from '../../components/Links'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import { currencyId } from '../../utils/currencyId'
import useDebouncedChangeHandler from '../../hooks/useDebouncedChangeHandler'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import Dots from '../../components/Loader/Dots'
import { useBurnActionHandlers, useDerivedBurnInfo, useBurnState } from '../../state/burn/hooks'

import { Field } from '../../state/burn/actions'
import { useGasPrice, useUserSlippageTolerance } from '../../state/user/hooks'
import Page from '../Page'

const BorderCard = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding: 16px;
`
const Container = styled.div`
     width:100%;
    /* background:  url("/images/mask-bg-exchange.svg"), ${({ theme }) => theme.colors.gradients.bgSecondary} fixed; */
    display:flex;
    justify-content:center;
    margin-top:-18px;
    /* padding-top:1.5rem; */
`
const CustomAutoColumn = styled(AutoColumn)`
  background:#fff;
  border:1px solid #ddd;
`
const WrapAppBody = styled.div`
  position: relative;
  max-width: 600px;
  width: 100%;
  z-index: 5;
  background: #FCFCFD;
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin-bottom:30px;
  /* box-shadow: 0px 64px 64px -48px rgba(31, 47, 70, 0.12); */
  background: ${({ theme }) => theme.colors.background};
  box-shadow:  0px 54px 54px -48px rgba(31, 47, 70, 0.12);
  /* padding:0 20px; */
  @media only screen and (max-width: 600px) {
    margin-left:16px;
    margin-right:16px;
    width: 98%;
    padding: 0;
  }
`
const CustomButtonTab = styled(Button)`
box-shadow:none;
border-radius: 90px;
border:1px solid #ddd;
opacity:1;
@media (max-width:600px){
  padding: 0 11px;
}
&:hover{
  opacity:1!important;
}
`
const CustomButton = styled(Button)`
  border-radius: 90px !important; 
  box-shadow: none;
  background-color: #FF592C;
  @media (max-width:600px){
    width:100%;
  }
`
const CustomProgress = styled(Progress)`
  > div > div > div > div {
      background: red;
  }
  @media (max-width:600px){
    > div > div >div {
      height:10px;
    }
  }
`
const CsConnectWalletButton = styled(ConnectWalletButton)`
  width: 60%;
  background-color: #FF592C;
  color: #FFFFFF;
  padding: 24px;
  box-shadow:none;
  border:none;
`

export default function RemoveLiquidity({
  history,
  match: {
    params: { currencyIdA, currencyIdB },
  },
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const { account, chainId, library } = useActiveWeb3React()
  const [tokenA, tokenB] = useMemo(
    () => [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)],
    [currencyA, currencyB, chainId],
  )

  const { t } = useTranslation()
  const gasPrice = useGasPrice()
   
  

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const isValid = !error
  
  // modal and loading
  const [showDetailed, setShowDetailed] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('')
  const deadline = useTransactionDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }
  
  const getAmountLiquidity = formattedAmounts[Field.LIQUIDITY_PERCENT];

  const atMaxAmount = parsedAmounts[Field.LIQUIDITY_PERCENT]?.equalTo(new Percent('1'))

  // pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)

  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], ROUTER_ADDRESS)

  async function onAttemptToApprove() {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    // try to gather a signature for permission
    const nonce = await pairContract.nonces(account)

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ]
    const domain = {
      name: 'Pancake LPs',
      version: '1',
      chainId,
      verifyingContract: pair.liquidityToken.address,
    }
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ]
    const message = {
      owner: account,
      spender: ROUTER_ADDRESS,
      value: liquidityAmount.raw.toString(),
      nonce: nonce.toHexString(),
      deadline: deadline.toNumber(),
    }
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    })

    library
      .send('eth_signTypedData_v4', [account, data])
      .then(splitSignature)
      .then((signature) => {
        setSignatureData({
          v: signature.v,
          r: signature.r,
          s: signature.s,
          deadline: deadline.toNumber(),
        })
      })
      .catch((err) => {
        // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
        if (err?.code !== 4001) {
          approveCallback()
        }
      })
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, value: string) => {
      setSignatureData(null)
      return _onUserInput(field, value)
    },
    [_onUserInput],
  )

  const onLiquidityInput = useCallback((value: string): void => onUserInput(Field.LIQUIDITY, value), [onUserInput])
  const onCurrencyAInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_A, value), [onUserInput])
  const onCurrencyBInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_B, value), [onUserInput])

  // tx sending
  const addTransaction = useTransactionAdder()
  async function onRemove() {
    if (!chainId || !library || !account || !deadline) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }
    const router = getRouterContract(chainId, library, account)

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currencyB === ETHER
    const oneCurrencyIsETH = currencyA === ETHER || currencyBIsETH

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[]
    let args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((err) => {
            console.error(`estimateGas failed`, methodName, args, err)
            return undefined
          }),
      ),
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      setAttemptingTxn(true)
      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
        gasPrice,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencyA?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencyB?.symbol}`,
          })

          setTxHash(response.hash)
        })
        .catch((err: Error) => {
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(err)
        })
    }
  }

  function modalHeader() {
    return (
      <CustomAutoColumn gap="md" style={{border:'none'}}>
        <RowBetween align="flex-end">
          <Text fontSize="24px">{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyA} size="24px" />
            <Text fontSize="24px" ml="10px">
              {currencyA?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowFixed>
          <AddIcon width="16px" />
        </RowFixed>
        <RowBetween align="flex-end">
          <Text fontSize="24px">{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyB} size="24px" />
            <Text fontSize="24px" ml="10px">
              {currencyB?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>

        <Text small textAlign="left" pt="12px">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
            slippage: allowedSlippage / 100,
          })}
        </Text>
      </CustomAutoColumn>
    )
  }

  function modalBottom() {
    return (
      <>
        <RowBetween>
          <Text>
            {t('%assetA%/%assetB% Burned', { assetA: currencyA?.symbol ?? '', assetB: currencyB?.symbol ?? '' })}
          </Text>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin />
            <Text>{parsedAmounts[Field.LIQUIDITY]?.toSignificant(6)}</Text>
          </RowFixed>
        </RowBetween>
        {pair && (
          <>
            <RowBetween>
              <Text>{t('Price')}</Text>
              <Text>
                1 {currencyA?.symbol} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {currencyB?.symbol}
              </Text>
            </RowBetween>
            <RowBetween>
              <div />
              <Text>
                1 {currencyB?.symbol} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {currencyA?.symbol}
              </Text>
            </RowBetween>
          </>
        )}
        <CustomButton disabled={!(approval === ApprovalState.APPROVED || signatureData !== null)} onClick={onRemove}>
            {t('Confirm')}
        </CustomButton>
      </>
    )
  }

  const pendingText = t('Removing %amountA% %symbolA% and %amountB% %symbolB%', {
    amountA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    symbolA: currencyA?.symbol ?? '',
    amountB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
    symbolB: currencyB?.symbol ?? '',
  })

  const liquidityPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value.toString())
    },
    [onUserInput],
  )

  const oneCurrencyIsETH = currencyA === ETHER || currencyB === ETHER
  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(WETH[chainId], currencyA)) ||
        (currencyB && currencyEquals(WETH[chainId], currencyB))),
  )

  const handleSelectCurrencyA = useCallback(
    (currency: Currency) => {
      if (currencyIdB && currencyId(currency) === currencyIdB) {
        history.push(`/remove/${currencyId(currency)}/${currencyIdA}`)
      } else {
        history.push(`/remove/${currencyId(currency)}/${currencyIdB}`)
      }
    },
    [currencyIdA, currencyIdB, history],
  )
  const handleSelectCurrencyB = useCallback(
    (currency: Currency) => {
      if (currencyIdA && currencyId(currency) === currencyIdA) {
        history.push(`/remove/${currencyIdB}/${currencyId(currency)}`)
      } else {
        history.push(`/remove/${currencyIdA}/${currencyId(currency)}`)
      }
    },
    [currencyIdA, currencyIdB, history],
  )

  const handleDismissConfirmation = useCallback(() => {
    setSignatureData(null) // important that we clear signature data to avoid bad sigs
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0')
    }
    setTxHash('')
  }, [onUserInput, txHash])

  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
    Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0)),
    liquidityPercentChangeCallback,
  )

  const [onPresentRemoveLiquidity] = useModal(
    <TransactionConfirmationModal
      title={t('You will receive')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash || ''}
      content={() => <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      pendingText={pendingText}
    />,
    true,
    true,
    'removeLiquidityModal',
  )

  return (
    <PageFullWidth>
      <HeaderLiquidity bgColor="#4B19F5" nameTitle="run together" namePlace="Exchange"/>   
      <Nav/>
      <Container>
      <WrapAppBody>
      <Wrapper id="removeliquidity-page">
        <AppHeader
          backTo="/pool"
          title={t('Remove Liquidity', {
            assetA: currencyA?.symbol ?? '',
            assetB: currencyB?.symbol ?? '',
          })}
          // subtitle={`To receive ${currencyA?.symbol} and ${currencyB?.symbol}`}
          subtitle=''
          noConfig
        />

        <CardBody>
          <CustomAutoColumn gap="20px" style={{padding:"10px", borderRadius:"10px"}}>
            <RowBetween>
              <Text>{t('Amount')}</Text>
              <Button style={{color: "#FF592C"}} variant="text" scale="sm" onClick={() => setShowDetailed(!showDetailed)}>
                {showDetailed ? t('Simple') : t('Detailed')}
              </Button>

            </RowBetween>
            {!showDetailed && (
              <BorderCard>
                <Text fontSize="35px" bold mb="16px" style={{ lineHeight: 1 }}>
                  {formattedAmounts[Field.LIQUIDITY_PERCENT]}%
                </Text>
                {/* <Slider
                  name="lp-amount"
                  min={0}
                  max={100}
                  value={innerLiquidityPercentage}
                  onValueChanged={(value) => setInnerLiquidityPercentage(Math.ceil(value))}
                  mb="16px"
                /> */}

                <CustomProgress variant="round" primaryStep={innerLiquidityPercentage} />
                <Flex flexWrap="wrap" justifyContent="space-evenly" mt="1rem">
                  <CustomButtonTab style={{backgroundColor: getAmountLiquidity === "25" ? "#FF592C": "#fff",color: getAmountLiquidity === "25" ? "#fff": "black"}} scale="sm" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '25')}>
                    25% 
                  </CustomButtonTab>
                  <CustomButtonTab style={{backgroundColor: getAmountLiquidity === "50" ? "#FF592C": "#fff",color: getAmountLiquidity === "50" ? "#fff": "black"}} scale="sm" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '50')}>
                    50%
                  </CustomButtonTab>
                  <CustomButtonTab style={{backgroundColor: getAmountLiquidity === "75" ? "#FF592C": "#fff",color: getAmountLiquidity === "75" ? "#fff": "black"}} scale="sm" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '75')}>
                    75%
                  </CustomButtonTab>
                  <CustomButtonTab style={{backgroundColor: getAmountLiquidity === "100" ? "#FF592C": "#fff",color: getAmountLiquidity === "100" ? "#fff": "black"}} scale="sm" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}>
                    Max
                  </CustomButtonTab>
                </Flex>
              </BorderCard>
            )}
          </CustomAutoColumn>
          {!showDetailed && (
            <>
              <ColumnCenter >
                <ArrowDownIcon color="textSubtle" width="24px" my="16px" />
              </ColumnCenter>
              <CustomAutoColumn gap="10px" style={{padding:"10px", borderRadius:"10px"}}>
                <Text bold color="text" fontSize="12px" textTransform="uppercase">
                  {t('You will receive')}
                </Text>
                <LightGreyCard style={{background:"transparent"}}>
                  <Flex justifyContent="space-between" mb="8px">
                    <Flex>
                      <CurrencyLogo currency={currencyA} />
                      <Text small color="textSubtle" id="remove-liquidity-tokena-symbol" ml="4px">
                        {currencyA?.symbol}
                      </Text>
                    </Flex>
                    <Text small>{formattedAmounts[Field.CURRENCY_A] || '-'}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Flex>
                      <CurrencyLogo currency={currencyB} />
                      <Text small color="textSubtle" id="remove-liquidity-tokenb-symbol" ml="4px">
                        {currencyB?.symbol}
                      </Text>
                    </Flex>
                    <Text small>{formattedAmounts[Field.CURRENCY_B] || '-'}</Text>
                  </Flex>
                  {chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) ? (
                    <RowBetween style={{ justifyContent: 'flex-end', fontSize: '14px' }}>
                      {oneCurrencyIsETH ? (
                        <StyledInternalLink
                          to={`/remove/${currencyA === ETHER ? WETH[chainId].address : currencyIdA}/${
                            currencyB === ETHER ? WETH[chainId].address : currencyIdB
                          }`}
                        >
                          {t('Receive WBNB')}
                        </StyledInternalLink>
                      ) : oneCurrencyIsWETH ? (
                        <StyledInternalLink
                          to={`/remove/${currencyA && currencyEquals(currencyA, WETH[chainId]) ? 'BNB' : currencyIdA}/${
                            currencyB && currencyEquals(currencyB, WETH[chainId]) ? 'BNB' : currencyIdB
                          }`}
                        >
                          {t('Receive BNB')}
                        </StyledInternalLink>
                      ) : null}
                    </RowBetween>
                  ) : null}
                </LightGreyCard>
              </CustomAutoColumn>
            </>
          )}

          {showDetailed && (
            <Box my="16px">
              <CurrencyInputPanel
                value={formattedAmounts[Field.LIQUIDITY]}
                onUserInput={onLiquidityInput}
                onMax={() => {
                  onUserInput(Field.LIQUIDITY_PERCENT, '100')
                }}
                showMaxButton={!atMaxAmount}
                disableCurrencySelect
                currency={pair?.liquidityToken}
                pair={pair}
                id="liquidity-amount"
                onCurrencySelect={() => null}
              />
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              <CurrencyInputPanel
                hideBalance
                value={formattedAmounts[Field.CURRENCY_A]}
                onUserInput={onCurrencyAInput}
                onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                showMaxButton={!atMaxAmount}
                currency={currencyA}
                label={t('Output')}
                onCurrencySelect={handleSelectCurrencyA}
                id="remove-liquidity-tokena"
              />
              <ColumnCenter>
                <AddIcon width="24px" my="16px" />
              </ColumnCenter>
              <CurrencyInputPanel
                hideBalance
                value={formattedAmounts[Field.CURRENCY_B]}
                onUserInput={onCurrencyBInput}
                onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                showMaxButton={!atMaxAmount}
                currency={currencyB}
                label={t('Output')}
                onCurrencySelect={handleSelectCurrencyB}
                id="remove-liquidity-tokenb"
              />
            </Box>
          )}
          {pair && (
            <CustomAutoColumn gap="10px" style={{ marginTop: '16px', borderRadius:"10px", padding:"10px"}}>
              <Text bold color="text" fontSize="12px" textTransform="uppercase">
                {t('Prices')}
              </Text>
              <LightGreyCard style={{background:"transparent"}}>
                <Flex justifyContent="space-between">
                  <Text small color="textSubtle">
                    1 {currencyA?.symbol} =
                  </Text>
                  <Text small>
                    {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {currencyB?.symbol}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text small color="textSubtle">
                    1 {currencyB?.symbol} =
                  </Text>
                  <Text small>
                    {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {currencyA?.symbol}
                  </Text>
                </Flex>
              </LightGreyCard>
            </CustomAutoColumn>
          )}
          <Box position="relative" mt="16px">
            {!account ? (
             <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CsConnectWalletButton />
             </Box>
            ) : (
              <RowBetween>
                <CustomButton
                  // variant={approval === ApprovalState.APPROVED || signatureData !== null ? 'success' : 'primary'}
                  onClick={onAttemptToApprove}
                  disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
                  width="100%"
                  mr="0.5rem"

                >
                  {approval === ApprovalState.PENDING ? (
                    <Dots>{t('Enabling')}</Dots>
                  ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                    t('Enabled')
                  ) : (
                    t('Enable')
                  )}
                </CustomButton>
                <CustomButton
                  variant={
                    !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                      ? 'danger'
                      : 'primary'
                  }
                  onClick={() => {
                    onPresentRemoveLiquidity()
                  }}
                  width="100%"
                  disabled={!isValid || (signatureData === null && approval !== ApprovalState.APPROVED)}
                >
                  {error || t('Remove')}
                </CustomButton>
              </RowBetween>
            )}
          </Box>
          {pair ? (
        <AutoColumn style={{ minWidth: '20rem', width: '100%', maxWidth: '550px', marginTop: '1rem' }}>
          <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
        </AutoColumn>
      ) : null}
        </CardBody>
        </Wrapper>
      </WrapAppBody>

      

      </Container>
     
    </PageFullWidth>
  )
}
