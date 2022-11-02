import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageFullWidth from 'components/Layout/PageFullWidth'
import { Flex, Text, Button } from "@phamphu19498/runtogether-uikit"
import { useTranslation } from "contexts/Localization";
import Select, { OptionProps } from 'components/Select/Select'
import Header from "./components/Header"
import Card from "./components/Card";
import Inwallet from "./components/Inwallet"
import OnSale from "./components/OnSale";
import OffChainBox from "./components/OffChainBox";
 
const ADMINISTRATOR = () => {
    const { t } = useTranslation()
    const [ activeIndex, setActiveIndex ] = useState(0)
    const [ tabIndex, setTabIndex ] = useState(0)
    const [ isOnChain, setIsOnChain] = useState(true)
    const handleSelectChain = (option: OptionProps): void => {
        setIsOnChain(option.value)
      }
    return (
        <PageFullWidth>
             <Header 
              nameTitle="RUN TOGETHER"
              namePlace="ADMINISTRATOR"
              imgIcon="/images/runInventory/imgBanner.png"
            />
            <Flex width="100%" maxWidth="1300px" flexDirection="column" padding="0px 12px 0px 12px">
                <Row>
                    <Flex flexWrap="wrap">
                        <CustomTab isActive={ tabIndex === 0 ? !false : false} onClick={()=>setTabIndex(0)}>
                            All
                        </CustomTab>
                        <CustomTab isActive={ tabIndex === 1 ? !false : false} onClick={()=>setTabIndex(1)}>
                        <Tags src="/images/martketplace/11.png" alt="tag box"/>
                        <Text ml="5px" color="#777E91" bold>Training</Text>
                        </CustomTab>
                        <CustomTab isActive={ tabIndex === 2 ? !false : false} onClick={()=>setTabIndex(2)}>
                        <Tags src="/images/martketplace/22.png" alt="tag box"/>
                        <Text ml="5px" color="#777E91" bold>Running</Text>
                        </CustomTab>
                        <CustomTab isActive={ tabIndex === 3 ? !false : false} onClick={()=>setTabIndex(3)}>
                        <Tags src="/images/martketplace/33.png" alt="tag box"/>
                        <Text ml="5px" color="#777E91" bold>Competitor</Text>
                        </CustomTab>
                        <CustomTab isActive={ tabIndex === 4 ? !false : false} onClick={()=>setTabIndex(4)}>
                        <Tags src="/images/martketplace/44.png" alt="tag box"/>
                        <Text ml="5px" color="#777E91" bold>Athlete</Text>
                        </CustomTab>
                    </Flex>
                    <FlexPrice alignItems="center">
                        <Select
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
                    </FlexPrice>
                </Row>
                { isOnChain &&
                    <Flex width="100%" justifyContent="center" alignItems="center" mt="1rem">
                        <ContainerTabButton>
                            <CustomButton onClick={()=>setActiveIndex(0)} isActive={activeIndex === 0 ? !false : false}>{t("Having")}</CustomButton>
                            <CustomButton onClick={()=>setActiveIndex(1)} isActive={activeIndex === 1 ? !false : false}>{t("Onsale")}</CustomButton>
                        </ContainerTabButton>
                    </Flex>
                }
                <>
                    { isOnChain ?
                        <>
                            { activeIndex === 0 ?
                                <Inwallet filterBoxType={tabIndex}/>
                            :
                                <OnSale/>
                            }
                        </>

                    :
                        <OffChainBox/>
                    }
                </>
           </Flex>
          
        </PageFullWidth>
    )
}
export default ADMINISTRATOR

const ContainerTabButton = styled(Flex)`
    width:100%;
`
const CustomTab = styled(Button)<{isActive?:boolean}>`
    width: auto;
    background:none;
    box-shadow: none;
    font-size:22px;
    font-weight:bold;
    border-radius:0px;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
    /* @media only screen and (max-width: 600px) {
        width: 50%;
    } */
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`
const Row = styled(Flex)`
  margin-top:1.25rem;
  width:100%;
  justify-content: space-between;
  flex-wrap:wrap-reverse;
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
  gap: 50px; 
`