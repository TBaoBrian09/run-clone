import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, PancakeToggle, Flex, Modal, InjectedModalProps } from '@phamphu19498/runtogether-uikit'
// import { Modal } from 'components/Pancake-uikit'
import Toggle from 'components/Pancake-uikit/components/Toggle/Toggle'
import { useAudioModeManager, useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { useSwapActionHandlers } from 'state/swap/hooks'
import usePersistState from 'hooks/usePersistState'
import useTheme from 'hooks/useTheme'
import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'


// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
const PancakeToggleWrapper = styled.div`
  .pancakes {
    position: absolute;
  }
`
const CustomModal = styled(Modal)`
  padding: 24px!important;

  @media screen and (max-width: 600px) {
    padding: 24px 0px !important;
  }

`

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [rememberExpertModeAcknowledgement, setRememberExpertModeAcknowledgement] = usePersistState(false, {
    localStorageKey: 'pancake_expert_mode_remember_acknowledgement',
  })
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()
  const { theme } = useTheme()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setRememberExpertModeAcknowledgement={setRememberExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (rememberExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <CustomModal
      title={t('Settings')}
      onDismiss={onDismiss}
      maxWidth='100%'
      minWidth='320px'
      // padding="0"
    >
      <Flex flexDirection="column">
        {/* <Flex pb="24px" flexDirection="column">
          <Text bold textTransform="uppercase" fontSize="18px" color="primary" mb="24px">
            {t('Global')}
          </Text>
          <GasSettings />
        </Flex> */}
         <Flex pt="5px" flexDirection="column" > {/* borderTop={`1px ${theme.colors.cardBorder} solid`} */}
          {/* <Text bold textTransform="uppercase" fontSize="18px" color="primary" mb="24px">
            {t('Swaps & Liquidity')}
          </Text> */}
          <TransactionSettings />
        </Flex>
        {/* <Flex justifyContent="space-between" alignItems="center" mb="24px">
          <Flex alignItems="center">
            <Text>{t('Expert Mode')}</Text>
            <QuestionHelper
              text={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
              placement="top-start"
              ml="4px"
            />
          </Flex>
          <Toggle id="toggle-expert-mode-button" scale="md" checked={expertMode} onChange={handleExpertModeToggle} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="24px">
          <Flex alignItems="center">
            <Text>{t('Disable Multihops')}</Text>
            <QuestionHelper text={t('Restricts swaps to direct pairs only.')} placement="top-start" ml="4px" />
          </Flex>
          <Toggle
            id="toggle-disable-multihop-button"
            checked={singleHopOnly}
            scale="md"
            onChange={() => {
              setSingleHopOnly(!singleHopOnly)
            }}
          />
        </Flex> */}
        {/* <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Text>{t('Flippy sounds')}</Text>
            <QuestionHelper
              text={t('Fun sounds to make a truly immersive pancake-flipping trading experience')}
              placement="top-start"
              ml="4px"
            />
          </Flex>
          <PancakeToggleWrapper>
            <Toggle checked={audioPlay} onChange={toggleSetAudioMode} scale="md" />
          </PancakeToggleWrapper>
        </Flex> */}
      </Flex>
    </CustomModal>
  )
}

export default SettingsModal
