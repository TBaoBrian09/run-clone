import React, { useEffect, useState } from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import { GetBalanceNft, GetNftInfo, GetTokenIds } from "state/marketplace";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "contexts/Localization";
import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import Card from "./Card"


interface Props{
    filterBoxType?:number
}
const Inwallet:React.FC<Props> = ({filterBoxType}) => {
    const itemsPerPage = 9
    const { t } = useTranslation()
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { account } = useWeb3React()
    const [ balance ] = GetBalanceNft(account)
    const [ tokenIds ] = GetTokenIds(account, balance) 
    const [ nftInfo ] = GetNftInfo(tokenIds)
    
    const [ listNft, setListNft ] = useState([...nftInfo])
    useEffect(() => {
        if(filterBoxType === 0){
            setListNft([...nftInfo])
        } if(filterBoxType !== 0)  {
            setListNft(nftInfo.filter((data) => data.nftType === filterBoxType))
        }
    }, [nftInfo, filterBoxType])
    // panigate
    function MovetoTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    const handlePageClick = (event) => {
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
    }, [listNft]);
    return (
        <Flex width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="50vh">
            <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
                {currentItems.length !== 0 ?
                    <>
                        {currentItems.map((item) => {
                            return (
                                <Card 
                                    ID={item.nftId}
                                    boxType={item.nftType}
                                    IsHaving={!false}
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
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="Previous"
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
export default Inwallet

const CustomFlex = styled(Flex)`
    .pagination{
        display:flex;
        flex-direction: row;
        width:340px;
        justify-content:space-around;
        align-items:center;
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