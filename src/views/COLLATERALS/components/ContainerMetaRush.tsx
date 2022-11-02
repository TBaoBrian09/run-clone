import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'contexts/Localization'
import { usePriceRunBusd } from "state/farms/hooks";
import { GetBalanceNftInMarket } from 'state/multiBuyBox'
import ConditionCard from "./ConditionCard";
import CardAdmin from "./AdminCard"

const dataAdmin = [
    {
        id: 1,
        name: 'MetaRush'
    },
    {
        id: 2,
        name: 'MetaRun'
    },
    {
        id: 3,
        name: 'MetaRace'
    },
    {
        id: 4,
        name: 'MetaRich'
    },
]

interface Props {
    listItems:any
}
const ContainerCardMetaRush:React.FC<Props> = ({listItems}) => {
    const { t } = useTranslation()
    const runBusdPrice = usePriceRunBusd().toNumber()
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const [currentItems, setCurrentItems] = useState([...listItems])
    const itemsPerPage = itemOffset === 0 ? 8 : 9
   
    // panigate
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listItems.length
        setItemOffset(newOffset)
    }
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(listItems.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(listItems.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, listItems])
    
    const [ nftBalance ] = GetBalanceNftInMarket()
   
    const totalNftInMarket = nftBalance.totalNftMetaRace+nftBalance.totalNftMetaRich+nftBalance.totalNftMetaRun+nftBalance.totalNftMetaRush
    return (
        <Flex width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="50vh">
            <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
                { ( totalNftInMarket === 0 && currentItems.length === 0 ) ? 
                    <Text>No Data</Text>
                :
                    <>
                        { currentItems.length !== 0 ?
                            <>
                                { itemOffset === 0 &&
                                    <CardAdmin boxName={dataAdmin} totalNftInMarket={totalNftInMarket}/>
                                }
                                {currentItems.map((item) => {
                                    return (
                                    <ConditionCard
                                        isStore={!false}
                                        nftId={item.nftId}
                                        saleId={item.saleId}
                                        nftType={item.boxType}
                                        price={item.priceListing}
                                        seller={item.seller}
                                        runBusdPrice={runBusdPrice}
                                    />
                                    )
                                })}
                            </>
                        :
                            <>
                                { itemOffset === 0 &&
                                    <CardAdmin boxName={dataAdmin} totalNftInMarket={totalNftInMarket}/>
                                }
                            </>
                        }
                    </>
                }
            </Flex>
            <CustomFlex width="100%" mt="1rem" justifyContent="center" height="62px">
                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </CustomFlex>
        </Flex>
    )
}
export default ContainerCardMetaRush

const CustomFlex = styled(Flex)`
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
