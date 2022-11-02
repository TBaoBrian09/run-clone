import styled from 'styled-components'
import { Heading } from '@phamphu19498/runtogether-uikit'


export const ActionContainer = styled.div<{ isAutoVault?: boolean }>`
  padding: 16px;
  border-radius: 5px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;
  height:110px !important;
  background:${({ theme }) => theme.isDark ? theme.colors.input : theme.colors.backgroundTab};
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    height: ${({ isAutoVault }) => (isAutoVault ? '130px' : 'auto')};
  }
}

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 32px;
    margin-right: 0;
  }
  @media only screen and (max-width: 769px) {
   width: 100% !important;
  }
`

export const ActionTitles = styled.div`
  font-weight: 600;
  font-size: 12px;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Heading} {
    color:${({ theme }) => theme.colors.primaryBright};
  }

`
