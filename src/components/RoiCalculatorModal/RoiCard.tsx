import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Box, Flex, Text, IconButton } from '@phamphu19498/runtogether-uikit'
import { CheckmarkIcon, PencilIcon, Input } from 'components/Pancake-uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { CalculatorMode, RoiCalculatorReducerState } from './useRoiCalculatorReducer'



const MILLION = 1000000
const TRILLION = 1000000000000

const RoiCardWrapper = styled(Box)`
  background: ${({ theme }) => theme.colors.modalHeader} !important;
  padding: 1px;
  width: 100%;
  border-radius: 5px;
`

const RoiCardInner = styled(Box)`
  height: 120px;
  padding: 24px;
  background: #4B19F5;
  border-radius: 12px;
`

const RoiInputContainer = styled(Box)`
  position: relative;
  & > input {
    padding-left: 28px;
    max-width: 70%;
  }
  &:before {
    position: absolute;
    content: '$';
    /* color: ${({ theme }) => theme.colors.text}; */
    color: #fff;
    left: 16px;
    top: 8px;
  }
`

const RoiDisplayContainer = styled(Flex)`
  max-width: 82%;
  margin-right: 8px;
`

const RoiDollarAmount = styled(Text)<{ fadeOut: boolean }>`
  position: relative;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 0px;
  }

  ${({ fadeOut, theme }) =>
    fadeOut &&
    `
      &:after {
        background: linear-gradient(
          to right,
          ${theme.colors.background}00,
          ${theme.colors.background}E6
        );
        content: '';
        height: 100%;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        width: 40px;
      }
  `}
`

interface RoiCardProps {
  earningTokenSymbol: string
  calculatorState: RoiCalculatorReducerState
  setTargetRoi: (amount: string) => void
  setCalculatorMode: (mode: CalculatorMode) => void
}

const RoiCard: React.FC<RoiCardProps> = ({ earningTokenSymbol, calculatorState, setTargetRoi, setCalculatorMode }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { roiUSD, roiTokens, roiPercentage } = calculatorState.data
  const { mode } = calculatorState.controls

  const { t } = useTranslation()

  useEffect(() => {
    if (mode === CalculatorMode.PRINCIPAL_BASED_ON_ROI && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mode])

  const onEnterEditing = () => {
    setCalculatorMode(CalculatorMode.PRINCIPAL_BASED_ON_ROI)
  }
  const { theme } = useTheme()
  const onExitRoiEditing = () => {
    setCalculatorMode(CalculatorMode.ROI_BASED_ON_PRINCIPAL)
  }
  const handleExpectedRoiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetRoi(event.currentTarget.value)
  }
  return (
    <RoiCardWrapper>
      <RoiCardInner>
        <Text fontSize="12px" color={theme.isDark ? '#fff' : '#fff'} bold textTransform="uppercase">
          {t('ROI at current rates')}
        </Text>
        <Flex justifyContent="space-between" mt="4px" height="36px">
          {mode === CalculatorMode.PRINCIPAL_BASED_ON_ROI ? (
            <>
              <RoiInputContainer>
                <Input
                  ref={inputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  value={roiUSD}
                  placeholder="0.0"
                  onChange={handleExpectedRoiChange}
                  style={{color:'#fff', background:'none'}}
                />
              </RoiInputContainer>
              <IconButton scale="sm" variant="text" onClick={onExitRoiEditing}>
                <CheckmarkIcon color={theme.isDark ? '#fff' : '#fff'} />
              </IconButton>
            </>
          ) : (
            <>
              <RoiDisplayContainer onClick={onEnterEditing}>
                {/* Dollar sign is separate cause its not supposed to scroll with a number if number is huge */}
                <Text fontSize="24px" bold color="#fff">
                  $
                </Text>
                <RoiDollarAmount fontSize="24px" color="#fff" bold fadeOut={roiUSD > TRILLION}>
                  {roiUSD.toLocaleString('en', {
                    minimumFractionDigits: roiUSD > MILLION ? 0 : 2,
                    maximumFractionDigits: roiUSD > MILLION ? 0 : 2,
                  })}
                </RoiDollarAmount>
              </RoiDisplayContainer>
              <IconButton scale="sm" variant="text" onClick={onEnterEditing}>
                <img src='/images/penIconFarms.svg' alt='pen'/>
              </IconButton>
            </>
          )}
        </Flex>
        <Text fontSize="12px" color="#fff">
          ~ {roiTokens.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {earningTokenSymbol} (
          {roiPercentage.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          %)
        </Text>
      </RoiCardInner>
    </RoiCardWrapper>
  )
}

export default RoiCard
