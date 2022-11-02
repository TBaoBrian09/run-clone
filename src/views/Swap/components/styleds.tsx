import React from 'react'
import { Text, ErrorIcon } from 'components/Pancake-uikit'
import styled, { css } from 'styled-components'
import { AutoColumn } from 'components/Layout/Column'
import { Button, Flex } from '@phamphu19498/runtogether-uikit'
import { RowBetween } from 'components/Layout/Row'

export const Wrapper = styled.div`
  position: relative;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0px 10px 14px -48px rgb(31 47 70 / 12%);
  background: #FCFCFD;

  @media screen and (max-width: 600px) {
    padding: 1rem 0px;    
  }
`

export const ArrowWrapper = styled.div<{ clickable: boolean }>`
  padding: 2px;
  
  ${({ clickable }) =>
    clickable
      ? css`
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
      : null}
`

export const ErrorText = styled(Text)<{ severity?: 0 | 1 | 2 | 3 | 4 }>`
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? theme.colors.failure
      : severity === 2
      ? theme.colors.warning
      : severity === 1
      ? theme.colors.text
      : "green"};
`

export const StyledBalanceMaxMini = styled.button`
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: ${({ theme }) => theme.colors.dropdown};
  }
  :focus {
    background-color: ${({ theme }) => theme.colors.dropdown};
    outline: none;
  }
`

export const TruncatedText = styled(Text).attrs({ ellipsis: true })`
  width: 220px;
  @media screen and (max-width: 375px) {
    font-size: 20px;
  }
  @media screen and (max-width: 320px) {
    font-size: 18px;
  }
`

const SwapCallbackErrorInner = styled.div`
  background-color: ${({ theme }) => `${theme.colors.failure}33`};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.colors.failure};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

const SwapCallbackErrorInnerAlertTriangle = styled.div`
  background-color: ${({ theme }) => `${theme.colors.failure}33`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`

export function SwapCallbackError({ error }: { error: string }) {
  return (
    <SwapCallbackErrorInner>
      <SwapCallbackErrorInnerAlertTriangle>
        <ErrorIcon width="24px" />
      </SwapCallbackErrorInnerAlertTriangle>
      <p>{error}</p>
    </SwapCallbackErrorInner>
  )
}

export const SwapShowAcceptChanges = styled(AutoColumn)`
  /* background-color: ${({ theme }) => `${theme.colors.warning}33`}; */
  padding: 0.5rem;
  border-radius: 12px;
  margin-top: 8px;
`


export const CustomButton = styled(Button)`
  border-radius: 90px !important;
  width: 80%;
  background-color:#FF592C;
  /* padding: 0px 100px !important; */
  box-shadow: none;
  @media screen  and (max-width: 600px){
     padding: 0px;
  }
`

export const CsText = styled(Text)`
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`
