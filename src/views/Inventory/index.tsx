import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageFullWidth from 'components/Layout/PageFullWidth'
import { Flex, Text, Button } from "@phamphu19498/runtogether-uikit"
import { useTranslation } from "contexts/Localization";
import Select, { OptionProps } from 'components/Select/Select'
import { DecryptsUserInfo } from "config/api/decrypts";
import Header from "components/HeaderGlobal/Header";
import { useWeb3React } from "@web3-react/core";
import { GetBalanceNft, GetNftInfo, GetSellItemsByUser, GetTokenIds, GetTotalSellItems } from "state/marketplace";
import { GetListBoxes, GetListShoes, GetBalanceMysteryBox, GetTokenIdsMystery } from "state/inventory";
import CustomSelect from "components/CustomSelect/CustomSelect";
import { useParams } from "react-router-dom";
import Card from "./components/Card";
import Inwallet from "./components/Inwallet"
import OnSale from "./components/OnSale";
import OffChainBox from "./components/OffChainBox";
import InventoryOnChain from "./components/InventoryOnChain";
import InventoryOffChain from "./components/InventoryOffChain"



 
const Inventory = () => {
    const { t } = useTranslation()
    const { activeMystery }: { activeMystery: string } = useParams();
    const [ activeIndex, setActiveIndex ] = useState(0)
    const [ tabIndex, setTabIndex ] = useState(0)
    const [ isOnChain, setIsOnChain] = useState(true)
    const [ isBoxes, setIsBoxes ] = useState(true)
    const { account } = useWeb3React()
    const [ balance ] = GetBalanceNft(account)
    const [ tokenIds ] = GetTokenIds(account, balance) 
    const [ nftInfo ] = GetNftInfo(tokenIds)
    const [ showFilterBox, setShowFilterBox ] = useState(0) 
    const [ balanceMysteryBox ] = GetBalanceMysteryBox(account);
    const [ tokenIdsMystery ] = GetTokenIdsMystery(account, balanceMysteryBox);
    const [ listNft, setListNft ] = useState([...nftInfo])
    // ---list shoe---
    const dataUser:any = DecryptsUserInfo() || "";
    const [ listShoes ] = GetListShoes(dataUser ? dataUser.id : "")
    const [ listNftShoe, setListNftShoe ] = useState([...listShoes])

    // --list box
    const [ listBoxes ] = GetListBoxes(dataUser ? dataUser.id : "")
    const [ listNftBox, setListNftBox ] = useState([...listBoxes])
    
    // list onsale
    const [ totalSell ] = GetTotalSellItems()
    const [ listItemsSale ] = GetSellItemsByUser(totalSell, account)
    const [ listOnSale, setListOnsale] = useState([...listItemsSale])

    const [optionselectboxChain, setOptionselectboxChain] = useState('On-Chain')
    const [optionselectboxshoe,  setOptionselectboxshoe] = useState('Boxes')
    const [valueclickTabItemSave,setValueclickTabItemSave] = useState('items')
    const handleClickOnsale = (e) =>{
        setValueclickTabItemSave(e)
    }    
    const getSumBoxType = (type: number) => {
        let sumType = 0;        
        if (optionselectboxChain === "On-Chain") {                       
            if (valueclickTabItemSave === "items"){
                if(listNft?.length > 0) {
                    if(type > 0) {
                    sumType = listNft.filter(item => item.nftType === type)?.length;                    
                    }
                    else {
                    sumType = listNft.length;
                    }
                }  
                return sumType;   
            }
               
            if (valueclickTabItemSave === "onsale"){                               
                if(listOnSale?.length > 0) {
                    if(type > 0) {
                      sumType = listOnSale.filter(item => item.boxType === type)?.length;                      
                    }
                    else {
                      sumType = listOnSale.length;
                    }
                  } 
                  return sumType;
            }
        } 
       
        if (optionselectboxChain === "Off-Chain"){           
            if (optionselectboxshoe === "Boxes") {                         
                if(listNftBox?.length > 0) {
                    if(type > 0) {
                      sumType = listNftBox.filter(item => item.type === type)?.length;                    
                    }
                    else {
                      sumType = listNftBox.length;
                    }
                    return sumType
                  }                              
             }
            if (optionselectboxshoe === "Shoes") {                  
                    if(listNftShoe?.length > 0) {
                        if(type > 0) {
                        sumType = listNftShoe.filter(item => item.type === type)?.length;                       
                        }
                        else {
                        sumType = listNftShoe.length;
                        }
                    }  
                    return sumType                            
            }
        }                  
        return sumType;
    }
    useEffect(() => {
        setListNft([...nftInfo])
        setListNftShoe([...listShoes])
        setListNftBox([...listBoxes])
        setListOnsale([...listItemsSale])       
    }, [listBoxes, listItemsSale, listShoes, nftInfo, tabIndex])
    const handleSelectChain = (option: OptionProps): void => {
        setIsOnChain(option.value)
        setOptionselectboxChain(option.label)
    }
    const handleChainBoxes = (option: OptionProps): void => {
        setIsBoxes(option.value)
        setOptionselectboxshoe(option.label)
        setValueclickTabItemSave('items') 
    }    

    useEffect(() => {
        setIsBoxes(true);
        setTabIndex(0);
    }, [isOnChain, showFilterBox]);
    const showTypeBox = (value) => {
        setShowFilterBox(value);
    } 

    const getSumMysteryBox = () => {
        let sumType = 0;
        if(tokenIdsMystery?.length > 0) {
            sumType = tokenIdsMystery.length;            
        }
        return sumType;
    }

    useEffect(() => {
        if(activeMystery === '1') {
            setActiveIndex(2);
            setShowFilterBox(2);
        }
    }, [activeMystery]);

    return (
        <PageFullWidth>
             <Header 
              nameTitle="RUN TOGETHER"
              namePlace="Inventory"
              imgIcon="/images/runInventory/imgBanner.png"
              bgColor="#E6C63F"
            />
            <Flex width="100%" maxWidth="1300px" flexDirection="column" padding="0px 12px 0px 12px">
                <Row>
                    <FlexPrice alignItems="center">
                        <CustomSelectShoe
                            options={[
                                    {
                                        label: t('On-Chain'),
                                        value: true,
                                    },
                                    {
                                        label: t('Off-Chain'),
                                        value: false,
                                    },
                                ]}
                            onChange={handleSelectChain}
                        />  
                        { !isOnChain &&
                            <CustomSelectShoe
                                options={[
                                    {
                                        label: t('Boxes'),
                                        value: true,
                                    },
                                    {
                                        label: t('Shoes'),
                                        value: false,
                                    },
                                    ]}
                                    onChange={handleChainBoxes}
                            />
                        }                                             
                    </FlexPrice>
                   
                    <CustomRow>
                        <WrapperTabs>
                            {
                                (showFilterBox !== 2) && <CotainerTabAll>
                                    <CustomTabAll isActive={ tabIndex === 0 ? !false : false} onClick={()=>setTabIndex(0)}>
                                        All({getSumBoxType(0)})
                                    </CustomTabAll>
                                </CotainerTabAll>
                            }
                            {
                                (showFilterBox === 2) && <CotainerTabAll>
                                    <CustomTabAll isActive={ tabIndex === 0 ? !false : false} onClick={()=>setTabIndex(0)}>
                                        All ({getSumMysteryBox()})
                                    </CustomTabAll>
                                </CotainerTabAll>
                            }                            
                            {
                                (showFilterBox !== 2) && <CustomTab isActive={ tabIndex === 1 ? !false : false} onClick={()=>setTabIndex(1)}>
                                    <Tags src="/images/martketplace/11.png" alt="tag box"/>
                                    <Text ml="3px" color="#777E91" bold>MetaRush({getSumBoxType(1)})</Text>
                                </CustomTab>
                            }
                            {
                                (showFilterBox !== 2) && <CustomTab isActive={ tabIndex === 2 ? !false : false} onClick={()=>setTabIndex(2)}>
                                    <Tags src="/images/martketplace/22.png" alt="tag box"/>
                                    <Text ml="3px" color="#777E91" bold>MetaRun({getSumBoxType(2)})</Text>
                                </CustomTab>
                            }
                            {
                                (showFilterBox !== 2) && <CustomTab isActive={ tabIndex === 3 ? !false : false} onClick={()=>setTabIndex(3)}>
                                    <Tags src="/images/martketplace/33.png" alt="tag box"/>
                                    <Text ml="3px" color="#777E91" bold>MetaRace({getSumBoxType(3)})</Text>
                                </CustomTab>
                            }
                            {
                                (showFilterBox !== 2) && <CustomTab isActive={ tabIndex === 4 ? !false : false} onClick={()=>setTabIndex(4)}>
                                    <Tags src="/images/martketplace/44.png" alt="tag box"/>
                                    <Text ml="3px" color="#777E91" bold>MetaRich({getSumBoxType(4)})</Text>
                                </CustomTab>
                            }                                                                                    
                        </WrapperTabs>
                        
                    </CustomRow>
                </Row>
                { isOnChain ?
                    <InventoryOnChain filter={tabIndex} checkClick={handleClickOnsale}  showTypeBox={showTypeBox} activeSet={activeIndex} />
                :
                    <InventoryOffChain isListBoxes={isBoxes} filterType={tabIndex} />
                }
                
           </Flex>
        </PageFullWidth>
    )
}
export default Inventory

