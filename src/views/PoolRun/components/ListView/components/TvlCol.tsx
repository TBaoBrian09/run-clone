import React, {useState} from "react";
import { Text, Flex, useModal } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { GetTvlPool } from "state/poolrun";
import { usePriceRunBusd } from "state/farms/hooks";

interface TvlColProps {
    tvl?: string
}
const TvlCol: React.FC<TvlColProps> = ({tvl}) => {
    const [ dataTvl ] = GetTvlPool()
    const runPriceUsd = usePriceRunBusd().toNumber()
    return (
        <ContainerApy>
            <Text>TVL</Text>
            <Flex style={{gap:"15px"}}>
                <Text bold>${(dataTvl*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </Flex>
        </ContainerApy>
    )
}
export default TvlCol

const ContainerApy = styled(Flex)`
    width:17.5%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width: 30%;
    }
    @media screen and (max-width: 600px) {
        width:50%;
    }
`