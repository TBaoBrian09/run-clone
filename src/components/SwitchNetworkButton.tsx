import React from 'react'
import { Button, Text, Dropdown } from 'components/Pancake-uikit'
import { useMatchBreakpoints } from "components/Pancake-uikit/hooks/index";
import { useModal } from '@phamphu19498/runtogether-uikit'
import BinanceChain from "components/Pancake-uikit/components/Svg/Icons/BinanceChain";
import SwitchNetworkModal from 'components/SwitchNetwork/Index'
import styled from 'styled-components'


const ButtonStyled = styled(Button) `
  display:flex;
  flex-direction: row;
  padding: 0px;
  border-radius: 11px;
  height: 35px;
  margin-right: 10px;
  border:1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(106.94deg, rgba(255, 255, 255, 0.17) 24.69%, rgba(255, 255, 255, 0.1) 82.76%);
  justify-content;
  align-items: center;
  padding:5px;
`

const SwitchNetworkButton = (props) => {
  const [ onPresentSwitchNetworkModal ] = useModal(<SwitchNetworkModal />)
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

  return (
    <div>
      <ButtonStyled role="button" onClick={onPresentSwitchNetworkModal} {...props}>
        <BinanceChain  width="24px"/>
        { !isMobile && <Text ml="3px" color="#fff">BSC</Text> }
      </ButtonStyled>
    </div>
  )
}

export default SwitchNetworkButton
