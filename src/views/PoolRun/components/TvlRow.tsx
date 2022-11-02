import React from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { usePriceRunBusd } from "state/farms/hooks";
import { CalculateIcon } from "components/Pancake-uikit";
import { GetTvlPool } from "state/poolrun";

interface TvlRowProps {
    tvl: string
}
const TvlRow: React.FC<TvlRowProps> = ({tvl}) => {
    const [ dataTvl ] = GetTvlPool()
    const runPriceUsd = usePriceRunBusd().toNumber()
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            <Text>TVL</Text>
            <Text>${(dataTvl*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </Flex>
    )
}
export default TvlRow