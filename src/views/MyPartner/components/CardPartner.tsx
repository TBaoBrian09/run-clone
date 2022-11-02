import React from "react";
import styled from "styled-components";
import { Text, Flex } from "@phamphu19498/runtogether-uikit";

const CardPartner = () =>{
    return(
        <Container>
            <Avatar src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="avatar"/>
            <Flex ml="10px" flexDirection="column">
                <Text bold>Jonathan Marthew</Text>
                <Text color="#80868B">Dealer</Text>
            </Flex>
        </Container>
    )
}
export default CardPartner

const Container = styled(Flex)`
    height: 70px;
    flex-direction:row;
    align-items: center;
    padding-left:10px;
    border-radius:12px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
    width: 360px;
    border: 1px solid rgba(194, 194, 194, 0.4);
    margin-bottom:1rem;
`

const Avatar = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow:hidden;
`