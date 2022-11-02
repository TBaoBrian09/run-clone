import React from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import { useTranslation } from "contexts/Localization";
import { config } from "../config"

interface Props {
    typeTx?:number
    time?:string
    balance?:string
}
const Row:React.FC<Props> = ({
    typeTx,
    time,
    balance
}) => {
    const { t } = useTranslation()
    function renderBgTag(){
        return "#45C672"
    }
    function converDate ( date) {
        const newDate = Date.parse(date);
        return new Date(newDate).toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
    }
    function convertBalance (balanceOfTx){
        const converNumber = Number(balanceOfTx)
        if (converNumber >= 0) {
            return (
                <Text mr="10px" bold >{`+${converNumber.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Text>
            )
        }
        if (converNumber < 0) {
            return (
                <Text mr="10px" bold >{`${converNumber.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Text>
            )
        }
        return ""
    }
    const reason = config(t).filter((data) => data.value === typeTx)
    return (
        <ContainerRow>
            <ContainerChain>
                <ContainerTitle>
                    Chain
                </ContainerTitle>
                <Text>Off-chain</Text>
            </ContainerChain>
            <ContainerType>
                <ContainerTitle>
                    Type
                </ContainerTitle>
                <Tags>{reason[0].label}</Tags>
            </ContainerType>
            <ContainerTime>
                <ContainerTitle>
                    Time
                </ContainerTitle>
                <Text>{converDate(time)}</Text>
            </ContainerTime>
            <ContainerBalance>
                <ContainerTitle>
                    Balance
                </ContainerTitle>
                <ContainerUserBalance>
                    {convertBalance(balance)}
                    <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                </ContainerUserBalance>
            </ContainerBalance>
        </ContainerRow>
    )
}
export default Row

const ContainerRow = styled(Flex)`
    width: 100%;
    height:100px;
    padding-left:12px;
    box-shadow: inset 0px -1px 0px #E4E4E4;
    flex-wrap: wrap;
    @media screen and (max-width: 600px) {
        height:auto;
        padding-top:20px;
        padding-bottom:20px;
        padding-left:12px;
        padding-right:12px;
    }
`
const Tags = styled.div`
    width:190px;
    min-width:120px;
    height: 42px;
    background: #788EFF;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    font-size:14px;
    font-weight:500;
    @media screen and (max-width: 600px) {
        width:190px;
        min-width:120px;
        font-size:14px;
    }
`
const ContainerChain = styled(Flex)`
    width:15%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        padding-left: 0rem;
        height:50px;
        justify-content: space-between;
    }
`
const ContainerType = styled(Flex)`
    width:29%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        height:50px;
        padding-left: 0rem;
        justify-content: space-between;
    }
`
const ContainerTime = styled(Flex)`
    width:31%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        padding-left: 0rem;
        height:50px;
        justify-content: space-between;
    }
`
const ContainerBalance = styled(Flex)`
    width:25%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        padding-left: 0rem;
        height:50px;
        justify-content: space-between;
    }
`
const ContainerUserBalance = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    width:120px;
    @media screen and (max-width: 600px) {
        width: auto !important;
    }
`
const ContainerTitle = styled(Flex)`
     @media screen and (min-width: 600px) {
        display: none;
    }
`
