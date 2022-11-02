import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import {
  Text,
  Flex,
  ButtonMenu,
  HelpIcon,
  ButtonMenuItem,
  Modal,
  Button,  useTooltip
} from '@phamphu19498/runtogether-uikit'
import { BalanceInput, Checkbox } from 'components/Pancake-uikit'
import BigNumber from 'bignumber.js'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import RoiCalculatorFooter from './RoiCalculatorFooter'
import RoiCard from './RoiCard'
import useRoiCalculatorReducer, { CalculatorMode, EditingCurrency } from './useRoiCalculatorReducer'
import AnimatedArrow from './AnimatedArrow'



interface RoiCalculatorModalProps {
  onDismiss?: () => void
  onBack?: () => void
  earningTokenPrice: number
  apr: number
  displayApr?: string
  linkLabel: string
  linkHref: string
  stakingTokenBalance: BigNumber
  stakingTokenSymbol: string
  stakingTokenPrice: number
  earningTokenSymbol?: string
  multiplier?: string
  autoCompoundFrequency?: number
  performanceFee?: number
  isFarm?: boolean
  initialValue?: string
}

const StyledModal = styled(Modal)`
  width: 500px;
  padding: 0;
  & > :nth-child(2) {
    padding: 0;
  }

`

const ScrollableContainer = styled.div`
  padding: 24px;
  max-height: 600px;
  height: 100%;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e2e2;
    border-radius: 8px;
}
`

