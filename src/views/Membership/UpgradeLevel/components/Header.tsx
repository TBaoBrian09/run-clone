import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Heading, Text, useMatchBreakpoints } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { BackArrow, Button } from 'components/Pancake-uikit'
import useTheme from 'hooks/useTheme'

const Wrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  padding-top:20px;
  padding-bottom:20px;
  background: ${({ theme }) => theme.colors.modalHeader};
`

const Col10 = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Col90 = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = () => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const { theme } = useTheme()

  return (
    <Wrapper>
      <Col10>
        <Text color="text" fontSize="22px" textAlign="center"/>
        <Button  as={Link} to="/membership" scale="md" variant="text">
            <BackArrow color="text"/>
        </Button>
      </Col10>
      <Col90>
        <Text color="text" fontSize="22px" textAlign="center">
          Upgrade level
        </Text>
      </Col90>
    </Wrapper>
  )
}

export default Header
