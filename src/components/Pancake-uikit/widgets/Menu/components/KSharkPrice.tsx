import React from "react";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { PriceCard, GirdCard, ImageToken } from './PriceCard'

interface Props {
  kSharkPriceUsd?: number;
}

const KSharkPrice: React.FC<Props> = ({ kSharkPriceUsd }) => {
  return kSharkPriceUsd ? (
    <PriceCard>
      <ImageToken src="/images/prices/ksc.png" alt="ksc" />
      <GirdCard>
        <Text color="textSubtle" bold>KSC</Text>
        <Text color="textSubtle" fontSize="12px">{`$${kSharkPriceUsd.toFixed(3)}`}</Text>
      </GirdCard>
    </PriceCard>
  ) : (
    <Skeleton marginBottom="5px" width={80} height={24} />
  );
};

export default React.memo(KSharkPrice);
