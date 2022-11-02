import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router';
import { Text, Flex } from "@phamphu19498/runtogether-uikit"
import { useTranslation } from "contexts/Localization";

interface Props {
    item:any
}
const AirdropCard: React.FC<Props> = ({item}) => {
    const history = useHistory();
    function handleClick(){
        history.push(`/airdropdetails/${item.id.toString()}`)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
    const { t } = useTranslation()
    return (
        <Card onClick={handleClick}>
           <Img src={item.image} alt="banner-airdrop"/>
           <Container>
                <Text color="text" bold fontSize="22px">{item.title}</Text>
                <Flex mt="1.5rem" width="100%" justifyContent="space-between" alignItems="center">
                    <Text color="textSecondary">{t("Participate")}</Text>
                    <CustomLink color="textSecondary">{item.participate.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</CustomLink>
                </Flex>
                <Flex mt="1.5rem" width="100%" justifyContent="space-between" alignItems="center">
                    <Text color="textSecondary">{t("Number of winner")}</Text>
                    <CustomLink color="textSecondary">{item.numberofwinner.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</CustomLink>
                </Flex>
                <Flex mt="1.5rem" width="100%" justifyContent="space-between" alignItems="center">
                    <Text color="textSecondary">{t("Total Airdrop amount")}</Text>
                    <CustomLink color="textSecondary">{item.totalAirdrop}</CustomLink>
                </Flex>
                <Flex mt="1.5rem" width="100%" justifyContent="space-between" alignItems="center">
                    <Text color="textSecondary">{t("End-in")}</Text>
                    <CustomLink color="textSecondary">{item.endin}</CustomLink>
                </Flex>
           </Container>
        </Card>
    )
}
export default AirdropCard

const Card = styled(Flex)`
    display: flex;
    flex-direction: column;
    border-radius:10px;
    justify-content:flex-start;
    align-items:center;
    width: 400px;
    height: auto;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.backgroundTab};
    margin-bottom:1rem;
    padding-bottom:1.75rem;
    @media only screen and (max-width: 600px) {
        width: 340px;
    }
    box-sizing: border-box;
    box-shadow: ${({ theme }) => theme.isDark ? "0px 4px 18px  rgba(115, 184, 246, 0.1)" :"0px 4px 4px rgba(0, 0, 0, 0.05)"};
    margin-bottom:1.75rem;
    background:${({ theme }) => theme.colors.backgroundModal};
    &:hover {
        cursor:pointer;
        transform: scale(1.01,1.01);
            -webkit-transform: scale(1.01,1.01);
            -moz-transform: scale(1.01,1.01);
            -o-transform: scale(1.01,1.01);
            -ms-transform: scale(1.01,1.01);
            transition-duration: 0.5s;
    }
`

const Container = styled.div`
    width:100%;
    height:auto;
    padding-left:1rem;
    padding-right:1rem;
    margin-top:1.5rem;
`
const Img = styled.img`
    width: 100%;
    height: auto;
`
const CustomLink = styled(Text)`
    cursor:pointer;
`