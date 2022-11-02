import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTranslation } from 'contexts/Localization'
import { Text, Button, Flex, useModal } from '@phamphu19498/runtogether-uikit'
import { Processes, Conditions, YourRight } from '../config'
import Upgrade from "./UpgradeLevel"


export interface DetailsPropType {
    id:number
    Name:string
    Elite:boolean
    Bronze:boolean
    Silver:boolean
    Gold:boolean
    Platinum:boolean
    Diamond:boolean
}

export interface ArrayProptype {
    id:number
    YourRight:string
    Elite:string
    Bronze:string
    Silver:string
    Gold:string
    Platinum:string
    Diamond:string
    generality:string
    details?:DetailsPropType
}
export interface DataProptype {
    dataYourRights: ArrayProptype[]
}
const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height:55px
`
const WrapperBottom = styled(Wrapper)`
    background: ${({ theme }) => theme.isDark ? theme.colors.modalHeader : theme.colors.backgroundTab};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    height:68px;
`
const WrapperHeader = styled(Wrapper)`
    margin-top:2rem;
    background: ${({ theme }) => theme.isDark ? theme.colors.modalHeader : theme.colors.backgroundTab};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height:100px !important;
`
const Col60 = styled.div`
    width:60%;
    padding:0px 50px 0px 50px;
    height:100%;
    display:flex;
    flex-direction: column ;
    display: flex;
    justify-content: center;
    align-items: center;    
    border-left: 1px solid  ${({ theme }) => theme.colors.borderUpgradeTableHeader};
`
const Col10 = styled.div`
    width:10%;
    height:100%;
    display:flex;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;    
    > img {
        margin-bottom:10px;
    }
    border-left: 1px solid  ${({ theme }) => theme.colors.borderUpgradeTableHeader};
`
const Col40 = styled.div`
    width:40%;
    padding-left:20px;
    height:100%;
    display:flex;
    justify-content: flex-start;
    align-items: center;  
`
const Container = styled.div`
    width:100%;
    margin-top:30px;
    @media screen and (max-width: 1399px) {
        display:none;
    }
    border-radius:20px;
    .backgrounddark{
        background:${({ theme }) => theme.colors.backgrounddark} !important;
    }
    .backgroundlight{
        background:${({ theme }) => theme.colors.backgroundlight} !important;
    }
`
const Row = styled.div<{ isDark?: boolean }>`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height:55px;
    background:${({ theme, isDark }) => isDark === true ? theme.colors.modalHeader : theme.colors.bgRowLight};
`
const CusstomButton = styled(Button)`
    border:2px solid ${({ theme }) => theme.colors.text};
    color:${({ theme }) => theme.colors.text};
    &:hover {
        background:${({ theme }) => theme.colors.primaryBright};
        opacity: 1 !important;
        border:2px solid ${({ theme }) => theme.colors.primaryBright};
        color:#fff;
        transition-duration: 0.15s;
    }
