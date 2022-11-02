import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/farms/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text, TokenPairImage } from 'components/Pancake-uikit'
// import { TokenPairImage } from 'components/Pancake-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'



export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
     padding-left: 12px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 60px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50px;
  }
`

const StyledText = styled(Text)`
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 16px;
 }
`
const StyledTextEarn = styled(Text)`
  font-size: 14px;
  color: #B1B5C3;
  font-weight: 600;
  line-height: 21px;
  font-family: 'Poppins';
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 16px;
 }
`

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/coins/${address}.png`
}
const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage variant="inverted" primarySrc={getImageUrlFromToken(token)} secondarySrc={getImageUrlFromToken(quoteToken)} thirdSrc="/images/Run_Logo.svg" width={120} height={95} />
      </TokenWrapper>
      <div style={{marginLeft:"45px"}}>
        {handleRenderFarming()}
        <StyledText bold>{label} LP</StyledText>
        <StyledTextEarn>Earn RUN</StyledTextEarn>
      </div>
    </Container>
  )
}

export default Farm
