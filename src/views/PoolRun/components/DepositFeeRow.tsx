import React from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { CalculateIcon, HelpIcon, useTooltip } from "components/Pancake-uikit";
import { useTranslation } from "contexts/Localization";

interface DepositFeeProps {
    depositFee: string
}
const DepositFeeRow: React.FC<DepositFeeProps> = ({depositFee}) => {
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
            <Text>{t("Withdraw Fee")}</Text>
            <Flex alignItems="center">
                <Text>1%-3%</Text>
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