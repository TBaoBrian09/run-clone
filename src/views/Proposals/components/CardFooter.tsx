/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { ChevronUpIcon, ChevronDownIcon, OpenNewIcon } from "components/Pancake-uikit";

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
        <Flex mt="1rem" width="100%" flexDirection="column">
            <Flex width="100%" justifyContent="center">
                <CustomButton onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ?  t('Hide') : t('Details')}
                    {isExpanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                </CustomButton>
            </Flex>
            { isExpanded &&
                <Flex width="100%" flexDirection="column" mt="1.25rem" alignItems="end" justifyContent="flex-end">
                    <Flex flexDirection='column' width='100%'>
                        <Flex mb='10px'>
                            <CsText textTransform="uppercase" color="#B2B3BD" width='40%'>Showroom location:</CsText>
                            <CsText width='60%' textAlign='end'>81 Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho city</CsText>
                        </Flex>
                        <Flex>
                            <CsText textTransform="uppercase" color="#B2B3BD" width='40%'>Last month's revenue:</CsText>
                            <CsText width='60%' textAlign='end'>$20,800.00</CsText>
                        </Flex>
                    </Flex>
                    <CustomLinkExternal onClick={handleClick}>
                        <Text>View Contract</Text>
                        <OpenNewIcon/>
                    </CustomLinkExternal>
                </Flex>
            }
        </Flex>
    )
}
export default CardFooter

const CustomButton = styled.div`
    width:auto;
    gap:15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-weight:600;
`
const CustomLinkExternal = styled.div`
    margin-top: 10px;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:10px;
    cursor: pointer;
    ${Text}{
            color:#6C5DD3;
            font-weight:bold;
        }
        > svg {
            fill:#6C5DD3;
        }
`
const CsText = styled(Text)`
    font-size: 14px;
`