import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from '@phamphu19498/runtogether-uikit'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  margin-top: 24px;
  align-items: center;
  justify-content: center;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 600;
  justify-content: center;
  color: #A95EEA;
  > svg{
    fill: #A95EEA;
  }
  :hover{
    color: #9127ee !important;
    > svg {
    color: #9127ee !important;
      fill: #9127ee ;
    }
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      {/* <Flex justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text style={{marginLeft:"10px"}}>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex> */}
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
      )}
      <StyledLinkExternal href={bscScanAddress}>{t('View Contract')}</StyledLinkExternal>
    </Wrapper>
  )
}

export default DetailsSection
