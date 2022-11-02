import React, { useCallback } from 'react'
import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import {
  Text,
  ArrowUpIcon,
  MetamaskIcon,
  Flex,
  Box,
  Link,
  Spinner,
  Modal,
  InjectedModalProps,
  Button,
} from '@phamphu19498/runtogether-uikit'

import { registerToken } from 'utils/wallet'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { ErrorBigIcon, ErrorIcon } from 'components/Pancake-uikit'
import { RowFixed } from '../Layout/Row'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getBscScanLink } from '../../utils'



const Wrapper = styled.div`
  width: 100%;
`
const Section = styled(AutoColumn)`
  /* padding: 24px; */
  background:transparent !important;
`

const ConfirmedIcon = styled(ColumnCenter)`
  /* padding: 24px 0; */
`
const CustomLoader = styled.svg`
  height:5rem;
  width:5rem;
  border-top-width: 4px;
  margin-left: auto;
  margin-right: auto;
  color:${({ theme }) => theme.colors.text};
  border-top: 3px solid ${({ theme }) => theme.colors.text};
  animation: spin 1s linear infinite;
  border-radius:50%;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
const CustomAutoColumn = styled(AutoColumn)`
  background:transparent !important;
`
const CustomButton = styled(Button)`
  border-radius: 90px !important;
  box-shadow: none;
  background:#FF592C;
  width: 80%;
  @media screen  and (max-width: 600px){
     padding: 0px;
  }
`
function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
 
  return (
    <Wrapper>
      <ConfirmedIcon>
        {/* <CustomSpinner alt="loading" src="/images/loading.gif" /> */}
        <CustomLoader width="5rem" height="5rem"/>
      </ConfirmedIcon>
      <CustomAutoColumn gap="12px" justify="center">
        <Text fontSize="20px">{t('Waiting For Confirmation')}</Text>
        <CustomAutoColumn gap="12px" justify="center">
          <Text bold small textAlign="center">
            {pendingText}
          </Text>
        </CustomAutoColumn>
        <Text small color="textSubtle" textAlign="center">
          {t('Confirm this transaction in your wallet')}
        </Text>
      </CustomAutoColumn>
    </Wrapper>
  )
}

function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { library } = useActiveWeb3React()

  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Section>
        <ConfirmedIcon>
          <ArrowUpIcon strokeWidth={0.5} width="90px" color="primary" />
        </ConfirmedIcon>
        <CustomAutoColumn gap="12px" justify="center">
          <Text fontSize="20px">{t('Transaction Submitted')}</Text>
          {chainId && hash && (
            <Link external small href={getBscScanLink(hash, 'transaction', chainId)} style={{color:'#202224'}}>
              {t('View on BscScan')}
            </Link>
          )}
          
          {currencyToAdd && library?.provider?.isMetaMask && (
            <CustomButton
              // variant="tertiary"
              mt="12px"
              width="fit-content"
              onClick={() => registerToken(token.address, token.symbol, token.decimals)}
            >
              <RowFixed>
                {/* {t('Add %asset% to Metamask', { asset: currencyToAdd.symbol })} */}
                {t('Add to Metamask')}
                <MetamaskIcon width="16px" ml="6px" />
              </RowFixed>
            </CustomButton>
          )}
          <CustomButton onClick={onDismiss} mt="20px">
            {t('Close')}
          </CustomButton>
        </CustomAutoColumn>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <CustomAutoColumn justify="center">
        <ErrorBigIcon color="blue"  width="64px" />
        <Text color="failure" style={{ textAlign: 'center', width: '85%' }}>
          {message}
        </Text>
      </CustomAutoColumn>

      <Flex justifyContent="center" pt="24px">
        <CustomButton onClick={onDismiss} width="100%">{t('Dismiss')}</CustomButton>
      </Flex>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <CsModal title={title} headerBackground="color.text" onDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
      {/* <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        /> */}
    </CsModal>
  )
}

export default TransactionConfirmationModal

const CsModal = styled(Modal)`
  /* padding: 10px; */
  padding: 50px 0 0px;
  @media screen and (max-width: 600px) {
      & > div {
        padding: 24px;
      }
  }

`