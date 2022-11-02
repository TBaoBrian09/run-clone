import React, {  } from "react";
import { Flex } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from 'contexts/Localization'
import { TextCard } from "../styles";

interface HarvestActionProps {
    tokenStake?: string
    totalStaked?:string
}
const Staked: React.FC<HarvestActionProps> = ({tokenStake, totalStaked}) => {
    const { t } = useTranslation()

    return (
        <Flex width="100%" flexDirection="column" mt="1rem">
            <Flex width="100%">
                <Container width="100%" justifyContent="space-between">
                    <Wrapper>
                        <TextCard><span style={{color:"#FF592C"}}>{tokenStake}</span> Staked</TextCard>
                        <Flex>
                            <TextCard mr='5px' mt="6px" fontSize="16px">{totalStaked}</TextCard>
                            <img    
                                src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png"
                                alt="logo runtogether"
                                style={{ width: '30px', height: '30px' }}
                            />
                        </Flex>
                    </Wrapper>
                </Container>
            </Flex>
        </Flex>
    )
}
export default Staked

const Container = styled(Flex)`
    border-radius: 12px;
`
const Wrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`