const CustomTab = styled(Button)<{isActive?:boolean}>`
    width: auto;
    background:none;
    box-shadow: none;
    font-size:22px;
    display: flex;
    justify-content: flex-start;
    padding-left:10px;
    font-weight:bold;
    border-radius:0px;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
    @media (min-width:602px) and (max-width:800px){       
        padding:0;
    }
    @media only screen and (max-width: 600px) {
        width: 50%;
        padding: 0px;
        &:first-child {
            width: 100%;
        }
        margin-bottom:10px;
    }
`
const CustomTabAll = styled(Button)<{isActive?:boolean}>`
    width: auto;
    background:none;
    box-shadow: none;
    font-size:22px;
    display: flex;
    justify-content: flex-start;
    padding-left:10px;
    font-weight:bold;
    border-radius:0px;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
    @media only screen and (max-width: 600px) {
        width: 50%;
        justify-content: center;
        margin-bottom:10px;
    }
`
const Row = styled(Flex)`
  margin-top:1.25rem;
  width:100%;
  justify-content: space-between;
  flex-wrap:wrap;
  @media only screen and (max-width: 600px) {
    justify-content:flex-end;
    padding-right:10px;
    ${Flex}{
      width: 100%;
      justify-content: flex-start;
      margin-top:1rem;
    }
  }
`
const CustomButton = styled.div<{isActive:boolean}>`
  height:60px;
  width: 50%;
  padding:0px 10px 0px 10px;
  border-bottom: ${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"};
  font-weight:bold;
  color:#777E91;
  padding-bottom:10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
`
const Tags = styled.img`
    height: 35px;
    width: 35px;
    border-radius:50%;
    overflow:hidden;
`
const FlexPrice = styled(Flex)`
    flex-wrap:wrap;
    gap: 30px;
    @media only screen and (min-width: 600px) and (max-width: 1024px){
        width: 100%;
        justify-content: space-between;
        margin-bottom:1rem;
    }
    @media only screen and (max-width: 600px) {
        gap: 20px;
    }
` 
const CustomFlex = styled(Flex)`
    width: auto;
    @media only screen and (max-width: 600px) {
       width: 100%;
       justify-content: center !important;
       align-items: center !important;
    }
`
const WrapperTabs = styled(Flex)`
    width:auto;
    @media only screen and (min-width: 600px) and (max-width: 1080px) {
        width: 100%;
        justify-content: center;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        flex-wrap:wrap;
    }
`
const CotainerTabAll = styled.div`
    display: flex;
    width:auto;
    @media only screen and (max-width: 600px) {
        width: 100%;
        justify-content: center;
    }
`
const CustomRow = styled(Flex)`
    flex-wrap:wrap;
    @media only screen and (max-width:1080px) {
        width: 100%;
        justify-content: center;
    }
`
const CustomSelectShoe = styled(CustomSelect)`
`