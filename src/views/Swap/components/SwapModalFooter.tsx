import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Trade, TradeType } from '@pancakeswap/sdk'
import { Text, AutoRenewIcon, Button } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from "contexts/Localization";
import { Field } from 'state/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { CsText, CustomButton, StyledBalanceMaxMini, SwapCallbackError } from './styleds'

const SwapModalFooterContainer = styled(AutoColumn)`
  margin-top: 24px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.default};
  // border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
  @media screen and (max-width: 600px) {
    padding: 16px 0px;
  }
`

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)
  const {t} = useTranslation()

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween align="center">
          <CsText fontSize="14px">Price</CsText>
          <CsText
            fontSize="14px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <AutoRenewIcon width="14px" />
            </StyledBalanceMaxMini>
          </CsText>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <CsText fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}
            </CsText>
            <QuestionHelper
              text={t("Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.")}
              ml="4px"
            />
          </RowFixed>
          <RowFixed>
            <CsText fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </CsText>
            <CsText fontSize="14px" marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </CsText>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <CsText fontSize="14px">{t("Price Impact")}</CsText>
            <QuestionHelper text={t("The difference between the market price and your price due to trade size.")} ml="4px" />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <CsText fontSize="14px">{t("Liquidity Provider Fee")}</CsText>
            {/* <QuestionHelper
              text={
                <>
                  <Text color='#000' mb="12px">{t("For each trade a 0.25% fee is paid")}</Text>
                  <Text color='#000'>- 0.17% {t("to LP token holders")}</Text>
                  <Text color='#000'>- 0.03% {t("to the Treasury")}</Text>
                  <Text color='#000'>- 0.05% {t("towards Run buyback and burn")}</Text>
                </>
              }
              ml="4px"
            /> */}
          </RowFixed>
          <CsText fontSize="14px">
            {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
          </CsText>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow justify='center'>
        <CustomButton
          variant={severity > 2 ? 'danger' : 'primary'}
          onClick={onConfirm}
          disabled={disabledConfirm}
          mt="12px"
          id="confirm-swap-or-send"
          width="100%"
          style={{borderRadius:"10px"}} 
        >
          {severity > 2 ? t('Swap Anyway') : t('Confirm Swap')}
        </CustomButton>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
