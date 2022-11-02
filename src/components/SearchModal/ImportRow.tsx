import React, { CSSProperties } from 'react'
import { Token } from '@pancakeswap/sdk'
import { Button, Text, CheckmarkCircleIcon } from '@phamphu19498/runtogether-uikit'
import { AutoRow, RowFixed } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import CurrencyLogo from 'components/Logo/CurrencyLogo'
import { ListLogo } from 'components/Logo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import styled from 'styled-components'
import { useIsUserAddedToken, useIsTokenActive } from 'hooks/Tokens'
import { useTranslation } from 'contexts/Localization'



const TokenSection = styled.div<{ dim?: boolean }>`
  padding: 4px 20px;
  height: 46px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  align-items: center;
  margin-top:1rem;
  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`

const CheckIcon = styled(CheckmarkCircleIcon)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.colors.success};
`

const NameOverflow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`
const CustomAutoColumn = styled(AutoColumn)`
  background:none;
`
export default function ImportRow({
  token,
  style,
  dim,
  showImportView,
  setImportToken,
}: {
  token: Token
  style?: CSSProperties
  dim?: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
}) {
  // globals
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  // check if token comes from list
  const inactiveTokenList = useCombinedInactiveList()
  const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token)
  const isActive = useIsTokenActive(token)

  return (
    <TokenSection style={style}>
      <CurrencyLogo currency={token} size="24px" style={{ opacity: dim ? '0.6' : '1' }} />
      <CustomAutoColumn gap="4px" style={{ opacity: dim ? '0.6' : '1' }}>
        <AutoRow>
          <Text>{token.symbol}</Text>
          <Text color="textDisabled" ml="8px">
            <NameOverflow title={token.name}>{token.name}</NameOverflow>
          </Text>
        </AutoRow>
        {list && list.logoURI && (
          <RowFixed>
            <Text small mr="4px" color="textSubtle">
              {t('via')} {list.name}
            </Text>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </RowFixed>
        )}
      </CustomAutoColumn>
      {!isActive && !isAdded ? (
        <Button
          scale='sm'
          onClick={() => {
            if (setImportToken) {
              setImportToken(token)
            }
            showImportView()
          }}
        >
          {t('Import')}
        </Button>
      ) : (
        <RowFixed style={{ minWidth: 'fit-content' }}>
          <CheckIcon />
          <Text color="success">Active</Text>
        </RowFixed>
      )}
    </TokenSection>
  )
}
