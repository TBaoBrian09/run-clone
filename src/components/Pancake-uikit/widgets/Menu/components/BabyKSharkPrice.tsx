import React from "react";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { PriceCard, GirdCard, ImageToken } from './PriceCard'

interface Props {
  babyKsharkPriceUsd?: number;
}

const BabyKSharkPrice: React.FC<Props> = ({ babyKsharkPriceUsd }) => {
  return babyKsharkPriceUsd ? (
    <PriceCard>
      <ImageToken src="/images/prices/bks.png" alt="bks" />
      <GirdCard>
        <Text color="textSubtle" bold>BKS</Text>
        <Text color="textSubtle" fontSize="10px">{`$${babyKsharkPriceUsd.toFixed(8)}`}</Text>
      </GirdCard>
    </PriceCard>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(BabyKSharkPrice);
