import { Button, Flex, useModal } from '@phamphu19498/runtogether-uikit'
import BigNumber from 'bignumber.js'
import { CalculateIcon, ComputerIcon, Skeleton } from 'components/Pancake-uikit'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { Address } from 'config/constants/types'
import React, { useState } from 'react'
import styled from 'styled-components'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import tokens from "config/constants/tokens";
import { BIG_ZERO } from "utils/bigNumber";
import { useTranslation } from 'contexts/Localization'


export interface AprProps {
  value: string
  multiplier: string
  pid: number
  lpLabel: string
  lpSymbol: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  cakePrice: BigNumber
  originalValue: number
  hideButton?: boolean
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const Apr: React.FC<AprProps> = ({
  value,
  pid,
  lpLabel,
  lpSymbol,
  multiplier,
  tokenAddress,
  quoteTokenAddress,
  cakePrice,
  originalValue,
  hideButton = false,
}) => {
  const { t } = useTranslation()

  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const [showRoiCalculator, setShowRoiCalculator] = useState(false)

  const [ openModal ] = useModal(
    <RoiCalculatorModal
        earningTokenPrice={1.0025}
        stakingTokenPrice={0.009}
        apr={20}
        linkLabel={t('Get %symbol%', { symbol: tokens.Run.symbol })}
        linkHref="https://bscscan.com/token/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7"
        stakingTokenBalance={BIG_ZERO}
        stakingTokenSymbol="RUN"
        earningTokenSymbol="BUSD"
        onBack={() => setShowRoiCalculator(false)}
        initialValue="1000"
      />
)

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <ApyButton
          variant={hideButton ? 'text' : 'text-and-button'}
          pid={pid}
          lpSymbol={lpSymbol}
          lpLabel={lpLabel}
          multiplier={multiplier}
          cakePrice={cakePrice}
          apr={originalValue}
          displayApr={value}
          addLiquidityUrl={addLiquidityUrl}
        />
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}
        %
        <CalculateIcon style={{cursor:'pointer'}} onClick={openModal}/>
      </AprWrapper>
    </Container>
  )
}

export default Apr

const ButtonComputer = styled(Button)`
  background-color: none;
  background: transparent;
  z-index: 10;
`
