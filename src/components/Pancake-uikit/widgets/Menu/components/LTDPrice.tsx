import React from "react";
import styled from 'styled-components'
import BigNumber from "bignumber.js";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { ImageToken } from './PriceCard'

interface Props {
  ltdPriceUsd?: BigNumber;
}

const LtdPrice = styled.span`
  color:${({ theme }) => (theme.isDark ? 'white' : 'black')};
  font-size: 21px;
  margin-left: 5px;
`

const LTDPrice: React.FC<Props> = ({ ltdPriceUsd }) => {
  return ltdPriceUsd ? (
    <>
      <ImageToken src="/images/coins/0x0f7cd24e31293b162dcf6211c6ac5bd8efcb81f4.svg" alt="ltd" />
      <LtdPrice>{`$${ltdPriceUsd.toFixed(3)}`}</LtdPrice>
    </>
  ) : (
    <Skeleton marginBottom="5px" width={80} height={24} />
  );
};

export default React.memo(LTDPrice);
