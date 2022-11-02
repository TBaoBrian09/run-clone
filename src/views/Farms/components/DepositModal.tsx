import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text,  LinkExternal, CalculateIcon } from 'components/Pancake-uikit'
import { Button, IconButton } from "@phamphu19498/runtogether-uikit"
import { ModalInput, ModalActions } from 'components/Modal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import { getInterestBreakdown } from 'utils/compoundApyHelpers'
import ModalFarms from 'components/Pancake-uikit/widgets/Modal/ModalFarms'

const AnnualRoiContainer = styled(Flex)`
  cursor: pointer;
`

const AnnualRoiDisplay = styled(Text)`
  overflow: hidden;
  text-align: right;
`
const Container = styled.div`
  width:100%;
`
interface DepositModalProps {
  max: BigNumber
  stakedBalance: BigNumber
  multiplier?: string
  lpPrice: BigNumber
  lpLabel?: string
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
  cakePrice?: BigNumber
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  stakedBalance,
  onConfirm,
  onDismiss,
  tokenName = '',
  multiplier,
  displayApr,
  lpPrice,
  lpLabel,
  apr,
  addLiquidityUrl,
  cakePrice,
}) => {
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const lpTokensToStake = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const usdToStake = lpTokensToStake.times(lpPrice)

  const interestBreakdown = getInterestBreakdown({
    principalInUSD: !lpTokensToStake.isNaN() ? usdToStake.toNumber() : 0,
    apr,
    earningTokenPrice: cakePrice.toNumber(),
  })

  const annualRoi = cakePrice.times(interestBreakdown[3])
  const formattedAnnualRoi = formatNumber(
    annualRoi.toNumber(),
    annualRoi.gt(10000) ? 0 : 2,
    annualRoi.gt(10000) ? 0 : 2,
  )

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  if (showRoiCalculator) {
    return (
      <RoiCalculatorModal
        linkLabel={t('Get %symbol%', { symbol: lpLabel })}
        stakingTokenBalance={stakedBalance.plus(max)}
        stakingTokenSymbol={tokenName}
        stakingTokenPrice={lpPrice.toNumber()}
        earningTokenPrice={cakePrice.toNumber()}
        apr={apr}
        multiplier={multiplier}
        displayApr={displayApr}
        linkHref={addLiquidityUrl}
        isFarm
        initialValue={val}
        onBack={() => setShowRoiCalculator(false)}
        onDismiss={onDismiss}
      />
    )
  }

  return (
    <CsModalFarms title={t('Stake LP tokens')} onDismiss={onDismiss}>
       <Container>
          <ModalInput
            value={val}
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            max={fullBalance}
            symbol={tokenName}
            addLiquidityUrl={addLiquidityUrl}
            inputTitle={t('Stake')}
          />
          <Flex mt="24px" alignItems="center" justifyContent="space-between">
            <Text mr="8px" color="textSubtle">
              {t('Annual ROI at current rates')}:
            </Text>
            <AnnualRoiContainer alignItems="center" onClick={() => setShowRoiCalculator(true)}>
              <AnnualRoiDisplay>${formattedAnnualRoi}</AnnualRoiDisplay>
              <IconButton variant="text" scale="sm">
                <CalculateIcon color="textSubtle" width="18px" />
              </IconButton>
            </AnnualRoiContainer>
          </Flex>
          <ModalActions>
            <ButtonCancel variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx} style={{borderRadius:"10px"}}>
              {t('Cancel')}
            </ButtonCancel>
            <ButtonConfirm
              width="100%"
              disabled={
                pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(fullBalanceNumber)
              }
              style={{borderRadius:"10px"}}
              onClick={async () => {
                setPendingTx(true)
                try {
                  await onConfirm(val)
                  toastSuccess(t('Staked!'), t('Your funds have been staked in the farm'))
                  onDismiss()
                } catch (e) {
                  toastError(
                    t('Error'),
                    t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                  )
                  console.error(e)
                } finally {
                  setPendingTx(false)
                }
              }}
            >
              {pendingTx ? t('Confirming') : t('Confirm')}
            </ButtonConfirm>
          </ModalActions>
          <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
            {t('Get %symbol%', { symbol: tokenName })}
          </LinkExternal>
      </Container>
    </CsModalFarms>
  )
}

export default DepositModal

const CsModalFarms = styled(ModalFarms)`
  padding: 20px;
`
const ButtonCancel = styled(Button)`
  border-radius: 90px !important;
`
const ButtonConfirm = styled(Button)`
  border-radius: 90px !important;
`