import Page from 'components/Layout/Page'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'
import { GetTotalSellItems, GetListItems } from "state/marketplace/index"
import { Flex, Text, InputGroup } from '@phamphu19498/runtogether-uikit'
import Header from 'components/HeaderGlobal/Header'
import Select, { OptionProps } from 'components/Select/Select'
import BOXESSTORE from './components/BOXESSTORE'
import ConditionCard from './components/ConditionCard'

// import Header from './components/Header'

const COLLATERALS = () => {
  const { t } = useTranslation()
  const [ activeTab, setActiveTab ] = useState(0)
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [sortprice, setSortprice] = useState('highest')
  const itemsPerPage = 9
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  
  const handleSortOptionPrice = (option: OptionProps): void => {
    setSortprice(option.value)
  }
  const [ totalSell ] = GetTotalSellItems()
  const [ listItems ] = GetListItems(totalSell)
  const [currentItems, setCurrentItems] = useState([...listItems])
  const [listNftItem, setListNftItem] = useState([...listItems])
  // sort
  useEffect(() => {
    const object = [...listItems]
    function SortPrice() {
      if (sortprice === 'highest') {
        return setListNftItem(
          object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)),
        )
      }
      if (sortprice === 'lowest') {
        return setListNftItem(
          object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)),
        )
      }
    }
    if (listItems.length !== 0) {
      SortPrice()
    }
  }, [sortprice, listItems])
  // panigate
  function MovetoTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listNftItem.length
    setItemOffset(newOffset)
  }
  // getsum
  const getSumBoxType = (type: number) => {
    let sumType = 0;
    if(listItems?.length > 0) {
      if(type > 0) {
        sumType = listItems.filter(item => item.boxType === type)?.length;
      }
      else {
        sumType = listItems.length;
      }
    }
    return sumType;
  }
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(listNftItem.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(listNftItem.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, listNftItem, sortprice])
  useEffect(() => {
    setItemOffset(0)
  }, [sortprice])
  return (
    <>
      <Header
        bgColor='#F577FA'
        nameTitle="RUN TOGETHER"
        namePlace="Marketplace"
        imgIcon="./images/runMarketplace/imgBanner.png"
      />
      <CustomPage>
        <ContainerMenu>
            <Wrapper>
                <ContainerTabButton>
                    <CustomButton isActive={ activeIndex === 0 ? !false : false} onClick={()=>setActiveIndex(0)}>
                      <TextCustom ml="5px" color="#777E91" bold>All ({getSumBoxType(0)})</TextCustom>                      
                    </CustomButton>
                </ContainerTabButton>
                <CustomButton isActive={ activeIndex === 1 ? !false : false} onClick={()=>setActiveIndex(1)}>
                  <Tags src="/images/martketplace/11.png" alt="tag box"/>
                  <TextCustom ml="5px" color="#777E91" bold>MetaRush ({getSumBoxType(1)})</TextCustom>
                </CustomButton>
                <CustomButton isActive={ activeIndex === 2 ? !false : false} onClick={()=>setActiveIndex(2)}>
                  <Tags src="/images/martketplace/22.png" alt="tag box"/>
                  <TextCustom ml="5px" color="#777E91" bold>MetaRun ({getSumBoxType(2)})</TextCustom>
                </CustomButton>
                <CustomButton isActive={ activeIndex === 3 ? !false : false} onClick={()=>setActiveIndex(3)}>
                  <Tags src="/images/martketplace/33.png" alt="tag box"/>
                  <TextCustom ml="5px" color="#777E91" bold>MetaRace ({getSumBoxType(3)})</TextCustom>
                </CustomButton>
                <CustomButton isActive={ activeIndex === 4 ? !false : false} onClick={()=>setActiveIndex(4)}>
                  <Tags src="/images/martketplace/44.png" alt="tag box"/>
                  <TextCustom ml="5px" color="#777E91" bold>MetaRich ({getSumBoxType(4)})</TextCustom>
                </CustomButton>
            </Wrapper>
            <FlexPrice alignItems="center">
              <Text textTransform='uppercase' color="#777E91" mr="10px">Price</Text>
              <Select
                   options={[
                    {
                        label: t('Highest to lowest'),
                        value: 'highest',
                    },
                    {
                        label: t('Lowest to highest'),
                        value: 'lowest',
                    },
                    ]}
                    onChange={handleSortOptionPrice}
                />
            </FlexPrice>
        </ContainerMenu>
        <Container>
          <Flex
            width="100%"
            flexWrap="wrap"
            justifyContent="space-around"
            alignItems="center"
            minHeight="50vh"
            mt="1.25rem"
            mb="1.25rem"
          >
           <BOXESSTORE
              sortprice={sortprice}
              filterBoxType={activeIndex}
            />
            
          </Flex>
        </Container>
      </CustomPage>
    </>
  )
}

export default COLLATERALS

const CustomPage = styled(Page)`
  @media only screen and (max-width: 600px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`
const Container = styled.div`
`
const CustomInputGroup = styled(InputGroup)`
  width: 231px;
  border-radius: 5px;
  height: 100%;
  @media only screen and (max-width: 600px) {
    width: 200px;
  }
`
const CustomFlex = styled(Flex)`
  .pagination {
    display: flex;
    flex-direction: row;
    width: 340px;
    justify-content: space-around;
    align-items: center;
    * {
      list-style-type: none;
    }
  }
  .page-link {
    background: ${({ theme }) => theme.colors.tertiary};
    padding: 12px;
    border-radius: 5px !important;
    border: none !important;
    color: ${({ theme }) => theme.colors.text};
    &:focus {
      box-shadow: none !important;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundTab};
    }
  }
  .page-item.disabled .page-link {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed !important;
    opacity: 0.7;
    pointer-events: none;
  }
  .page-item.active .page-link {
    background: ${({ theme }) => theme.colors.primaryBright};
    color: #fff;
  }
`

const TextCustom = styled(Text)`
  @media only screen and (max-width: 500px) {
    font-size:12px;
  }
`

const CustomButton = styled.div<{isActive:boolean}>`
  height:60px;
  width: auto;
  padding:0px 10px 0px 10px;
  border-bottom: ${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"};
  font-weight:bold;
  color:#777E91;
  padding-bottom:10px;
  display: flex;
  align-items: center;
  cursor:pointer;
  @media only screen and (max-width: 600px) {
    width: 50%;
    justify-content: flex-start;
    margin-bottom:1rem;
    &:first-child {
      justify-content: center;
      
    }
  }
  @media screen and (max-width: 320px) {
    padding: 0px;
  }
`
const Tags = styled.img`
    height: 35px;
    width: 35px;
    border-radius:50%;
    overflow:hidden;

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
const CustomTab = styled.div<{isActive:boolean}>`
    width: 50%;
    height:50px;
    display:flex;
    font-weight:bold;
    cursor:pointer;
    justify-content: center;
    align-items: center;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
`

const FlexPrice = styled(Flex)`
  gap: 50px;

  @media screen and (max-width: 600px) {
    gap: 14px;
  } 
`

const ContainerMenu = styled(Row)` 
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
const ContainerTabButton = styled(Flex)`
    width: auto;
    @media only screen and (max-width: 600px) {
       width: 100%;
       justify-content: center !important;
       align-items: center !important;
    }
`
const Wrapper = styled(Flex)`
    flex-wrap:wrap;
    @media only screen and (min-width: 600px) and (max-width: 1080px) {
       width: 100%;
       margin-top:10px;
       justify-content:space-between;
    }
`