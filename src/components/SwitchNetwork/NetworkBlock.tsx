import React, { FC } from 'react'
import styled from 'styled-components'
import { Button, Text, Box } from '@phamphu19498/runtogether-uikit'
import { SvgProps } from 'components/Pancake-uikit/components/Svg/types'
import { useHistory } from 'react-router-dom'

const NetworkBlockStyled = styled(Button).attrs({ variant: "text" })`
  background-color: #FFFFFF;
  padding-top: 9px;
  width: 50px;
  border-radius:10px;
  margin-bottom: 5px;
}
`;

const BlockWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TextStyled = styled(Text)`
  fonts-size: 12px !important;
`


interface NetworkProps {
    link: string,
    Icon: FC<SvgProps>;
    name: string
  }
  
const NetworkBlock: React.FC<NetworkProps> = ({ Icon, link, name }) => {

  const history = useHistory()

  function handleClick() {
    window.location.href = link
  }

  return (
    <BlockWrapper>
      <NetworkBlockStyled
      variant="tertiary"
      onClick={handleClick}
      >
      <Icon width="38px" mb="8px" />
      </NetworkBlockStyled>
      <Text fontSize="12px">{name}</Text>
    </BlockWrapper>

  )
}

export default NetworkBlock