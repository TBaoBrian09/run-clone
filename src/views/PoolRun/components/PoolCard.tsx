import React from "react";
import styled from "styled-components";
import tokens from "config/constants/tokens";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import { useWeb3React } from "@web3-react/core";
import { BASE_BSC_URL } from "config";
import contracts from "config/constants/contracts"
import { getAddress } from "utils/addressHelpers";
import ConnectWalletButton from 'components/ConnectWalletButton';
import APYRow from "./APYRow";
import TvlRow from "./TvlRow"
import DepositFeeRow from "./DepositFeeRow";
import HarvestAction from "./HarvestAction";
import CardHeading from "./CardHeading"
import StakeAction from "./StakeAction";
import CardFooter from "./CardFooter"

const PoolCard = () => {
    const { account } = useWeb3React()
    const renderLink = `${BASE_BSC_URL}/address/${getAddress(contracts.poolRun)}`
    return (
        <PCard>
            <CardHeading
                tokenEarn={tokens.busd}
                tokenStake={tokens.Run}
            />
            <APYRow apy="20.00 %"/>
            <TvlRow tvl="1,999,879.00"/>
            <DepositFeeRow depositFee="1"/>
            <HarvestAction tokenEarnName="BUSD" totalEarn="239.00"/>
            { account ?
                <StakeAction
                    tokenStake="RUN"
                    totalStaked="1,222.98"
                />
            :
                <CustomConnectWallet/>
            }
            <CardFooter
                link={renderLink}
            />
        </PCard>
    )
}
export default PoolCard

const PCard = styled(Flex)`
    flex-direction: column;
    width: 376px;
    height: fit-content;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding:15px;
    margin-bottom:1.25rem;
`
const CustomConnectWallet = styled(ConnectWalletButton)`
    width: 100%;
    background: #FF592C;
    border-radius: 90px;
    color:#fff;;
    box-shadow:none;
    height:55px;
    margin-top:1rem;
`