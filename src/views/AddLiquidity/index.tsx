import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, currencyEquals, ETHER, TokenAmount, WETH } from '@pancakeswap/sdk'
import { Text, Flex, AddIcon, CardBody, Message, useModal, Box, Button, CogIcon, HistoryIcon, HelpIcon } from '@phamphu19498/runtogether-uikit'
import { RouteComponentProps } from 'react-router-dom'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import { useTranslation } from 'contexts/Localization'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Header from 'views/Swap/components/Header'
import ButtonDigitalAssetsAndTokenizedStocks from 'views/Farms/components/ButtonDigitalAssetsAndTokenizedStocks'
import Nav from 'components/Menu/SubNav'
import PageFullWidth from 'components/Layout/PageFullWidth'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import { QuestionIcon } from 'components/Pancake-uikit'
import { Wrapper } from 'views/Swap/components/styleds'
import { LightCard } from '../../components/Card'
import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { DoubleCurrencyLogo } from '../../components/Logo'
import { AppHeader, AppBody } from '../../components/App'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row, { RowBetween } from '../../components/Layout/Row'
import ConnectWalletButton from '../../components/ConnectWalletButton'

import { ROUTER_ADDRESS } from '../../config/constants'
import { PairState } from '../../hooks/usePairs'
import { useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { Field } from '../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'

import { useTransactionAdder } from '../../state/transactions/hooks'
import { useGasPrice, useIsExpertMode, useUserSlippageTolerance } from '../../state/user/hooks'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import Dots from '../../components/Loader/Dots'
import ConfirmAddModalBottom from './ConfirmAddModalBottom'
import { currencyId } from '../../utils/currencyId'
import PoolPriceBar from './PoolPriceBar'


const Container = styled.div`
    width:100%;
    /* background:  url("/images/mask-bg-exchange.svg"), ${({ theme }) => theme.colors.gradients.bgSecondary} fixed; */
    display:flex;
    justify-content:center;
    /* padding-top:1.5rem; */
    /* flex-direction: column; */
    align-items:center;
    padding-bottom:2rem;
    margin-top:-18px;
`
const CustomAutoColumn = styled(AutoColumn)`
    background:#fff !important;
`
const CustomMessage = styled(Message)`
  width:100% !important;
  border:1px solid ${({ theme }) => theme.colors.failure};
  background:#fff;
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
  box-shadow:  0px 54px 54px -48px rgba(31, 47, 70, 0.12);
  /* padding:0 20px; */
  @media only screen and (max-width: 600px) {
    margin-left:16px;
    margin-right:16px;
    width: 98%;
    padding: 0;
  }
`
export const CustomToken = styled(Flex)`
  margin: 20px 0;
`;
export const CustomFlex = styled(Flex)`
  justify-content: space-around;
  padding-left:20px;
`;
export const WrapIcon = styled.div`
  padding:0 5px;
`;
export const CustomButton = styled(Button)`
  border-radius: 90px !important;
  width: 60% !important;
  /* padding: 0px 125px !important; */
  box-shadow: none;
  background:#FF592C;
`
const CustomButtonSubmit = styled(Button)`
  border-radius: 90px !important;
  width: 60%;
  /* padding: 0px 125px !important; */
  box-shadow: none;
  background:#FF592C;
  @media (max-width:600px){
     width:90%;
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


export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const { t } = useTranslation()
  const gasPrice = useGasPrice()

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WETH[chainId])) ||
        (currencyB && currencyEquals(currencyB, WETH[chainId]))),
  )

  const expertMode = useIsExpertMode()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS)

  const addTransaction = useTransactionAdder()

  async function onAdd() {
    if (!chainId || !library || !account) return
    const router = getRouterContract(chainId, library, account)

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    let estimate
    let method: (...args: any) => Promise<TransactionResponse>
    let args: Array<string | string[] | number>
    let value: BigNumber | null
    if (currencyA === ETHER || currencyB === ETHER) {
      const tokenBIsETH = currencyB === ETHER
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }

    setAttemptingTxn(true)
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
          gasPrice,
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencies[Field.CURRENCY_A]?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
          })

          setTxHash(response.hash)
        }),
      )
      .catch((err) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (err?.code !== 4001) {
          console.error(err)
        }
      })
  }

  const modalHeader = () => {
    return noLiquidity ? (
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Text fontSize="28px" marginRight="10px">
          {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol}`}
        </Text>
        <DoubleCurrencyLogo
          currency0={currencies[Field.CURRENCY_A]}
          currency1={currencies[Field.CURRENCY_B]}
          size={30}
        />
      </Flex>
    ) : (
      <CustomAutoColumn>
        <Flex alignItems="center">
          <Text fontSize="28px" marginRight="10px">
            {liquidityMinted?.toSignificant(6)}
          </Text>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </Flex>
        <Row>
          <Text fontSize="24px">
            {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol} Pool Tokens`}
          </Text>
        </Row>
        <Text small textAlign="left" my="24px">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
            slippage: allowedSlippage / 100,
          })}
        </Text>
      </CustomAutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = t('Supplying %amountA% %symbolA% and %amountB% %symbolB%', {
    amountA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    symbolA: currencies[Field.CURRENCY_A]?.symbol ?? '',
    amountB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
    symbolB: currencies[Field.CURRENCY_B]?.symbol ?? '',
  })

  const handleCurrencyASelect = useCallback(
    (currencyA_: Currency) => {
      const newCurrencyIdA = currencyId(currencyA_)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB_: Currency) => {
      const newCurrencyIdB = currencyId(currencyB_)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA || 'BNB'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  const [onPresentAddLiquidityModal] = useModal(
    <TransactionConfirmationModal
      title={noLiquidity ? t('You are creating a pool') : txHash? "Transaction submmited" : t('You will receive')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={() => <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      pendingText={pendingText}
      currencyToAdd={pair?.liquidityToken}
    />,
    true,
    true,
    'addLiquidityModal',
  )

  return (
    <PageFullWidth>
       <HeaderLiquidity bgColor="#4B19F5" nameTitle="run together" namePlace="Exchange"/>  
      <Nav/>
      <Container>
      <WrapAppBody>
      <Wrapper id="addliquidity-page">
        {/* <AppHeader
          title={t('Add Liquidity')}
          subtitle={t('Add liquidity to receive LP tokens')}
          helper={t(
            'Liquidity providers earn a 0.17% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.',
          )}
          backTo="/pool"
        /> */}
        <AppHeader title={t('Add Liquidity')} subtitle={t('Add liquidity to receive LP tokens')} />
        {/* <Flex justifyContent="center" marginTop='10px'>
            <Text fontSize='48px' bold >{t('Add Liquidity')}</Text>
        </Flex>
        <CustomToken justifyContent='center'>
            <WrapIcon>
                <QuestionIcon/>
            </WrapIcon>
             <Text>Add liquidity to receive LP tokens</Text>
             <CustomFlex>
                <WrapIcon>
                  <CogIcon/>
                </WrapIcon>
                <WrapIcon>  
                  <HistoryIcon/>
                </WrapIcon>  
              </CustomFlex>
          </CustomToken> */}
        <CardBody>
          <CustomAutoColumn gap="20px">
            {noLiquidity && (
              <ColumnCenter>
                <CustomMessage variant="warning">
                  <div>
                    <Text bold mb="8px">
                      {t('You are the first liquidity provider.')}
                    </Text>
                    <Text mb="8px">{t('The ratio of tokens you add will set the price of this pool.')}</Text>
                    <Text>{t('Once you are happy with the rate click supply to review.')}</Text>
                  </div>
                </CustomMessage>
              </ColumnCenter>
            )}
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              onMax={() => {
                onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
              }}
              onCurrencySelect={handleCurrencyASelect}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A]}
              id="add-liquidity-input-tokena"
              showCommonBases
            />
            <ColumnCenter>
              <AddIcon width="16px" />
            </ColumnCenter>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              onCurrencySelect={handleCurrencyBSelect}
              onMax={() => {
                onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
              }}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B]}
              id="add-liquidity-input-tokenb"
              showCommonBases
            />
            {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
              <>
                <LightCard padding="0px" borderRadius="10px" style={{backgroundColor:"#fff"}}>
                  <RowBetween>
                    <Text fontSize="14px">
                      {noLiquidity ? t('Initial prices and pool share') : t('Prices and pool share')}
                    </Text>
                  </RowBetween>{' '}

                  <Box padding="1rem" borderRadius="20px" style={{border:'1px solid #ddd'}}>
                    <PoolPriceBar
                      currencies={currencies}
                      poolTokenPercentage={poolTokenPercentage}
                      noLiquidity={noLiquidity}
                      price={price}
                    />
                  </Box>
                </LightCard>
              </>
            )}
            {addIsUnsupported ? (
              <CustomButton disabled mb="4px">
                {t('Unsupported Asset')}
              </CustomButton>
            ) : !account ? (
              <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CsConnectWalletButton />
              </Box>
            ) : (
              <AutoColumn gap="md">
                {(approvalA === ApprovalState.NOT_APPROVED ||
                  approvalA === ApprovalState.PENDING ||
                  approvalB === ApprovalState.NOT_APPROVED ||
                  approvalB === ApprovalState.PENDING) &&
                  isValid && (
                    <RowBetween style={{display:'flex',justifyContent:'center'}}>
                      {approvalA !== ApprovalState.APPROVED && (
                        <CustomButton
                          onClick={approveACallback}
                          disabled={approvalA === ApprovalState.PENDING}
                          width={approvalB !== ApprovalState.APPROVED ? '48%' : '100%'}
                          style={{marginRight:'20px'}}                         
                        >
                          {approvalA === ApprovalState.PENDING ? (
                            <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Dots>
                          ) : (
                            t('Enable %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })
                          )}
                        </CustomButton>
                      )}
                      {approvalB !== ApprovalState.APPROVED && (
                        <CustomButton
                          onClick={approveBCallback}
                          disabled={approvalB === ApprovalState.PENDING}
                          width={approvalA !== ApprovalState.APPROVED ? '48%' : '100%'}
                          
                        >
                          {approvalB === ApprovalState.PENDING ? (
                            <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Dots>
                          ) : (
                            t('Enable %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })
                          )}
                        </CustomButton>
                      )}
                    </RowBetween>
                  )}
                  <Flex justifyContent="center"> 

                <CustomButtonSubmit
                  // variant={
                  //   !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                  //     ? 'danger'
                  //     : 'primary'
                  // }

                  // style= {{ 
                  //   backgroundColor:
                  //     !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                  //     ? '#D8D8D8'
                  //     : '#FF592C'}}
                  onClick={() => {
                    if (expertMode) {
                      onAdd()
                    } else {
                      onPresentAddLiquidityModal()
                    }
               }}
                  disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
                >
                  {error ?? t('Supply')}
                </CustomButtonSubmit>
                </Flex>
              </AutoColumn>
            )}
            {!addIsUnsupported ? (
        pair && !noLiquidity && pairState !== PairState.INVALID ? (
          <CustomAutoColumn style={{ minWidth: '20rem', width: '100%', maxWidth: '550px'}}>
            <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
          </CustomAutoColumn>
        ) : null
      ) : (
        <UnsupportedCurrencyFooter currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]} />
      )}
          </CustomAutoColumn>
        </CardBody>
        </Wrapper>
      </WrapAppBody>
      </Container>
      
    </PageFullWidth>
  )
}
