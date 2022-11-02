import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import styled from "styled-components";
import ReactPaginate from 'react-paginate';
import PageFullWidth from "components/Layout/PageFullWidth";
import Container from "components/Layout/Container";
import { Flex, InputGroup, Input, SearchIcon,  ButtonMenu, ButtonMenuItem, AutoRenewIcon } from "@phamphu19498/runtogether-uikit"
import { useTranslation } from "contexts/Localization";
import { latinise } from 'utils/latinise'
import { getAddress } from "utils/addressHelpers";
import Select, { OptionProps } from 'components/Select/Select'
import { useWeb3React } from "@web3-react/core";
import Header from "./componets/Header"
import AirdropCard from "./componets/Card"
import { listAirdrop } from "./config"


const Airdrop = () => {
    const { t } = useTranslation()
    const itemsPerPage = 6
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);    
    const [sortOption, setSortOption] = useState('all')
    const [saleObject, setSaleObject] = useState([]);
    const [saleArray, setSaleArray] = useState([]);
    const [saleItem, setSaleItem] = useState([]);
    const [sortprice, setSortprice] = useState("highest");
    const [refresh, setRefresh] = useState(false);
    const [currentItems, setCurrentItems] = useState(null);
    const { account } = useWeb3React()
    const [pending, setPending ] = useState(false)
    const [query, setQuery] = useState('')  
    const [ object, setObject ] = useState([])  
    const styleActive = { background: '#49A2F2', color: '#fff', borderRadius:"5px"}
    const [index, setIndex] = useState(1);
    const handleClick = (newIndex) => setIndex(newIndex);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(saleArray.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(saleArray.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, saleItem, saleArray, sortOption])

    useEffect(() => {
        setItemOffset(0);
    }, [sortOption]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % saleArray.length;
        setItemOffset(newOffset);
    }
    
    function MovetoTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    
    const handleSortOptionNFT = (option: OptionProps): void => {
        setSortOption(option.value)
    }
    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }
    useEffect(()=>{
        if ( index === 0 ) {
            setSaleObject(listAirdrop(t).filter(d => d.status === "live"))
        } 
        if ( index !== 0 ) {
            setSaleObject(listAirdrop(t).filter(d => d.status === "ended"))
        }
    },[index, t])

    useEffect(() => {
        function SortItem () {
            if ( sortOption === "all") {
                setSaleArray(saleObject)
            } if (sortOption === "numberOfWinners" ) {
                setSaleArray(saleObject.sort((a, b) => (b.numberofwinner - a.numberofwinner)))
            }
        }
        if (saleObject || sortOption ) {
            SortItem()
        }
    }, [saleObject, sortOption ])
    useEffect(() => {
        function SearchItem () {
            const lowercaseQuery = latinise(query.toLowerCase())
            setSaleArray(saleObject.filter((data) =>{
                return latinise(data.title.toLowerCase()).includes(lowercaseQuery)
            }))
        }
        if (saleObject || saleArray || query ) {
            SearchItem()
        }
    }, [saleObject, sortOption, query]) // eslint-disable-line react-hooks/exhaustive-deps
    return(
        <PageFullWidth>
            <Header 
                pagetitle={t("Airdrop")}
                title={t("Our gifts to all LiveTraders")}
                subtitle={t("Thank you for supporting us!")}
                image="/images/airdrop/banner.png"
            />
            <CustomContainer>
                <Row width="100%" alignItems="center" mt="1.5rem">
                    <Flex>
                        <CustomButtonMenu activeIndex={index} onItemClick={handleClick} scale="sm" variant="primary">
                            <CustomButtonMenuItem style={index === 0 ? styleActive : undefined}>
                                Live
                            </CustomButtonMenuItem>
                            <CustomButtonMenuItem style={index !== 0 ? styleActive : undefined}>
                                Ended
                            </CustomButtonMenuItem>
                        </CustomButtonMenu>
                    </Flex>
                    <Flex>
                        <Select
                            options={[
                                {
                                label: t('All'),
                                value: 'all',
                                },
                                {
                                    label:t("Winners"),
                                    value:"numberOfWinners"
                                }
                            
                            ]}
                            onChange={handleSortOptionNFT}
                        />
                        <Wrapper>
                            <InputGroup startIcon={<SearchIcon width="24px" />} scale="md">
                                <Input type="text" placeholder={t("Placeholder")} onChange={handleChangeQuery} />
                            </InputGroup>
                        </Wrapper>
                    </Flex>
                   
                </Row>

                <Wrap> 
                    { saleArray.length === 0 ?
                        <Flex mt="1rem" justifyContent="center" alignItems="center">
                            <AutoRenewIcon spin color="primaryBright" style={{width:"30px"}}/>
                        </Flex>
                    :
                        <>
                            { saleArray.map((item) => {
                                return (
                                    <AirdropCard item={item}/>
                                )
                            })}
                        </>
                    }
                    
                </Wrap>
                { pageCount > 1 &&
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
                }
                
               
            </CustomContainer>
        </PageFullWidth>
    )
}
export default Airdrop

const Wrap = styled.div`
    display:flex;
    width:1300px;
    padding-top:1.5rem;
    padding-bottom:1.5rem;
    flex-direction: row;
    flex-wrap:wrap;
    justify-content:space-around;
    align-items:center;
    @media only screen and (max-width:1400px) {
        width:100%;
    }
`
const CustomContainer = styled(Container)`
    padding-left:10px;
    padding-right:10px;
    width:100%;
    @media only screen and (max-width:600px) {
        padding-left:10px;
        padding-right:10px;
        width:100%;
    }
`
const CustomFlex = styled(Flex)`
    .pagination{
        display:flex;
        flex-direction: row;
        background:${({ theme }) => theme.colors.backgroundTab};
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
const Row = styled(Flex)`
    width:100%;
    justify-content:space-between;
    @media only screen and (max-width:600px) {
        justify-content:flex-start;
        align-items:flex-start;
        flex-direction:column;
        width:100%;
        ${Flex}{
            margin-bottom:1rem;
        }
    }
`
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-left:5px;
    @media only screen and (max-width:600px) {
        width:50%;
    }
`
const CustomButtonMenu = styled(ButtonMenu)`
  border-radius:5px !important;
  background:${({ theme }) => theme.colors.input};
`
const CustomButtonMenuItem = styled(ButtonMenuItem)`
  display:flex;
  align-items:center;
  justify-content:center;
  height:35px;
  width:90px !important;
  color:${({ theme }) => theme.colors.text};
`