import { Currency, Percent, Price } from '@pancakeswap/sdk'
import React from 'react'
import styled from 'styled-components'
import { Text } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { AutoColumn } from '../../components/Layout/Column'
import { AutoRow } from '../../components/Layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'

const CustomAutoColumn = styled(AutoColumn)`
    background:transparent !important;
`
function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const { t } = useTranslation()
  return (
    <CustomAutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <CustomAutoColumn justify="center">
          <Text>{price?.toSignificant(6) ?? '-'}</Text>
          <Text fontSize="14px" pt={1}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_B]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_A]?.symbol ?? '',
            })}
          </Text>
        </CustomAutoColumn>
        <CustomAutoColumn justify="center">
          <Text>{price?.invert()?.toSignificant(6) ?? '-'}</Text>
          <Text fontSize="14px" pt={1}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_A]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_B]?.symbol ?? '',
            })}
          </Text>
        </CustomAutoColumn>
        <CustomAutoColumn justify="center">
          <Text>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </Text>
          <Text fontSize="14px" pt={1}>
            {t('Share of Pool')}
          </Text>
        </CustomAutoColumn>
      </AutoRow>
    </CustomAutoColumn>
  )
}

export default PoolPriceBar
