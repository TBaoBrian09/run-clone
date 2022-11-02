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
