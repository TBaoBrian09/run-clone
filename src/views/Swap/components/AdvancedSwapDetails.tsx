import React from 'react'
import { Trade, TradeType } from '@pancakeswap/sdk'
import { Text, Box, Flex } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from "contexts/Localization";
import { Field } from 'state/swap/actions'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import { CsText } from './styleds';

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  const {t} = useTranslation()

  return (
    <Box width="100%">
      <RowBetween>
        <RowFixed>
          <CsText fontSize="14px" color="textSubtle">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </CsText>
          <QuestionHelper
            text={t("Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.")}
            ml="4px"
          />
        </RowFixed>
        <RowFixed>
          <Text fontSize="16px">
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <CsText fontSize="14px" color="textSubtle">
            {t('Price Impact')}
          </CsText>
          <QuestionHelper
            text={t("The difference between the market price and estimated price due to trade size.")}
            ml="4px"
          />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <CsText fontSize="14px" color="textSubtle">
            {t('Liquidity Provider Fee')}
          </CsText>
          {/* <QuestionHelper
            text={
              <>
                <Text color='#000' mb="12px">{t('For each trade a 0.25% fee is paid')}</Text>
                <Text color='#000'>- 0.17% {t('to LP token holders')}</Text>
                <Text color='#000'>- 0.03% {t('to the Treasury')}</Text>
                <Text color='#000'>- 0.05% {t('towards Run buyback and burn')}</Text>
              </>
            }
            ml="4px"
          /> */}
        </RowFixed>
        <Text fontSize="16px">
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
        </Text>
      </RowBetween>
    </Box>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const [allowedSlippage] = useUserSlippageTolerance()
  const {t} = useTranslation()
  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <Flex width="100%" flexDirection="column">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween style={{ padding: '0 0px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <CsText fontSize="16px" color="textSubtle">
                    Route
                  </CsText>
                  <QuestionHelper
                    text={t("Routing through these tokens resulted in the best price for your trade.")}
                    ml="4px"
                  />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </Flex>
  )
}
