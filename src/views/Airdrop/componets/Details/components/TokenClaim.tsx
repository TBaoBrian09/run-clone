import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Flex } from "@phamphu19498/runtogether-uikit"
import { useTranslation } from "contexts/Localization";
import { FetchAmountClaim } from "hooks/useAirdrop"

interface Props {
    itemReward:any,
    airdropContract:any
}
const TokenClaim: React.FC<Props> = ({itemReward, airdropContract}) => {
    const {amount} = FetchAmountClaim(itemReward.address, airdropContract)
    const realValue = amount.toNumber()/1E18;
    if (realValue) {
        return <Text color="primaryBright" >{realValue.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${itemReward.symbol}</Text>;
    } 
    return <></>;
}
export default TokenClaim