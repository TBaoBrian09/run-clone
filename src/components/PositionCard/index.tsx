import React, { useState } from 'react'
import { JSBI, Pair, Percent } from '@pancakeswap/sdk'
import {Button,Text,ChevronUpIcon,ChevronDownIcon,Card,CardBody,Flex,CardProps,AddIcon} from '@phamphu19498/runtogether-uikit'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTotalSupply from '../../hooks/useTotalSupply'

import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'

import { LightCard, CardWidthLogo } from '../Card'
import { AutoColumn } from '../Layout/Column'
import CurrencyLogo from '../Logo/CurrencyLogo'
import { DoubleCurrencyLogo } from '../Logo'
import { RowBetween, RowFixed } from '../Layout/Row'
import { BIG_INT_ZERO } from '../../config/constants'
import Dots from '../Loader/Dots'



const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`
const CustomFlex = styled(Flex)`
  background:${({ theme }) => theme.colors.modalHeader};
`
const CustomCard = styled(Card)`
  background:${({ theme }) => theme.colors.modalHeader};
  border-radius:10px;
`
const CustomCardBody = styled(CardBody)`
  background:${({ theme }) => theme.colors.modalHeader};
  border-radius:10px;
`
const CustomAutoColumn = styled(AutoColumn)`
  background:${({ theme }) => theme.colors.modalHeader};
`
const CustomCardLogo= styled(CardWidthLogo)`
   background:#fff!important;
`; 

const CustomButton = styled(Button)`
  border-radius: 90px;
  box-shadow: none;
  background:#FF592C;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #fff;
  width: 30%;
  font-weight:600;
  @media (max-width:600px){
    width:60%;
  }
`
interface PositionCardProps extends CardProps {
  pair: Pair
  showUnwrapped?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const { t } = useTranslation()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0)) ? (
        <CustomCard>
          <CustomCardBody>
            <AutoColumn gap="16px" style={{background:"transparent"}}>
              <FixedHeightRow>
                <RowFixed>
                  <Text color="text" bold>
                    {t('LP tokens in your wallet')}
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <FixedHeightRow onClick={() => setShowMore(!showMore)}>
                <RowFixed>
                  <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                  <Text small color="textSubtle">
                    {currency0.symbol}-{currency1.symbol} LP
                  </Text>
                </RowFixed>
                <RowFixed>
                  <Text>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
                </RowFixed>
              </FixedHeightRow>
              <AutoColumn gap="4px">
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {t('Share of Pool')}:
                  </Text>
                  <Text>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {t('Pooled %asset%', { asset: currency0.symbol })}:
                  </Text>
                  {token0Deposited ? (
                    <RowFixed>
                      <Text ml="6px">{token0Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {t('Pooled %asset%', { asset: currency1.symbol })}:
                  </Text>
                  {token1Deposited ? (
                    <RowFixed>
                      <Text ml="6px">{token1Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
              </AutoColumn>
            </AutoColumn>
          </CustomCardBody>
        </CustomCard>
      ) 
      : (
        <CustomCard>
        <CustomCardBody>
          <AutoColumn gap="16px" style={{background:"transparent"}}>
            <FixedHeightRow>
              <RowFixed>
                <Text color="text" bold>
                  {t('LP tokens in your wallet')}
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow onClick={() => setShowMore(!showMore)}>
              <RowFixed>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                <Text small color="textSubtle">
                  {currency0.symbol}-{currency1.symbol} LP
                </Text>
              </RowFixed>
              <RowFixed>
                <Text>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
              </RowFixed>
            </FixedHeightRow>
            <AutoColumn gap="4px">
              <FixedHeightRow>
                <Text color="textSubtle" small>
                  {t('Share of Pool')}:
                </Text>
                <Text>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
              </FixedHeightRow>
              <FixedHeightRow>
                <Text color="textSubtle" small>
                  {t('Pooled %asset%', { asset: currency0.symbol })}:
                </Text>
                {token0Deposited ? (
                  <RowFixed>
                    <Text ml="6px">{token0Deposited?.toSignificant(6)}</Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
              <FixedHeightRow>
                <Text color="textSubtle" small>
                  {t('Pooled %asset%', { asset: currency1.symbol })}:
                </Text>
                {token1Deposited ? (
                  <RowFixed>
                    <Text ml="6px">{token1Deposited?.toSignificant(6)}</Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
            </AutoColumn>
          </AutoColumn>
        </CustomCardBody>
      </CustomCard>
        // ----
        // <CustomCardLogo>
        //    <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo" width="25px"/>
        //   <Text fontSize="16px" style={{ textAlign: 'left' }}  ml="10px">
        //     {/* <span role="img" aria-label="pancake-icon">
        //       🥞
        //     </span>{' '} */}
        //     {t(
        //       "By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.",
        //     )}
        //   </Text>
        // </CustomCardLogo>
      )
      
      }
    </>
  )
}

export default function FullPositionCard({ pair, ...props }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <CustomCard style={{ borderRadius: '12px'}} {...props}>
      <CustomFlex justifyContent="space-between" role="button" onClick={() => setShowMore(!showMore)} p="16px">
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="4px">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
            <Text bold ml="8px">
              {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
            </Text>
          </Flex>
          <Text fontSize="14px" color="textSubtle">
            {userPoolBalance?.toSignificant(4)}
          </Text>
        </Flex>
        {showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </CustomFlex>

      {showMore && (
        <CustomAutoColumn gap="8px" style={{ padding: '16px' }}>
          <FixedHeightRow>
            <RowFixed>
              <CurrencyLogo size="20px" currency={currency0} />
              <Text color="textSubtle" ml="4px">
                Pooled {currency0.symbol}
              </Text>
            </RowFixed>
            {token0Deposited ? (
              <RowFixed>
                <Text ml="6px">{token0Deposited?.toSignificant(6)}</Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow>
            <RowFixed>
              <CurrencyLogo size="20px" currency={currency1} />
              <Text color="textSubtle" ml="4px">
                Pooled {currency1.symbol}
              </Text>
            </RowFixed>
            {token1Deposited ? (
              <RowFixed>
                <Text ml="6px">{token1Deposited?.toSignificant(6)}</Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow>
            <Text color="textSubtle">Share of pool</Text>
            <Text>
              {poolTokenPercentage
                ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                : '-'}
            </Text>
          </FixedHeightRow>

          {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, BIG_INT_ZERO) && (
            <Flex flexDirection="column" alignItems="center">
              <CustomButton
                as={Link}
                to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
                // variant="primary"
                // width="100%"
              >
                 Remove
              </CustomButton>
              <Button
                as={Link}
                to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                variant="text"
                startIcon={<AddIcon color="primaryBright" />}
                width="100%"
                style={{color:'#202224'}}
              >
                Add liquidity instead
              </Button>
            </Flex>
          )}
        </CustomAutoColumn>
      )}
    </CustomCard>
  )
}
