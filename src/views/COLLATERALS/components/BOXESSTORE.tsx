import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'contexts/Localization'
import { GetTotalSellItems, GetListItems } from "state/marketplace/index"
import { usePriceRunBusd } from "state/farms/hooks";
import { GetBalanceNftInMarket } from 'state/multiBuyBox'
import ConditionCard from "./ConditionCard";
import CardAdmin from "./AdminCard"
import ContainerCard from "./ContainerCardAll";
import ContainerCardMetaRush from "./ContainerMetaRush";
import ContainerCardMetaRun from "./ContainerMetaRun";
import ContainerCardMetaRace from "./ContainerMetaRace";
import ContainerCardMetaRich from "./ContainerCardMetaRich";

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
    sortprice:string
    filterBoxType:number
}
const BOXESSTORE:React.FC<Props> = ({sortprice, filterBoxType}) => {
    const { t } = useTranslation()
    
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const [ totalSell ] = GetTotalSellItems()
    const [ listItems ] = GetListItems(totalSell)
    const [currentItems, setCurrentItems] = useState([...listItems])
    const [pageOffset, setPageOffset] = useState(0);
    const [listNftItem, setListNftItem] = useState([])
    const itemsPerPage = itemOffset === 0 ? 8 : 9
    const runBusdPrice = usePriceRunBusd().toNumber()
    useEffect(() => {
        const object = [...listItems]
        if (sortprice==="highest"){
            if ( filterBoxType !== 0 ) {
                return setListNftItem(
                    object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)).filter((data) => data.boxType === filterBoxType),
                )
            } 
            return setListNftItem(
                object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)),
            )
        } if (sortprice === 'lowest') {
            if ( filterBoxType !== 0 ) {
                return setListNftItem(
                    object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)).filter((data) => data.boxType === filterBoxType),
                )
            }
            return setListNftItem(
              object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)),
            )
        }
        return setListNftItem([...listItems])
    }, [sortprice, listItems, filterBoxType])
    
    
    const [ nftBalance ] = GetBalanceNftInMarket()
   
    return (
        <Flex width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="50vh">
            { filterBoxType === 0 &&
                <ContainerCard listItems={listNftItem}/>
            }
            { filterBoxType === 1 &&
                <ContainerCardMetaRush listItems={listNftItem}/>
            }
            { filterBoxType === 2 &&
                <ContainerCardMetaRun listItems={listNftItem}/>
            }
            { filterBoxType === 3 &&
                <ContainerCardMetaRace listItems={listNftItem}/>
            }
            { filterBoxType === 4 &&
                <ContainerCardMetaRich listItems={listNftItem}/>
            }
            
        </Flex>
    )
}
export default BOXESSTORE


