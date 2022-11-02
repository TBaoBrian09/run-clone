import React, { useEffect, useState } from "react";
import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import Card from "./Card";

const OffChainBox = () => {
    return (
        <Flex width="100%" flexDirection="column" mt="3rem" height="auto" minHeight="50vh">
            <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
                <Card 
                    ID={1}
                    boxType={1}
                    onChain={false}
                />
            </Flex>
        </Flex>
    )
}

export default OffChainBox

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