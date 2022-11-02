import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import { useTranslation } from "contexts/Localization";
import Inwallet from "./Inwallet"
import OnSale from "./OnSale"
import MysteryBox from "./MysteryBox";

interface Props {
    filter: number
    checkClick:any
    showTypeBox?: (newValue) => void,
    activeSet?: number
}

const InventoryOnChain:React.FC<Props> = ({filter,checkClick, showTypeBox, activeSet}) => {
    const { t } = useTranslation()
    const [ activeIndex, setActiveIndex ] = useState(0)


    const handleChangeIndex = (e) => {
        setActiveIndex(e);
        if(e !== 2) {
            showTypeBox(e);
        }
        else {
            showTypeBox(e);
        }
    }

    useEffect(() => {
        if(activeSet === 2) {
            setActiveIndex(2);
        }
    }, [activeSet]);

    return(
        <Flex width="100%" flexDirection="column">
            <Flex width="100%" justifyContent="center" alignItems="center" mt="1rem">
                <Flex width="100%">
                    <CustomButton onClick={()=>{handleChangeIndex(0);checkClick('items')}} isActive={activeIndex === 0 ? !false : false}>{t("ITEMS")}</CustomButton>
                    <CustomButton onClick={()=>{handleChangeIndex(1);checkClick('onsale')}} isActive={activeIndex === 1 ? !false : false}>{t("ON SALE")}</CustomButton>
                    <CustomButton onClick={()=>handleChangeIndex(2)} isActive={activeIndex === 2 ? !false : false}>{t("MYSTERY BOX")}</CustomButton>
                </Flex>
            </Flex>
            { 
                activeIndex === 0 &&  <Inwallet filterBoxType={filter}/>
                || activeIndex === 1 &&  <OnSale filterBoxType={filter}/>
                || activeIndex === 2 &&  <MysteryBox filterBoxType={filter}/>
            }
        </Flex>
    )
}
export default InventoryOnChain

const CustomButton = styled.div<{isActive:boolean}>`
  height:60px;
  width: 50%;
  padding:0px 10px 0px 10px;
  border-bottom: ${({ isActive }) => isActive ? "3px solid #E5C63F" : "none"};
  font-weight:bold;
  color:${({ isActive }) => isActive ? "#E5C63F" : "#B1B5C3"};
  padding-bottom:10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  @media screen and (max-width: 600px) {
    font-size: 16px;
    text-align: center;
 }

`