`
const RowYourRights = ({ data }) => {
    const { t } = useTranslation()
    const UpgradelevelInfor = Conditions
    const armorial = Conditions.sort((a, b) => (b.order_id - a.order_id))
    const history = useHistory();
    const { account } = useActiveWeb3React()
    const [ModalDiamond] = useModal(<Upgrade level="Diamond"/>)
    const [ModalPlatinum] = useModal(<Upgrade level="Platinum"/>)
    const [ModalGold] = useModal(<Upgrade level="Gold"/>)
    const [ModalDeluxe] = useModal(<Upgrade level="Deluxe"/>)
    const [ModalElite] = useModal(<Upgrade level="Elite"/>)
    const [ModalStandar] = useModal(<Upgrade level="Standard"/>)
    
    return (
        <Container id="YourRight">
            <Text fontSize='32px' bold >{t("NFT comparison table")}</Text>
            <WrapperHeader>
                <Col40/>
                {armorial.map((itemheader) => {
                    return (
                        <Col10>
                            <img src={itemheader.image} width="50px" alt="logo" />
                            <Text color="text" ml="5px" bold>{itemheader.title}</Text>
                        </Col10>
                    )
                    })}
            </WrapperHeader>
            {data.map((item) => {
                if(item.generality){
                    return(
                        <Row key={item.id} isDark={item.id % 2 === 0 ? !false : false}>
                            <Col40> <Text bold>{item.YourRight}</Text> </Col40>
                            <Col60> <Text color="homePrice" textAlign="center">{item.generality}</Text> </Col60>
                        </Row>
                    )
                }
                if (item.details){
                    const tmp = item.details.DataDetails
                    return(
                        <div>
                            <Row key={item.id} isDark={item.id % 2 === 0 ? !false : false}>
                            <Col40> <Text bold>{item.YourRight}</Text> </Col40>
                            <Col60/>
                        </Row>
                        {tmp.map((details) => {
                            return (
                                <Row isDark={details.id % 2 === 0 ? !false : false}>
                                    <Col40 style={{paddingLeft:"3%",fontStyle:"italic"}}> <Text>{details.Name}</Text> </Col40>
                                    <Col10> {details.Standard === true && <Text>&#10004;</Text> } </Col10>
                                    <Col10> {details.Deluxe === true && <Text>&#10004;</Text> } </Col10>
                                    <Col10> {details.Elite === true && <Text>&#10004;</Text> } </Col10>
                                    <Col10> {details.Gold === true && <Text>&#10004;</Text> } </Col10>
                                    <Col10> {details.Platinum === true && <Text>&#10004;</Text> } </Col10>
                                    <Col10> {details.Diamond === true && <Text>&#10004;</Text> } </Col10>
                                </Row>
                            )
                          })}
                        </div>
                       
                    )
                }
                return (          
                    <Row key={item.id} isDark={item.id % 2 === 0 ? !false : false}>
                        <Col40> <Text bold>{item.YourRight}</Text> </Col40>
                        <Col10> {item.Standard === "check" ? <Text>&#10004;</Text> : <Text>{item.Standard !== "none" && item.Standard}</Text>} </Col10>
                        <Col10> {item.Deluxe === "check" ? <Text>&#10004;</Text> : <Text>{item.Deluxe !== "none" && item.Deluxe}</Text>} </Col10>
                        <Col10> {item.Elite === "check" ? <Text>&#10004;</Text> : <Text>{item.Elite !== "none" && item.Elite}</Text>} </Col10>
                        <Col10> {item.Gold === "check" ? <Text>&#10004;</Text> : <Text>{item.Gold !== "none" && item.Gold}</Text>} </Col10>
                        <Col10> {item.Platinum === "check" ? <Text>&#10004;</Text> : <Text>{item.Platinum !== "none" && item.Platinum}</Text>} </Col10>
                        <Col10> {item.Diamond === "check" ? <Text>&#10004;</Text> :  <Text>{item.Diamond !== "none" && item.Diamond}</Text>} </Col10>
                    </Row>
                )              
            })}
            <WrapperBottom>
                <Col40/>
                <Col10>
                {/* { account &&
                    <CusstomButton 
                        scale="md" 
                        variant="secondary" 
                        width="80%"
                        onClick={ModalStandar}
                    >
                        Upgrade
                    </CusstomButton> 
                } */}
                            
                </Col10>
                <Col10>
                {/* { account &&
                    <CusstomButton 
                        scale="md" 
                        variant="secondary" 
                        width="80%"
                        onClick={ModalDeluxe}
                    >
                        Upgrade
                    </CusstomButton> 
                } */}
                            
                </Col10>
                <Col10>
                {/* { account &&
                    <CusstomButton 
                        scale="md" 
                        variant="secondary" 
                        width="80%"
                        onClick={ModalElite}
                    >
                        Upgrade
                    </CusstomButton> 
                } */}
                            
                </Col10>
                <Col10>
                {/* { account &&
                    <CusstomButton 
                        scale="md" 
                        variant="secondary" 
                        width="80%"
                        onClick={ModalGold}
                    >
                        Upgrade
                    </CusstomButton> 
                } */}
                            
                </Col10>
                <Col10>
                {/* { account &&
                    <CusstomButton 
                        scale="md" 
                        variant="secondary" 
                        width="80%"
                        onClick={ModalPlatinum}
                    >
                        Upgrade
                    </CusstomButton> 
                } */}
                            
                </Col10>
                <Col10>
                {/* { account &&
                    <CusstomButton 
                        scale="md" 
                        variant="secondary" 
                        width="80%"
                        onClick={ModalDiamond}
                    >
                        Upgrade
                    </CusstomButton> 
                } */}
                            
                </Col10>
            </WrapperBottom>
        </Container>
        
    )
}

export default RowYourRights
