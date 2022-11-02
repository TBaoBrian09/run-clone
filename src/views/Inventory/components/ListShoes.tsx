import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit"
import ReactPaginate from 'react-paginate';
import { useTranslation } from "contexts/Localization";
import { GetListShoes } from "state/inventory/index"
import { DecryptsUserInfo } from "config/api/decrypts";
import CardShoes from "./CardShoes";


interface Props {
    filter?:number
}
const ListShoes:React.FC<Props> = ({filter}) => {
    const dataUser:any = DecryptsUserInfo() || "";
    const [ listShoes ] = GetListShoes(dataUser ? dataUser.id : "")
    const [ listNft, setListNft ] = useState([...listShoes])
    const itemsPerPage = 9
    const { t } = useTranslation()
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    useEffect(() => {
        if(filter === 0){
            setListNft([...listShoes])
        } if(filter !== 0)  {
            setListNft(listShoes.filter((data) => data.type === filter))
        }
    }, [listShoes, filter])
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
        <Flex width="100%" flexDirection="column" mt="3rem" height="auto" minHeight="50vh">
            <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
                {currentItems.length !== 0 ?
                    <>
                        {currentItems.map((item) => {
                            return (
                                <CardShoes 
                                    ID={item.token_id}
                                    nftName={item.name}
                                    nftImage={item.image}
                                    efficiency={item.efficiency}
                                    comfort={item.comfy}
                                    luck={item.luck}
                                    durability={item.sturdence_remain}
                                    nftType={item.type}
                                    mininghydro={item.energy_mining}
                                    runninghydro={item.energy}
                                    speed={item.sneaker_config[1].value}
                                    sturdence={item.sturdence}
                                    expiration={item.expiration}
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
                />
            </CustomFlex>
        </Flex>
    )
}
export default ListShoes

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