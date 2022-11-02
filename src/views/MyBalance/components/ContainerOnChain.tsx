import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Flex, Button  } from "@phamphu19498/runtogether-uikit";
import Select, { OptionProps } from 'components/Select/Select'
import ReactPaginate from 'react-paginate';
import { useTranslation } from "contexts/Localization";
import { GetAllTransaction } from "state/mybalance";
import Row from "./Row"

interface Props {
    filterTx?:number
    startDate?:string
    endDate?:string
}
const ContainerOnChain:React.FC<Props> = ({
    filterTx,
    startDate,
    endDate
}) => {
    const itemsPerPage = 9
    const { t } = useTranslation()
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [ listAllTransactions ] = GetAllTransaction(startDate, endDate)
       
    // panigate
    function MovetoTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listAllTransactions.length;
          setItemOffset(newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(listAllTransactions.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(listAllTransactions.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, listAllTransactions]);
    useEffect(() => {
            setItemOffset(0);
    }, [listAllTransactions]);
    return (
        <Flex width="100%" flexDirection="column" height="auto" mb="1.5rem">
            <ContainerRow>
                <ContainerChain>
                    <Text>Chain</Text>
                </ContainerChain>
                <ContainerType>
                    <Text>Type</Text>
                </ContainerType>
                <ContainerTime>
                    <Text>Time</Text>
                </ContainerTime>
                <ContainerBalance>
                   <Text>Balance</Text>
                </ContainerBalance>
            </ContainerRow>
            <Flex width="100%" flexDirection="column" mt="1rem" height="100%" minHeight="50vh" >
                {currentItems.length !== 0 ?
                    <>
                        {currentItems.map((item) => {
                            return (
                                <Row 
                                    typeTx={item.reason}
                                    time={item.updated_time}
                                    balance={item.balance_change}
                                />
                            )
                        })}
                    </>
                :
                    <Flex width="100%" justifyContent="center" mt="1rem">
                        <Text mt="2rem">{t("No Data")}</Text>
                    </Flex>
                }
            </Flex>
           
             <CustomFlex width="100%" mt="1rem" justifyContent="center" height="62px">
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    onClick={MovetoTop}
                />
            </CustomFlex>
        </Flex>
    )
}
export default ContainerOnChain

const ContainerRow = styled(Flex)`
    width: 100%;
    height:100px;
    padding-left:12px;
    box-shadow: inset 0px -1px 0px #E4E4E4;
    flex-wrap: wrap;
    @media screen and (max-width: 600px) {
        display: none;
    }
    
`
const Tags = styled.div<{backgroundColor:string}>`
    width: 146px;
    height: 42px;
    background: ${({ backgroundColor }) => backgroundColor};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    @media screen and (max-width: 600px) {
        width: 110px;
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
const ContainerTitle = styled(Flex)`
     @media screen and (min-width: 600px) {
        display: none;
    }
`
const CustomFlex = styled(Flex)`
margin-bottom:1.5rem;
.pagination{
    display:flex;
    flex-direction: row;
    width:500px;
    justify-content:space-around;
    align-items:center;
    @media screen and (max-width: 600px){
        width: 100%;
    }
    *{
        list-style-type: none;
    }
}
.page-link {
    background:${({ theme }) => theme.colors.tertiary};
    padding:12px;
    border-radius:5px !important;
    border:none !important;
    color:${({ theme }) => theme.colors.text};
    &:focus {
        box-shadow:none !important;
    }
    &:hover{
        background:${({ theme }) => theme.colors.backgroundTab};
    }
}
.page-item.disabled .page-link{
    background:${({ theme }) => theme.colors.disabled};
    cursor: not-allowed! important;
    opacity: 0.7;
    pointer-events:none;
}
.page-item.active .page-link{
    background:${({ theme }) => theme.colors.primaryBright};
    color:#fff;
}
`