const FullWidthButtonMenu = styled(ButtonMenu)<{ disabled?: boolean }>`
  width: 100%;
  background:none !important;
  border:none !important;
  & > button {
    width: 100%;
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = ({
  onDismiss,
  earningTokenPrice,
  apr,
  displayApr,
  linkLabel,
  linkHref,
  stakingTokenBalance,
  stakingTokenSymbol,
  stakingTokenPrice,
  multiplier,
  initialValue,
  earningTokenSymbol = 'BUSD',
  autoCompoundFrequency = 0,
  performanceFee = 0,
  isFarm = false,
}) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const balanceInputRef = useRef<HTMLInputElement | null>(null)
  const {
    state,
    setPrincipalFromUSDValue,
    setPrincipalFromTokenValue,
    setStakingDuration,
    toggleCompounding,
    toggleEditingCurrency,
    setCompoundingFrequency,
    setCalculatorMode,
    setTargetRoi,
  } = useRoiCalculatorReducer(stakingTokenPrice, earningTokenPrice, apr, autoCompoundFrequency, performanceFee)

  const { compounding, activeCompoundingIndex, stakingDuration, editingCurrency } = state.controls
  const { principalAsUSD, principalAsToken } = state.data

  // Auto-focus input on opening modal
  useEffect(() => {
    if (balanceInputRef.current) {
      balanceInputRef.current.focus()
    }
  }, [])

  // If user comes to calculator from staking modal - initialize with whatever they put in there
  useEffect(() => {
    if (initialValue) {
      setPrincipalFromTokenValue(initialValue)
    }
  }, [initialValue, setPrincipalFromTokenValue])

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    isFarm
      ? t('“My Balance” here includes both LP Tokens in your wallet, and LP Tokens already staked in this farm.')
      : t(
          '“My Balance” here includes both %assetSymbol% in your wallet, and %assetSymbol% already staked in this pool.',
          { assetSymbol: stakingTokenSymbol },
        ),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  const onBalanceFocus = () => {
    setCalculatorMode(CalculatorMode.ROI_BASED_ON_PRINCIPAL)
  }
  const { theme } = useTheme()
  const StakeAcitive={
    "background": "#FF592C",
    'color':'#fff',
    'borderRadius':'90px'
  }
  const StakedeActive={
    'background':"none",
    'color':"#000",
    'borderRadius':'90px',
    'border':'1px solid #E6E8EC'
  }
  const CustomButton = styled(Button)<{isActive?: boolean}>`
    background: ${({ isActive }) => isActive ? " #FF592C" : "transparent"};
    border: 2px solid ${({ isActive }) => isActive ? "transparent" : "#E6E8EC"};
    border-radius: 90px;
    color:${({ isActive }) => isActive ? " #FFF" : "#000"};
    box-shadow:none;
    height: 30px;
  `
  
  const editingUnit = editingCurrency === EditingCurrency.TOKEN ? stakingTokenSymbol : 'USD'
  const editingValue = editingCurrency === EditingCurrency.TOKEN ? principalAsToken : principalAsUSD
  const conversionUnit = editingCurrency === EditingCurrency.TOKEN ? 'USD' : stakingTokenSymbol
  const conversionValue = editingCurrency === EditingCurrency.TOKEN ? principalAsUSD : principalAsToken
  const onUserInput = editingCurrency === EditingCurrency.TOKEN ? setPrincipalFromTokenValue : setPrincipalFromUSDValue
  return (
    <StyledModal
      title=""
      onDismiss={onDismiss}
      // onBack={onBack ?? null}
    >
      <ScrollableContainer>
        <Text fontSize='22px' mb="1rem" bold textAlign="center">ROI Calculator</Text>
        <Flex flexDirection="column" mb="8px">
          <Text color={theme.isDark ? '#fff' : '#101133'} bold fontSize="12px" textTransform="uppercase">
            {t('%asset% staked', { asset: stakingTokenSymbol })}
          </Text>
          <BalanceInput
            currencyValue={`${conversionValue} ${conversionUnit}`}
            innerRef={balanceInputRef}
            placeholder="0.00"
            value={editingValue}
            unit={editingUnit}
            onUserInput={onUserInput}
            switchEditingUnits={toggleEditingCurrency}
            onFocus={onBalanceFocus}
            style={{background:theme.isDark ? 'rgba(255, 255, 255, 0.2' : 'rgba(16, 17, 51, 0.05)',border:"none"}}
          />
          <Flex justifyContent="space-between" mt="8px">
            <CustomButton
              scale="xs"
              p="4px 16px"
              width="68px"
              isActive={principalAsUSD==='100'}
              onClick={() => setPrincipalFromUSDValue('100')}
            >
              $100
            </CustomButton>
            <CustomButton
              scale="xs"
              p="4px 16px"
              width="68px"
              isActive={principalAsUSD==='1000'}
              onClick={() => setPrincipalFromUSDValue('1000')}
             
            >
              $1000
            </CustomButton>
            <CustomButton
              disabled={stakingTokenBalance.lte(0) || !account}
              scale="xs"
              p="4px 16px"
              width="128px"
              isActive={false}
              onClick={() =>
                setPrincipalFromUSDValue(getBalanceNumber(stakingTokenBalance.times(stakingTokenPrice), 18).toString())
              }
            >
              {t('My Balance').toLocaleUpperCase()}
            </CustomButton>
            <span ref={targetRef}>
              {/* <HelpIcon width="16px" height="16px" color="#A95EEA"/> */}
              <img src='/images/helpFarms.svg' alt='help'/>
            </span>
            {tooltipVisible && tooltip}
          </Flex>
          <Text mt="24px" color={theme.isDark ? '#fff' : '#101133'} bold fontSize="12px" textTransform="uppercase">
            {t('Staked for')}
          </Text>
          <FullWidthButtonMenu activeIndex={stakingDuration} onItemClick={setStakingDuration} scale="sm">
            <ButtonMenuItem style={stakingDuration===0? StakeAcitive:StakedeActive}>{t('1D')}</ButtonMenuItem>
            <ButtonMenuItem style={stakingDuration===1? StakeAcitive:StakedeActive}>{t('7D')}</ButtonMenuItem>
            <ButtonMenuItem style={stakingDuration===2? StakeAcitive:StakedeActive}>{t('30D')}</ButtonMenuItem>
            <ButtonMenuItem style={stakingDuration===3? StakeAcitive:StakedeActive}>{t('1Y')}</ButtonMenuItem>
            <ButtonMenuItem style={stakingDuration===4? StakeAcitive:StakedeActive}>{t('5Y')}</ButtonMenuItem>
          </FullWidthButtonMenu>
          {autoCompoundFrequency === 0 && (
            <>
              <Text mt="24px" color="textSubtle" bold fontSize="12px" textTransform="uppercase">
                {t('Compounding every')}
              </Text>
              <Flex alignItems="center">
                <Flex flex="1">
                  <CheckboxCustom scale="sm" checked={compounding} onChange={toggleCompounding}/>
                </Flex>
                <Flex flex="6">
                  <FullWidthButtonMenu
                    disabled={!compounding}
                    activeIndex={activeCompoundingIndex}
                    onItemClick={setCompoundingFrequency}
                    scale="sm"
                  >
                    <ButtonMenuItem style={activeCompoundingIndex===0? StakeAcitive:StakedeActive}>{t('1D')}</ButtonMenuItem>
                    <ButtonMenuItem style={activeCompoundingIndex===1? StakeAcitive:StakedeActive}>{t('7D')}</ButtonMenuItem>
                    <ButtonMenuItem style={activeCompoundingIndex===2? StakeAcitive:StakedeActive}>{t('14D')}</ButtonMenuItem>
                    <ButtonMenuItem style={activeCompoundingIndex===3? StakeAcitive:StakedeActive}>{t('30D')}</ButtonMenuItem>
                  </FullWidthButtonMenu>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
        <AnimatedArrow calculatorState={state} />
        <Flex>
          <RoiCard
            earningTokenSymbol={earningTokenSymbol}
            calculatorState={state}
            setTargetRoi={setTargetRoi}
            setCalculatorMode={setCalculatorMode}
          />
        </Flex>
      </ScrollableContainer>
      <RoiCalculatorFooter
        isFarm={isFarm}
        apr={apr}
        displayApr={displayApr}
        autoCompoundFrequency={autoCompoundFrequency}
        multiplier={multiplier}
        linkLabel={linkLabel}
        linkHref={linkHref}
        performanceFee={performanceFee}
      />
    </StyledModal>
  )
}

export default RoiCalculatorModal

const CheckboxCustom = styled(Checkbox)`
  background-color: #5DCB83;
  border-radius: 0;
  color: #fff;
  border: none;
  &:checked {
    border-color: #5DCB83 !important;
    &:after {
      border-color: #fff;
    }
  }
`