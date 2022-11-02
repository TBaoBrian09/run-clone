import React, {useState} from "react";
import { Text, Flex, useModal } from "@phamphu19498/runtogether-uikit";
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

const ApyCol = () => {
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
        <ContainerApy>
            <Text>APY</Text>
            <Flex style={{gap:"15px"}}>
                <Text bold> 20%</Text>
                <CalculateIcon style={{cursor:'pointer'}} onClick={openModal}/>
            </Flex>
        </ContainerApy>
    )
}
export default ApyCol

const ContainerApy = styled(Flex)`
    width:17.5%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:30%;
    }
    @media screen and (max-width: 600px) {
        width:50%;
    }
`