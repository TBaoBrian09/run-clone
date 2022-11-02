import React, { useEffect, useState } from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import ReactPaginate from 'react-paginate';
import { GetTotalSellItems, GetSellItemsByUser } from "state/marketplace";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "contexts/Localization";
import Card from "./Card";

interface Props{
    filterBoxType?:number
}

const OnSale:React.FC<Props> = ({filterBoxType}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const [ totalSell ] = GetTotalSellItems()
    const [ listItems ] = GetSellItemsByUser(totalSell, account)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 9
    const [pageActive, setPageActive] = useState(0);
    
    // panigate
    const [ listNft, setListNft ] = useState([...listItems])
    useEffect(() => {
        if(filterBoxType === 0){
            setListNft([...listItems])
        } if(filterBoxType !== 0)  {
            setListNft(listItems.filter((data) => data.boxType === filterBoxType))
        }
    }, [listItems, filterBoxType])
    function MovetoTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    const handlePageClick = (event) => {
        setPageActive(event.selected);
        const newOffset = (event.selected * itemsPerPage) % listNft.length;
          setItemOffset(newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(listNft.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listNft.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, listNft]);
    useEffect(() => {
            setItemOffset(0);
            setPageActive(0);
    }, [listNft]);
    return (
        <Flex width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="70vh">
            <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
               
                {currentItems.length !== 0 ?
                    <>
                        {currentItems.map((item) => {
                            return (
                                <Card 
                                    ID={item.nftId}
                                    boxType={item.boxType}
                                    saleId={item.saleId}
                                    price={item.priceListing}
                                    IsHaving={false}
                                    onChain={!false}
                                /> 
                            )
                        })}
                    </>
                :
                        <Text mt="2rem">{t("No Data")}</Text>
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
                    forcePage={pageActive}
                />
            </CustomFlex>
        </Flex>
    )
}

export default OnSale

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