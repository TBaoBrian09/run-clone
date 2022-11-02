import React, { useState } from "react";
import styled from "styled-components";
import PageFullWidth from "components/Layout/PageFullWidth";
import Container from "components/Layout/Container";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import Select, { OptionProps } from 'components/Select/Select'
import Header from "components/HeaderGlobal/Header";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useTranslation } from "contexts/Localization";
import { orderBy } from 'lodash'
import { useAllTransactions } from 'state/transactions/hooks'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useToast from "hooks/useToast";
import TextField from '@mui/material/TextField';
import CardOnChain from "./components/CardOnChain"
import CardOffChain from "./components/CardOffChain"
import ContainerOnChain from "./components/ContainerOnChain";
import { config } from "./config"

function getDateNow(event?: any) {
    let today: any
    if(event) {
        today = new Date(event);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
    }
    else {
        today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
    }    
    return today;
}



type optionDay = {
    year?:any,
    month?:any,
    day?:any
}

const configOptionDay:optionDay = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
} 
const onKeyDown = (e) => {
    e.preventDefault();
 };
const MyBalance = () => {
    const allTransactions = useAllTransactions()
    const sortedTransactions = orderBy(allTransactions, 'addedTime', 'desc')
    const { t } = useTranslation()
    const [ typeTransaction, setTypeTransaction ] = useState(0)
    const [ startDate, setStartDate ] = useState(getDateNow(null))
    const [ endDate, setEndDate ] = useState(getDateNow(null))
    const [ isOnChain, setIsOnChain ] = useState(false)
    const { toastError, toastSuccess } = useToast()
    
    const handleStartDate = (event: any) => {
        const start = getDateNow(event);
        const d1 = Date.parse(start);
        const d2 = Date.parse(endDate);
        if (d1 > d2 ){
            toastError("The start date cannot be greater than the end date. Please try again");
            setStartDate(getDateNow())
            setEndDate(getDateNow())
            return;
        }
        if (start > getDateNow()) {
            toastError("The start date cannot be greater than the current date. Please try again");
            setStartDate(getDateNow())
            return;
        }
        setStartDate(start)
    }

    const handleEndDate = (event:any) => {
        const end = getDateNow(event);
        const d1 = Date.parse(startDate);
        const d2 = Date.parse(end);
        if (d1 > d2){
            toastError("The end date must be greater than the start date. Please try again");
            setEndDate(getDateNow())
            return;
        }
        if (end > getDateNow()){
            toastError("The end date cannot be greater than the current date. Please try again");
            setEndDate(getDateNow())
            return;
        }
        setEndDate(end) 
    }
    const handleTypeTransaction = (option: OptionProps): void => {
        setTypeTransaction(option.value)
    }
    const handleChangeIsOnChain = (option: OptionProps): void => {
        setIsOnChain(option.value)
    }

    return (
        <PageFullWidth>
            <Header
                nameTitle="RUN TOGETHER"
                namePlace="My balance"
                imgIcon="./images/runMyBalance/imgBanner.png"
                bgColor="#FF8B27"
            />
            <CustomContainer>
                <Flex width="100%" flexWrap="wrap" mt="1rem" mb="2.25rem">
                    <ContainerCard>
                        <CardOnChain/>
                    </ContainerCard>
                    <ContainerCard>
                        <CardOffChain/>
                    </ContainerCard>
                </Flex>
                <Flex width="100%" flexWrap="wrap" justifyContent="space-between" mt="1.5rem">
                    <CustomFlex flexDirection="column" mb="1rem">
                        <Text bold mb="5px" color="#B1B5C4" textTransform="uppercase">{t("Chain")}</Text>
                        <Select
                            options={[
                                {
                                    label: t('Off-chain'),
                                    value: false,
                                }
                                ]}
                        />
                    </CustomFlex>
                    <CustomFlex flexDirection="column" mb="1rem">
                        <Text bold mb="5px" color="#B1B5C4" textTransform="uppercase">{t("Start date")}</Text>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <CustomCalendar
                            // label="Date desktop"
                            inputFormat="DD/MM/YYYY"
                            value={startDate}
                            onChange={handleStartDate}
                            renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} />}
                        />
                         </LocalizationProvider>    
                    </CustomFlex>
                    <CustomFlex flexDirection="column" mb="1rem">
                        <Text bold mb="5px" color="#B1B5C4" textTransform="uppercase">{t("End date")}</Text>  
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <CustomCalendar
                            // label="Date desktop"
                            inputFormat="DD/MM/YYYY"
                            value={endDate}
                            onChange={handleEndDate}
                            renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} />}
                        />
                    </LocalizationProvider>                       
                    </CustomFlex>
                </Flex>
                <Flex width="100%" mt="1rem" height="fit-content">
                    { isOnChain ?
                        <Flex width="100%" justifyContent="center" mt="1rem" height="100%" minHeight="50vh">
                            <Text>{t("No Data")}</Text>
                        </Flex>
                    :
                        <ContainerOnChain startDate={startDate} endDate={endDate}/>
                    }
                </Flex>
            </CustomContainer>
        </PageFullWidth>
    )
}

export default MyBalance

const ContainerCard = styled(Flex)`
    width: 50%;
    &:nth-child(1){
        padding-right:.5rem;
         @media (max-width:600px){
            padding-right:0
         }
    }
    &:nth-child(2){
        padding-left:.5rem;
        @media (max-width:600px){
            padding-left:0;
         }
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        margin-bottom:1rem;
    }
   
`
const CustomContainer = styled(Container)`
    width:100%;
    height: auto;
    @media only screen and (max-width: 768px) {
        padding-left:10px;
        padding-right: 10px;
    }
`
const CustomCalendar = styled(DesktopDatePicker)`        
    cursor: pointer;      
    height: 48px!important; 
    width: 280px!important;  
    @media only screen and (max-width: 600px) {
        width: 100%!important;
    }       
    > div {       
        border-radius: 12px!important;
        height:100%!important; 
        width: 100%!important; 
        border:1px solid rgb(230, 232, 236)!important; 
        position: relative;
        box-sizing:border-box;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`
const CustomFlex = styled(Flex)`
    width:auto;
    @media only screen and (min-width: 600px) and (max-width: 1080px) {
        width: 50%;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`