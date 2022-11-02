import React from "react";
import { Text, Flex } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import tokens from "config/constants/tokens";
import { BASE_BSC_URL } from "config";
import contracts from "config/constants/contracts"
import { getAddress } from "utils/addressHelpers";
import HeaderFooter from "./Header";
import ContainerHavestActions from "./HavestAction"
import StakeAction from "./StakeActions";

const ListFooter = () => {
    const renderLink = `${BASE_BSC_URL}/address/${getAddress(contracts.poolRun)}`
    return (
        <ContainerFooter>
            <HeaderFooter fee={1} linkContract={renderLink}/>
            <ContainerHavestActions tokenEarn={tokens.busd} totalEarn="239.00"/>
            <StakeAction tokenStake="RUN" totalStaked="1,222.98"/>
        </ContainerFooter>
    )
}
export default ListFooter

const ContainerFooter = styled(Flex)`
    width:100%;
    flex-direction: row;
    height:160px;
    flex-wrap:wrap;
    margin-top:1.5rem;
    background: #f9f9f9;
    border-radius: 16px;
    padding: 1rem;
    @media screen and (min-width:601px) and (max-width:1000px) {
        height: auto;
        padding: 2rem;
    }
    @media screen and (max-width:600px) {
        height: auto;
        padding: 1rem;
    }
    
    @keyframes rotateZ {
        0% {
            opacity: 0;
            transform: translateZ(290px);
        }
        
        80% {
            transform: translateZ(10px);
        }

        100% {
            opacity: 1;
            transform: translateZ(0);
        }
    }
    transform-origin: top center;
    animation: rotateZ 0.75s ease-in-out forwards;
`