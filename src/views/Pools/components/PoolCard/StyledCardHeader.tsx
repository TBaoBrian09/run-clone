import React from 'react'
import { CardHeader, Heading, Text, Flex } from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import { TokenPairImage } from 'components/TokenImage'
import CakeVaultTokenPairImage from '../CakeVaultCard/CakeVaultTokenPairImage'



const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
  background:${({ theme }) => theme.colors.gradients.bgSecondary};
`
const CustomHeading = styled(Heading)`
  color:${({ theme }) => theme.colors.textSecondary} !important;
`
const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false, isStaking = false }) => {
  const { t } = useTranslation()
  const isCakePool = earningToken.symbol === 'CAKE' && stakingToken.symbol === 'CAKE'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isCakePool) {
      // manual cake
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    if (isCakePool) {
      return t('Earn CAKE, stake CAKE')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Text fontSize='20px' fontWeight={600} color="text">{getSubHeading()}</Text>
          <CustomHeading scale="md">
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </CustomHeading>
        </Flex>
        {isAutoVault ? (
          <CakeVaultTokenPairImage width={64} height={64} />
        ) : (
          <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={64} height={64} />
        )}
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
