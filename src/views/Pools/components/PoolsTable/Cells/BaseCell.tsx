import { Flex, Text } from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'



const BaseCell = styled.div`
  color: black;

  padding: 24px 8px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const CellContent = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  max-height: 40px;
  padding-left:5px;
  align-items:flex-start;
  ${Text} {
    line-height: 1;
  }
`

export default BaseCell
