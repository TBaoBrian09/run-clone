import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
`

const ContentContainer = styled.div`
  min-height: 24px;
  align-items: center;
  display: flex;
  flex-flow: column;
  > div {
    margin-top:5px;
  }
`

interface CellLayoutProps {
  label?: string
}

const FlexCellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default FlexCellLayout
