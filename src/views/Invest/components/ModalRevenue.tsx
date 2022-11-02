import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Modal, AutoRenewIcon } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { GetListSnapshot } from "state/poolProposals";
import RowRevenue from "./RowHistoryRevenue"
import { GetSnapshotCount, GetSnapshotList} from "../hook/fetchDataPoolStore"
import { GetDataPoolLength } from "../hook/fetchPoolLength";

interface RevenueProps {
    onDismiss?: () => void
    poolStoreAddress:string
}

const RevenueModal: React.FC<RevenueProps> = ({onDismiss, poolStoreAddress}) => {
    const { t } = useTranslation()
    const {poolLength} = GetDataPoolLength(poolStoreAddress)
    const { snapshotList } = GetSnapshotList(poolStoreAddress, poolLength)
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{t("History Revenue")}</Text>
                <HeaderTable>
                    <ColTime>
                        <CsText color="#B1B5C3" textTransform="uppercase">TIME</CsText>
                    </ColTime>
                    <ColBlock>
                        <CsText color="#B1B5C3" textTransform="uppercase">Block Number</CsText>
                    </ColBlock>
                    <ColToken>
                        <CsTextAmount color="#B1B5C3" textTransform="uppercase">Token a snapshot</CsTextAmount>
                    </ColToken>
                </HeaderTable>
                <ContainerRevenue isScroll={snapshotList.length > 3 ? !false : false} isSrollDesktop={snapshotList.length > 6 ? !false : false}>
                    { snapshotList.length === 0 ?
                        <Text width="100%" textAlign="center" mt="1.5rem">No Data</Text>
                    :
                        <>
                            {snapshotList.map((item) => (
                                <RowRevenue 
                                    blockNumber={item.lastRewardBlock}
                                    amount={item.totalProfitAmount}
                                    timeStamp={item.lastTimestamp}
                                    isScroll={snapshotList.length > 3 ? !false : false}
                                />
                            ))}
                        </>
                    }
                </ContainerRevenue>
                
            </Container>
        </CustomModal>
    )
}
export default RevenueModal
const CustomModal = styled(Modal)`
    padding:0px;
`
const Container = styled(Flex)`
    width: 500px;
    flex-direction:column;
    @media screen and (max-width: 600px) {
        width: 310px !important;
    }
`
const ColTime = styled(Flex)`
    width: 30%;
    @media screen and (max-width: 600px) {
        width: 25%;
    }
`
const ColBlock = styled(Flex)`
    width: 30%;
    @media screen and (max-width: 600px) {
        width: 35%;
    }
`
const ColToken = styled(Flex)`
    width: 40%;
    @media screen and (max-width: 600px) {
        width: 40%;
    }
`
const HeaderTable = styled(Flex)`
    height: 50px;
    width: 100%;
    align-items: center;
    margin-top:1.5rem;
    padding-left:10px;
    border-bottom: 2px solid #E4E4E4;
    @media screen and (max-width: 600px) {
        display: none;
    }
`
const CsText = styled(Text)`
    @media screen and (max-width: 600px) {
        text-align: left;
        width: 100%;
        font-size: 13px;
        font-weight:bold;
    }
`
const CsTextAmount = styled(Text)`
    width: 100%;
    text-align: right;
    @media screen and (max-width: 600px) {
        text-align: left;
        width: 100%;
        font-size: 13px;
        font-weight:bold;
    }
`
const ContainerRevenue = styled(Flex)<{isScroll?:boolean, isSrollDesktop?:boolean}>`
    width: 100%;
    height: 100%;
    max-height:50vh;
    flex-direction:column;
    overflow-y: ${({ isSrollDesktop }) => (isSrollDesktop ? 'scroll' : 'hidden')};
    @media screen and (max-width: 600px) {
        overflow-y: ${({ isScroll }) => (isScroll ? 'scroll' : 'hidden')};
        margin-bottom:10px;
    }
    @media screen and (min-width: 600px) {
        padding-right:${({ isSrollDesktop }) => (isSrollDesktop ? '5px' : '0px')};
    }
    
`