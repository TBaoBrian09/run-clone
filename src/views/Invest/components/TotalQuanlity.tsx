import React, { useEffect, useState } from "react";
import { Text, Flex, Button, useModal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { Token } from "config/constants/types";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from 'contexts/Localization'
import { PlusIcon, MinusIcon, RunningIcon } from "components/Pancake-uikit";
import { TextCard } from "../styles";

// import { useApproveTokenStake } from "../hook/useApprovedTokenStake";
// import StakeModal from "./StakeModal"
// import UnStakeModal from "./UnStakeModal";

interface HarvestActionProps {
    tokenQuanlity?: string
    totalQuanlity?:string
    tokenStake?:Token
}
const TotalQuanlity: React.FC<HarvestActionProps> = ({tokenQuanlity, totalQuanlity, tokenStake}) => {
    const { t } = useTranslation()
    const imgTokenStaked = `/images/coins/${tokenStake.address[56]}.png`
    return (
        <Flex width="100%" flexDirection=   "column" mt="1rem">
            <Flex width="100%">
                <Container width="100%" justifyContent="space-between">
                    <Wrapper>
                        <TextCard>TVL</TextCard>
                        <Flex>
                            <TextCard mr='5px' mt="6px" fontSize="16px">{totalQuanlity}</TextCard>
                            <img    
                                src={imgTokenStaked}
                                alt="logo token stake"
                                style={{ width: '30px', height: '30px' }}
                            />
                        </Flex>
                    </Wrapper>
                </Container>
            </Flex>
        </Flex>
    )
}
export default TotalQuanlity

const Container = styled(Flex)`
    border-radius: 12px;
`
const Wrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`