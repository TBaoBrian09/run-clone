import React from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { CalculateIcon, HelpIcon, useTooltip } from "components/Pancake-uikit";
import { useTranslation } from "contexts/Localization";
import { TextCard } from "../styles";

interface DepositFeeProps {
    depositFee: string
}
const DepositFeeRow: React.FC<DepositFeeProps> = ({depositFee}) => {
    const { t } = useTranslation()
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
        <Flex flexDirection="column">
            <Text color="#000">{t("Fee for withdrawing before first 6 months: 2%")}</Text>
            <Text color="#000">{t("No withdraw fee after 6 months")}</Text>
        </Flex>,
        { placement: 'top-end', tooltipOffset: [20, 10] },
    )
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            <TextCard>{t("Withdraw fee")}</TextCard>
            <Flex alignItems="center">
                <TextCard>{depositFee}</TextCard>
                <ReferenceElement ref={targetRef}>
                    <HelpIcon color="textSubtle" />
                </ReferenceElement> 
                {tooltipVisible && tooltip}
            </Flex>
        </Flex>
    )
}
export default DepositFeeRow

const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:5px; 
  cursor: pointer;
`