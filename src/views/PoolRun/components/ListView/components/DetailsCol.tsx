import React from "react";
import { Text,Flex } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { ChevronUpIcon, ChevronDownIcon } from "components/Pancake-uikit";

interface DetalisPorps {
    expanded?: boolean
    onExpanded?:(newValue) => void
}

const DetailsCol: React.FC<DetalisPorps> = ({onExpanded, expanded}) => {
    const { t } = useTranslation()
    return (
        <ContainerEndsIn>
            <Flex width="100%" justifyContent="center">
                <CustomButton onClick={() => onExpanded(!expanded)}>
                    {expanded ?  t('Hide') : t('Details')}
                    {expanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                </CustomButton>
            </Flex>
        </ContainerEndsIn>
    )
}

export default DetailsCol

const ContainerEndsIn = styled(Flex)`
    width:15%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 601px) and (max-width: 1000px) {
        width:50%;
    }
    @media screen and (max-width: 600px) {
        width:50%;
    }
`
const CustomButton = styled.div`
    width:auto;
    gap:15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-weight:600;
`