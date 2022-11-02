import { Cart, Flex, Text } from '@phamphu19498/runtogether-uikit';
import React from 'react';
import styled from 'styled-components'

const ShoppingCart = () => {
    return (
        <ContainerCart>
            <TotalProduct>1</TotalProduct>
            <Cart />
        </ContainerCart>
    );
};

export default ShoppingCart;

const ContainerCart = styled(Flex)`
  position: relative;
  cursor: pointer;
  margin-right: 8px;
`

const TotalProduct = styled(Text)`
   position: absolute;
  top: -4px;
  right: -8px;
  background: #ff592c;
  color: #ffffff;
  width: 15px;
  height: 16px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 12px;
`