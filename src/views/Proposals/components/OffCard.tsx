/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { ChevronUpIcon, ChevronDownIcon, OpenNewIcon, ChevronRightIcon } from "components/Pancake-uikit";

interface CardFooterProps {
    link?: string
}
const CardFooter: React.FC<CardFooterProps> = ({link}) => {
    const { t } = useTranslation()
    const [ isExpanded, setIsExpanded ] = useState(false)
    function handleClick(){
        window.open(`${link}`)
    }
    return (
        <OfferCard>
            <Flex>
                <TextTitle mr='50px'>Proposal to open a Run shoe store</TextTitle>
                <TextTitle style={{ cursor: 'pointer' }}>Detail <ChevronRightIcon /></TextTitle>
            </Flex>
            <Flex>
                <TextDate mr='20px'>End date:</TextDate>
                <Text fontSize='14px' lineHeight='20px' color='#FF592C'>01:30:22  2022.08.26</Text>
            </Flex>
            <Flex>
                <CsButton>Vote now</CsButton>
            </Flex>
        </OfferCard>
    )
}
export default CardFooter


const OfferCard = styled(Flex)`
  border: 1px solid #ccc;
  border-radius: 10px;
  flex-direction: column;
  padding: 20px 35px;
  gap: 10px;   
`

const TextTitle = styled(Text)`
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
    display: flex;
    justify-content: center;
`

const TextDate = styled(Text)`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #11142D;
`

const CsButton = styled(Button)`
    background-color: #FF592C;
    color: #FFFFFF;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    border-radius: 90px;
`