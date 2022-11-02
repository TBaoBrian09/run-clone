import React from "react";
import { Text , Flex, Button, InputGroup, Input } from "@phamphu19498/runtogether-uikit"
import styled from "styled-components";


export const IconButton = styled(Button)<{isActive?:boolean}>`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background: ${({ isActive }) => isActive ? "#FF592C" : "transparent" };
    box-shadow:none;
    border:2px solid ${({ isActive }) => isActive ? "none" : "#E6E8EC" };
`
export const CustomInputGroup = styled(InputGroup)`
    width: 305px;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius:12px;
    background: transparent !important;
    > input {
        background: transparent !important;
        border: none;
        height: 48px;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`