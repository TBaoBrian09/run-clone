import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Trade, TradeType } from '@pancakeswap/sdk'
import { Text, ArrowDownIcon, Button } from '@phamphu19498/runtogether-uikit'
import { Field } from 'state/swap/actions'
import { useTranslation } from "contexts/Localization";
import { isAddress, shortenAddress } from 'utils'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import { CurrencyLogo } from 'components/Logo'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { ErrorIcon } from 'components/Pancake-uikit'
import { TruncatedText, SwapShowAcceptChanges } from './styleds'

const CustomAutoColumn = styled(AutoColumn)`
  background:transparent !important;
`
export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage],
  )
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)
  const {t} = useTranslation()
  
  return (
    <CustomAutoColumn gap="md">
      <CsRowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.inputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <TruncatedText
            fontSize="24px"
            color={showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? 'primary' : 'text'}
          >
            {trade.inputAmount.toSignificant(6)}
          </TruncatedText>
        </RowFixed>
        <CsRowFixedText gap="0px">
          <CsText fontSize="24px">
            {trade.inputAmount.currency.symbol}
          </CsText>
        </CsRowFixedText>
      </CsRowBetween>
      <RowFixed>
        <ArrowDownIcon width="16px" ml="4px" />
      </RowFixed>
      <CsRowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.outputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <TruncatedText
            fontSize="24px"
            color={
              priceImpactSeverity > 2
                ? 'failure'
                : showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
                ? 'primary'
                : 'text'
            }
          >
            {trade.outputAmount.toSignificant(6)}
          </TruncatedText>
        </RowFixed>
        <CsRowFixedText gap="0px">
          <CsText fontSize="24px" ml="10px">
            {trade.outputAmount.currency.symbol}
          </CsText>
        </CsRowFixedText>
      </CsRowBetween>
      {showAcceptChanges ? (
        <SwapShowAcceptChanges justify="flex-start" gap="0px">
          <RowBetween height='100%'>
            <CsRowFixed>
              <ErrorIcon mr="8px" />
              <Text bold>{t("Price Updated")}</Text>
            </CsRowFixed>
            <CustomButton onClick={onAcceptChanges}>{t("Accept")}</CustomButton>
          </RowBetween>
        </SwapShowAcceptChanges>
      ) : null}
      <CustomAutoColumn justify="flex-start" gap="sm" style={{ padding: '24px 0 0 0px' }}>
        {trade.tradeType === TradeType.EXACT_INPUT ? (
          <Text small color="textSubtle" textAlign="left" style={{ width: '100%' }}>
            {t('Output is estimated. You will receive at least ')}
            <b>
              {slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)} {trade.outputAmount.currency.symbol}
            </b>
            {t(' or the transaction will revert.')}
          </Text>
        ) : (
          <Text small color="textSubtle" textAlign="left" style={{ width: '100%' }}>
            {t('Input is estimated. You will sell at most ')}
            <b>
              {slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)} {trade.inputAmount.currency.symbol}
            </b>
            {t(' or the transaction will revert.')}
          </Text>
        )}
      </CustomAutoColumn>
      {recipient !== null ? (
        <CustomAutoColumn justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
          <Text color="textSubtle">
            Output will be sent to{' '}
            <b title={recipient}>{isAddress(recipient) ? shortenAddress(recipient) : recipient}</b>
          </Text>
        </CustomAutoColumn>
      ) : null}
    </CustomAutoColumn>
  )
}


const CustomButton = styled(Button)`
  border-radius: 90px !important;
  width: 40%;
  box-shadow: none;
  background:#FF592C;
  @media screen {
  }
`

const CsText = styled(Text)`
  @media screen and (max-width: 320px) {
    font-size: 18px;
  }
`

const CsRowBetween = styled(RowBetween)`
 @media screen and (max-width: 320px) {
    display: grid;
    grid-template-columns: 50% 40%;
}
`

const CsRowFixed = styled(RowFixed)`
  @media screen and (max-width: 320px) {
    justify-content: space-around;
  }
`

const CsRowFixedText = styled(RowFixed)`
  @media screen and (max-width: 320px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`