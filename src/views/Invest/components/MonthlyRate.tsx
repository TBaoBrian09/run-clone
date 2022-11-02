import React from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { CalculateIcon, HelpIcon, useTooltip } from "components/Pancake-uikit";
import { useTranslation } from "contexts/Localization";
import { TextCard } from "../styles";

interface MonthlyRateProps {
    revenue?: string
}
const MonthlyRate: React.FC<MonthlyRateProps> = ({revenue}) => {
    const { t } = useTranslation()
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
        <Flex flexDirection="column">
            <Text color="#000">{t("Fee for withdrawing within first 48h: 3%")}</Text>
            <Text color="#000">{t("Fee for withdrawing after first 48h in first month: 1%")}</Text>
            <Text color="#000">{t("No withdrawal fee after first month")}</Text>
        </Flex>,
        { placement: 'top-end', tooltipOffset: [20, 10] },
    )
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            <TextCard>{t("Revenue sharing rate")}</TextCard>
            <Flex alignItems="center">
                <TextCard>{revenue}</TextCard>
                {/* <ReferenceElement ref={targetRef}>
                    <HelpIcon color="textSubtle" />
                </ReferenceElement> 
                {tooltipVisible && tooltip} */}
            </Flex>
        </Flex>
    )
}
export default MonthlyRate

const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:5px; 
  cursor: pointer;
`