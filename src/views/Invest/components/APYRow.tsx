import React, { useState } from "react";
import { Text, Flex, Button, useModal } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { CalculateIcon } from "components/Pancake-uikit";
import RoiCalculatorPool from 'components/RoiCalculatorModal/RoiCalculatorPool'
import tokens from "config/constants/tokens";
import { BIG_ZERO } from "utils/bigNumber";
import { usePriceRunBusd, usePriceBusd } from "state/farms/hooks";
import { useTranslation } from "contexts/Localization";
import { GetDataUser } from "state/poolrun";
import { useWeb3React } from "@web3-react/core";
import { BASE_BSC_URL } from "config";
import contracts from "config/constants/contracts"
import { getAddress } from "utils/addressHelpers";
import { TextCard } from "../styles";


interface ApyRowProps {
    apy: string
}
const APYRow: React.FC<ApyRowProps> = ({apy}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const [showRoiCalculator, setShowRoiCalculator] = useState(false)
    const runPriceUsd = usePriceRunBusd().toNumber()
    const busdPrice = usePriceBusd().toNumber()
    const [ dataUser ] = GetDataUser(account)
    const renderLink = `${BASE_BSC_URL}/address/${getAddress(contracts.poolRun)}`
    const [ openModal ] = useModal(
        <RoiCalculatorPool
            earningTokenPrice={busdPrice}
            stakingTokenPrice={runPriceUsd}
            apr={20}
            linkLabel={t('Get %symbol%', { symbol: tokens.Run.symbol })}
            linkHref={renderLink}
            stakingTokenBalance={BIG_ZERO}
            stakingTokenSymbol="RUN"
            earningTokenSymbol="BUSD"
            onBack={() => setShowRoiCalculator(false)}
            tokenBalance={dataUser.balanceOf}
          />
    )
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            <TextCard>APY</TextCard>
            <Flex alignItems="center" style={{gap:"8px"}}>
                <TextCard>{apy}</TextCard>
                <CalculateIcon style={{cursor:'pointer'}} onClick={openModal}/>
            </Flex>
        </Flex>
    )
}
export default APYRow