import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@pancakeswap/sdk'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon, CogIcon,HistoryIcon} from '@phamphu19498/runtogether-uikit'
import { Link } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Nav from 'components/Menu/SubNav' 
import PageFullWidth from 'components/Layout/PageFullWidth'

import { Wrapper } from 'views/Swap/components/styleds'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'


const Body = styled(CardBody)`
  box-sizing: border-box;
  border-radius: 20px;
  margin-bottom:20px;
  /* padding:0; */
`
const Container = styled.div`
    width:100%;
    /* background:  url("/images/mask-bg-exchange.svg"), ${({ theme }) => theme.colors.gradients.bgSecondary} fixed; */
    display:flex;
    justify-content:center;
    margin-top:-18px;
    /* padding-top:1.5rem; */
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
  background: ${({ theme }) => theme.colors.background};
  /* padding:0 20px; */
  @media only screen and (max-width: 600px) {
    margin-left:16px;
    margin-right:16px;
    width: 98%;
    padding: 0;
  }
`
export const CustomFlex = styled(Flex)`
  justify-content: space-around;
`;
export const WrapButton = styled.div`
  display:flex;
  justify-content:center;
  margin:20px 0;
`;
export const WrapIcon = styled.div`
  padding:0 5px;
`;
export const CustomToken = styled(Flex)`
  margin: 20px 0;
`;

export default function Pool() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const { theme } = useTheme()
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <Text color="text" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="text" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return (
      <Text color="text" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }

  return (
    <PageFullWidth>
       <HeaderLiquidity bgColor="#4B19F5" nameTitle="run together" namePlace="Exchange"/>
      <Nav/>
      <Container>
        <WrapAppBody>
        <Wrapper id="liquidity-page">
          <AppHeader title={t('Liquidity')} subtitle={t('Add liquidity to receive LP tokens')} />
          {/* <Flex justifyContent="center" marginTop='10px'>
              <Text fontSize='48px' bold >{t('Liquidity')}</Text>
          </Flex> */}
          <WrapButton>
              <Button id="join-pool-button" as={Link} to="/add" style={{borderRadius:"90px",backgroundColor:'#FF592C',boxShadow:'none'}}>
                {t('Add Liquidity')}
              </Button>
           </WrapButton>  
          <Body>
            {renderBody()}
            {account && !v2IsLoading && (
              <Flex flexDirection="column" alignItems="center" mt="24px">
                <Text color="text" mb="8px">
                  {t("Don't see a pool you joined?")}
                </Text>
                <Button id="import-pool-link" scale="md" as={Link} to="/find" style={{borderRadius:"90px",backgroundColor:"#FF592C",boxShadow:'none'}}> 
                  {t('Find other LP tokens')}
                </Button>
              </Flex>
            )}
          </Body>
        </Wrapper>
        </WrapAppBody>
      </Container>
    </PageFullWidth>
  )
}
