import React from "react";
import { Text, Flex } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { OpenNewIcon, HelpIcon, useTooltip } from "components/Pancake-uikit"; 

interface HeaderFooterProps {
    fee?:number
    linkContract?:string
}
const HeaderFooter: React.FC<HeaderFooterProps> = ({linkContract, fee}) => {
    const { t } = useTranslation()
    function handleClick(){
        window.open(`${linkContract}`)
    }
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
        <Flex flexDirection="column">
            <Text color="#000">{t("Fee for withdrawing within first 48h: 3%")}</Text>
            <Text color="#000">{t("Fee for withdrawing after first 48h in first month: 1%")}</Text>
            <Text color="#000">{t("No withdrawal fee after first month")}</Text>
        </Flex>,
        { placement: 'top-end', tooltipOffset: [20, 10] },
    )
    return (
        <ContainerHeaer>
            <Flex style={{gap:"20px"}}>
                <Text>{t("Withdraw Fee")}:</Text>
                <Flex alignItems="center">
                    <Text>1%-3%</Text>
                    <ReferenceElement ref={targetRef}>
                        <HelpIcon color="textSubtle" />
                    </ReferenceElement> 
                    {tooltipVisible && tooltip}
                </Flex>
            </Flex>
            <CustomLinkExternal onClick={handleClick}>
                <Text>View Contract</Text>
                <OpenNewIcon/>
            </CustomLinkExternal>
        </ContainerHeaer>
    )
}
export default HeaderFooter

const ContainerHeaer = styled(Flex)`
    width: 30%;
    flex-direction:column;
    justify-content: center;
    align-items: start;
    height:100%;
    gap:20px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:50%;
        height:100px;
    }
    @media screen and (max-width: 600px) {
        width:100%;
        height:100px;
    }
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
const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:5px; 
  cursor: pointer;
`