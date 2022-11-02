import React from 'react'
import styled from 'styled-components'

const StyledBlock = styled.div`
    width:93px;
    height:auto;
    background-image:${({ theme }) => (theme.isDark ? "url(/images/membership/item-block-dark.png)" : "url(/images/membership/item-block-light.png)")};
    background-size: 103px 103px;
    background-position: center;
    background-repeat: none;
    font-size: 45px;
    margin: auto;
    padding: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin-left: 10px;
    margin-right: 10px;
    @media screen and (max-width: 600px) {
        padding:10px;
        margin-left:5px;
        margin-right:5px;
        font-size: 26px;
        width: 73px;
        height: 73px;
        background-size: 73px 73px;
    }
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:63px;
        height:auto;
        font-size: 35px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
`

const BlockWrapper = styled.div`
    text-align: center;
`

const BlockInfo = styled.div`
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.text};
`

const ItemBlock = ({children , label}) => {
  
    return (
        <BlockWrapper>
            <StyledBlock>
                {children}
            </StyledBlock>
            <BlockInfo>{label}</BlockInfo>
        </BlockWrapper>

    )
  }
  
  export default ItemBlock
  