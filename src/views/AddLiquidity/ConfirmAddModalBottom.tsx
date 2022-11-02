import { Currency, CurrencyAmount, Fraction, Percent } from '@pancakeswap/sdk'
import React from 'react'
import { Text, Button,Flex} from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import { CurrencyLogo } from '../../components/Logo'
import { Field } from '../../state/mint/actions'

const CustomButton = styled(Button)`
  border-radius: 90px !important;
  width: 60% !important;
  /* padding: 0px 125px !important; */
  box-shadow: none;
  background: #FF592C;
`
function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { t } = useTranslation()
  return (
    <>
      <RowBetween>
        <Text>{t('%asset% Deposited', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>{t('%asset% Deposited', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>{t('Rates')}</Text>
        <Text>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Text>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween>
        <Text>{t('Share of Pool')}:</Text>
        <Text>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </RowBetween>
      <Flex justifyContent="center">
        <CustomButton onClick={onAdd} mt="20px" width="100%">
          {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
        </CustomButton>
      </Flex>
    </>
  )
}

export default ConfirmAddModalBottom
