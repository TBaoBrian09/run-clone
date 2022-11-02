import React, { useState, useEffect } from "react";
import { Text, Flex, Skeleton } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";

interface RowRevenueProps {
    blockNumber:number,
    amount:number
    timeStamp:number
    isScroll?:boolean
}

const RowRevenue: React.FC<RowRevenueProps> = ({blockNumber, amount, timeStamp, isScroll}) => {
    const { t } = useTranslation()
    function convertDate(date) {
        if (date) {
          const converDate:any = new Date(date*1000);
          const mm = String(converDate.getMonth() + 1).padStart(2, '0'); 
          const yyyy = converDate.getFullYear();
          return <Flex >
               <Text bold >{mm}/{yyyy}</Text>
              </Flex>;
        }
        
        return <Skeleton width="60px" height="32px"/>
    }
    return (
        <Row isPaddingLeft={isScroll}>
            <ColTime>
                <CsTextTitle>{t("TIME")}</CsTextTitle>
                <>
                    <CsText fontWeight={600}>{convertDate(timeStamp)}</CsText>
                </>
            </ColTime>
            <ColBlock>
                <CsTextTitle>{t("Block Number")}</CsTextTitle>
                <>
                { blockNumber ?
                    <CsText fontWeight={600}>
                        {blockNumber}
                    </CsText>
                :
                    <Skeleton width="60px" height="32px"/> 
                }
                </>
            </ColBlock>
            <ColToken>
                <CsTextTitle>{t("Token a snapshot")}</CsTextTitle>
                { amount ?
                   <CsFlex style={{gap:"10px"}} alignItems="center">
                        <CsText fontWeight={600}>{amount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CsText>
                        <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="token-run" style={{width:"30px", height:"30px"}}/>
                    </CsFlex>
                :
                    <Skeleton width="60px" height="32px"/> 
                }
                
            </ColToken>
        </Row>
    )
}
export default RowRevenue

const ColTime = styled(Flex)`
    width: 30%;
    @media screen and (max-width: 600px) {
        width: 100%;
        justify-content: space-between !important;
        align-items: center;
        height:30px;
    }
`
const ColBlock = styled(Flex)`
    width: 30%;
    @media screen and (max-width: 600px) {
        width: 100%;
        justify-content: space-between !important;
        align-items: center;
        height:30px;
        margin-top:10px;
    }
`
const ColToken = styled(Flex)`
    width: 40%;
    @media screen and (max-width: 600px) {
        width: 100%;
        justify-content: space-between !important;
        align-items: center;
        height:30px;
        margin-top:10px;
    }
`
const Row = styled(Flex)<{isPaddingLeft?:boolean}>`
    height: 60px;
    width: auto;
    align-items: center;
    padding-left:10px;
    border-bottom: 2px solid #E4E4E4;
    @media screen and (max-width: 600px) {
        height: auto;
        flex-wrap:wrap;
        padding-left:0px !important;
        margin-bottom:10px;
        padding-bottom: 10px;
        padding-right: ${({ isPaddingLeft }) => (isPaddingLeft ? '10px' : '0px')};
    }
`
const CsText = styled(Text)`
    @media screen and (max-width: 600px) {
        text-align: right;
    }
`
const CsTextTitle = styled(Flex)`
    text-transform: uppercase;
    color: #B1B5C3;
    @media screen and (min-width: 600px) {
        display: none;
        font-size: 15px;
    }
`
const CsFlex = styled(Flex)`
    width: 100%;
    justify-content: flex-end;
    @media screen and (max-width: 600px) {
        width: auto;
    }
`