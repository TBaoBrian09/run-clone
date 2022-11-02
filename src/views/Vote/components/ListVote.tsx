import React from "react";
import { Flex, Text } from "@phamphu19498/runtogether-uikit"
import styled from "styled-components"
import BigNumber from 'bignumber.js'
import { OpenNewIconInvest } from "components/Pancake-uikit"
import { BASE_BSC_URL } from "config";


interface Props {
    address?:string
    txAddress?:string
    status?:boolean
    balance?:string
    rowId?:number
}

const ListVote:React.FC<Props> = ({
    address,
    txAddress,
    status,
    balance,
    rowId,
}) => {

    const TXHashLinkBsc = `${BASE_BSC_URL}/tx/${txAddress}`

    function hanldClickLinkTX(){
        window.open(TXHashLinkBsc)
    }

    function sAccount (dataAddress) {
        if ( dataAddress ) {
            return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
        }
        return ""
    }
    const converAmount = new BigNumber(balance)
    const partAmount = converAmount.decimalPlaces(2,1)
    return (
        <Container>
            <BodyTable isActive={rowId % 2===0 ? !false : false}>
                <FlexData>
                    <CustomLink style={{cursor: 'pointer'}} width='100%' justifyContent='center' alignItems='center' onClick={hanldClickLinkTX}>
                        {sAccount(txAddress)} <CustomOpenNewIconInvest/>
                    </CustomLink>
                </FlexData>
                <FlexData justifyContent='center'>
                    {status ? "Agree" : "Disagree"}
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {Number(partAmount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Flex>
                </FlexData>
            </BodyTable>
        </Container>
    )
}

export default ListVote

const Container = styled(Flex)`
    width: 100%;
    flex-direction: column;
`
const BodyTable = styled(Flex)<{isActive: boolean}>`
    width: 100%;
    height: 80px;
    background: ${({ isActive }) => (isActive ? '#fff' : '#F2F2F2')};
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    gap: 10px;
    @media screen and (max-width: 1024px){
        gap: 10px;
    }
    @media screen and (max-width: 768px){
        gap: 20px;
    }
    @media screen and (max-width: 600px){
        gap: 0px;
    }
`
const FlexData = styled(Flex)`
    width: 33.33%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CustomOpenNewIconInvest = styled(OpenNewIconInvest)`
    margin-left: 10px;
    margin-top: 4px;
    @media screen and (max-width: 600px){
        margin-left: 5px;
    }
`
const CustomLink = styled(Flex)`
    @media screen and (max-width: 600px){
        margin-left: 20px;
    }
`