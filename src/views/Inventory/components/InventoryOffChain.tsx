import React from "react";
import styled from "styled-components";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import ListBoxes from "./ListBoxes";
import ListShoes from "./ListShoes"

interface Props {
    isListBoxes?:boolean
    filterType?:number
}

const InventoryOffChain:React.FC<Props> = ({isListBoxes, filterType}) => {
    return (
        <Flex width="100%" flexDirection="column">
            { isListBoxes ?
                <ListBoxes filter={filterType} />
            :
                <ListShoes filter={filterType}/>
            }
           
        </Flex>
    )
}
export default InventoryOffChain