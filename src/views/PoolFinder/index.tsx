import React, { useCallback, useEffect, useState } from 'react'
import { Currency, ETHER, JSBI, TokenAmount } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, AddIcon, useModal,Flex } from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import Header from 'views/Swap/components/Header'
import ButtonDigitalAssetsAndTokenizedStocks from 'views/Farms/components/ButtonDigitalAssetsAndTokenizedStocks'
import Nav from 'components/Menu/SubNav'
import PageFullWidth from 'components/Layout/PageFullWidth'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import { Wrapper } from 'views/Swap/components/styleds'
import { LightCard } from '../../components/Card'
import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import { CurrencyLogo } from '../../components/Logo'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row from '../../components/Layout/Row'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { PairState, usePair } from '../../hooks/usePairs'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { usePairAdder } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import StyledInternalLink from '../../components/Links'
import { currencyId } from '../../utils/currencyId'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const StyledButton = styled(Button)`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 16px;
  border: 1px solid #ddd;
`
const Container = styled.div`
    width:100%;
    /* background:  url("/images/mask-bg-exchange.svg"), ${({ theme }) => theme.colors.gradients.bgSecondary} fixed; */
    display:flex;
    justify-content:center;
    margin-top:-18px;     
`
const CustomAutoColumn = styled(AutoColumn)`
  background:transparent !important;
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

export default function PoolFinder() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <LightCard padding="45px 10px" style={{background:'#fff',border: '1px solid #ddd'}}>
      <Text textAlign="center">
        {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
      </Text>
    </LightCard>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  return (
    <PageFullWidth>
      <HeaderLiquidity bgColor="#4B19F5" nameTitle="run together" namePlace="Exchange"/>
      <Nav/>
      <Container>
      <WrapAppBody>
      <Wrapper id="find-page">
        <AppHeader title={t('Import Pool')} subtitle={t('Import an existing pool')} backTo="/pool" />
        {/* <Flex justifyContent="center" marginTop='10px'>
              <Text fontSize='48px' bold >{t('Find')}</Text>
        </Flex> */}
        <CustomAutoColumn style={{ padding: '1rem' }} gap="md">
          <StyledButton
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN0)
            }}
            style={{borderRadius:"10px"}}
          >
            {currency0 ? (
              <Row>
                <CurrencyLogo currency={currency0} />
                <Text ml="8px">{currency0.symbol}</Text>
              </Row>
            ) : (
              <Text ml="8px">{t('Select a Token')}</Text>
            )}
          </StyledButton>

          <ColumnCenter>
            <AddIcon />
          </ColumnCenter>

          <StyledButton
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN1)
            }}
            style={{borderRadius:"10px"}}
          >
            {currency1 ? (
              <Row>
                <CurrencyLogo currency={currency1} />
                <Text ml="8px">{currency1.symbol}</Text>
              </Row>
            ) : (
              <Text as={Row}>{t('Select a Token')}</Text>
            )}
          </StyledButton>

          {hasPosition && (
            <ColumnCenter
              style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
            >
              <Text textAlign="center">{t('Pool Found!')}</Text>
              <StyledInternalLink to="/pool"  style={{color:'#FF592C'}}>
                <Text textAlign="center">{t('Manage this pool.')}</Text>
              </StyledInternalLink>
            </ColumnCenter>
          )}

          {currency0 && currency1 ? (
            pairState === PairState.EXISTS ? (
              hasPosition && pair ? (
                <MinimalPositionCard pair={pair} />
              ) : (
                <LightCard padding="45px 10px" style={{background:'#fff',border: '1px solid #ddd'}}>
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center">{t('You don’t have liquidity in this pool yet.')}</Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      <Text textAlign="center"  style={{color:'#FF592C'}}>{t('Add Liquidity')}</Text>
                    </StyledInternalLink>
                  </AutoColumn>
                </LightCard>
              )
            ) : validPairNoLiquidity ? (
              <LightCard padding="45px 10px" style={{background:'#fff',border: '1px solid #ddd'}}>
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">{t('No pool found.')}</Text>
                  <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} style={{color:'#FF592C'}}>
                    {t('Create pool.')}
                  </StyledInternalLink>
                </AutoColumn>
              </LightCard>
            ) : pairState === PairState.INVALID ? (
              <LightCard padding="45px 10px" style={{background:'#fff',border: '1px solid #ddd'}}>
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center" fontWeight={500}>
                    {t('Invalid pair.')}
                  </Text>
                </AutoColumn>
              </LightCard>
            ) : pairState === PairState.LOADING ? (
              <LightCard padding="45px 10px" style={{background:'#fff',border: '1px solid #ddd'}}>
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">
                    {t('Loading')}
                    <Dots />
                  </Text>
                </AutoColumn>
              </LightCard>
            ) : null
          ) : (
            prerequisiteMessage
          )}
        </CustomAutoColumn>

        {/* <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        /> */}
      </Wrapper>
      </WrapAppBody>
      </Container>
    </PageFullWidth>
  )
}
