import React, { useState } from "react";
import { Text, Flex } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import tokens from "config/constants/tokens";
import { GetEndTimePool } from "state/poolrun/index"
import HeaderListView from "./Header";
import ApyCol from "./APY";
import TvlCol from "./TvlCol";
import EndsInCol from "./endinsCol";
import DetailsCol from "./DetailsCol"
import ListFooter from "../ListFooter/index"

const PoolRow = () => {
    const [ isExpanded, setIsExpanded ] = useState(false)
    const [ endTimePool ] = GetEndTimePool()
    
    return (
        <ContainerRow>
            <Flex width="100%" height="100%" flexWrap="wrap">
                <HeaderListView tokenEarn={tokens.busd} tokenStake={tokens.Run}/>
                <ApyCol/>
                <TvlCol/>
                <EndsInCol endDate={endTimePool*1000}/>
                <DetailsCol expanded={isExpanded} onExpanded={(newValue)=>setIsExpanded(newValue)}/>
            </Flex>
            { isExpanded &&
                <ListFooter/>
            }
        </ContainerRow>
    )
}
export default PoolRow

const ContainerRow = styled(Flex)`
    width: 100%;
    flex-direction: column;
    box-shadow: inset 0px -1px 0px #E4E4E4;
    padding:1rem 0rem 1rem 0rem;
    height: auto;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        height: auto;
    }
    @media screen and (max-width: 600px) {
       height: auto;
    }
`
