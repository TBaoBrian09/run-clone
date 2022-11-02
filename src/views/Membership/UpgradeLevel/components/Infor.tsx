import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text, useMatchBreakpoints } from '@phamphu19498/runtogether-uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { Checked, Button, Box } from 'components/Pancake-uikit'

interface Props {
    id: number
    content: string
    details: string
  }
  
  interface PropType {
    data?:Props  
  }
const Wrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  padding-top:20px;
  padding-bottom:20px;
  @media screen and (max-width: 600px) {
    padding-bottom:0px;
  }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom:15px;
    @media screen and (max-width: 600px) {
      margin-bottom:5px;
    }
`
const Col = styled.div`
  width:70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom:15px;
  margin-left:15%;

  @media only screen and (max-width: 1023px){
    margin-left: unset;
    padding-left: 7%;
    width: 100%;
  }
  font-style: italic;
  @media screen and (max-width: 1025px) {
    padding-left:15%;
    width:100%;
    padding-right:10px;
    margin-left:0%;
  }
  
`
const Row = styled.div`
  width:70%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom:15px;
  margin-left:10%;
  @media screen and (max-width: 1025px) {
    padding-left:5%;
    width:100%;
    margin-left:0%;
  }
`
const CustomText = styled(Text)`
  font-size: 16px;
  @media screen and (max-width: 600px) {
   font-size:13px;
  }
`
const Infor = ({data}) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  return (
    <Wrapper>
      {data.map((item) => {
        if(item.details){
          return (
            <Container key={item.id}>
              <Row>
                <Checked mr="15px"/>
                <CustomText color="text" >{item.content}</CustomText>
              </Row>
              <Col>
              {(item.details).map((details) => {
                  return (
                    <CustomText color="text"> &#x25cf; {details}</CustomText>
                  )
                })}
              </Col>  
            </Container>
          )
        }
          return (
            <Container key={item.id}>
              <Row>
                <Checked color="textSubtle" mr="15px"/>
                <CustomText color="text" >{item.content}</CustomText>
              </Row>
            </Container>
          )
        })}
    </Wrapper>
  )
}

export default Infor
