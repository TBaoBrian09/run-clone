import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { CommunityTag, CoreTag } from 'components/Tags'
import { useMatchBreakpoints, Tag } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { useFarmUser } from 'state/farms/hooks'
import { Text } from 'components/Pancake-uikit'
import { CalculateIcon } from 'components/Pancake-uikit/components/Svg'
import Apr, { AprProps } from './Apr'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'
import ActionPanel from './Actions/ActionPanel'
import CellLayout from './CellLayout'
import FlexCellLayout from './FlexCellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const cells = {
  apr: Apr,
  farm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
}
const Container = styled.div`
  width:100%;
  display:flex;
  flex-direction: column;
  margin-top:5px;
`
const RowContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction: row;
  margin-top:10px;
  margin-bottom:10px;
  align-items: center;
  justify-content: space-around;
`
const StyleEarned = styled.div`
  width:100%;
  margin-left:15px;
`
const Wrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  margin-left:10px;
`
const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;
  
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  /* background: ${({ theme }) => theme.colors.gradients.bgSecondary}; */
  background: none;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding:24px 0px 24px 0px;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: #FFFFFF !important;
  background: ${({ theme }) => theme.colors.failure};
`
const CustomText = styled(Text)`
@media only screen and (max-width: 600px) {
  font-size:14px;
}
`

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady } = props
  const hasStakedAmount = !!useFarmUser(details.pid).stakedBalance.toNumber()
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)
  const { t } = useTranslation()

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])

  const { isDesktop, isMobile } = useMatchBreakpoints()

  const isSmallerScreen = !isDesktop
  const tableSchema = isSmallerScreen ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isMobile) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          {Object.keys(props).map((key) => {
            
            console.log(props)

            const columnIndex = columnNames.indexOf(key)
            if (columnIndex === -1) {
              return null
            }

            switch (key) {
              case 'earned':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                       { props.details.isCommunity ? <CommunityTag/> : <CoreTag />  } 
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'earn':
                  return (
                    <td key={key}>
                      <CellInner>
                        <CellLayout>
                          <Details actionPanelToggled={actionPanelExpanded} />
                        </CellLayout>
                      </CellInner>
                    </td>
                )
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t('APR')}>
                        <Apr {...props.apr} hideButton={isSmallerScreen} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'multiplier':
                  return (
                    <>
                    </>
                  )
              default:
                return (
                  <td>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {React.createElement(cells[key], { ...props[key], userDataReady })}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
            }
          })}
        </StyledTr>
      )
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <td>
          <Container>
            <RowContainer>
                <CellLayout>
                  <Farm {...props.farm} />
                </CellLayout>
                  <CellLayout>
                    <Details actionPanelToggled={actionPanelExpanded} />
                  </CellLayout>
            </RowContainer>
              
            <RowContainer>
                <Wrapper>
                  <FlexCellLayout>
                    { props.details.isCommunity ? <CommunityTag/> : <CoreTag />  } 
                    {/* <MultiplierTag variant="primary"> {props.multiplier.multiplier}</MultiplierTag> */}
                  </FlexCellLayout>
                </Wrapper>
                <Wrapper>
                    <CellLayout label={t('APR')}>
                      <Apr {...props.apr} hideButton={isSmallerScreen} />
                      <CalculateIcon/>
                    </CellLayout>
                    
                </Wrapper>
                <Wrapper>
                  <StyleEarned>
                      <CellLayout label={t('Earned')}>
                        <CustomText>0.00 Run</CustomText>
                      </CellLayout>
                    </StyleEarned>
                </Wrapper>
            </RowContainer>
          </Container>
        </td>
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={6}>
            <ActionPanel {...props} expanded={actionPanelExpanded} />
          </td>
        </tr>
      )}
    </>
  )
}

export default Row
