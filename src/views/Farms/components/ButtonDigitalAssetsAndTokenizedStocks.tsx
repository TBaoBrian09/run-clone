import React from 'react';
import styled from 'styled-components';
import { ButtonMenu, ButtonMenuItem } from '@phamphu19498/runtogether-uikit'
import TabButton from 'components/Pancake-uikit/components/Button/TabButton';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }
`;
const CustomButtonMenu = styled(ButtonMenu)`
  background: ${({ theme }) => theme.colors.background};
  width:550px !important;
  padding-left:0px !important;
  @media only screen and (max-width: 600px) {
    width:360px !important;
  }
`
const ButtonDigitalAssetsAndTokenizedStocks = () => {
    return (
        <Wrapper>
            <CustomButtonMenu variant="primary">
                <TabButton isActive ={!false} textBTN="Digital Assets"/>
                <TabButton isActive ={false} textBTN="Tokenized Stocks"/>
            </CustomButtonMenu>
        </Wrapper>
    );
};

export default ButtonDigitalAssetsAndTokenizedStocks;


