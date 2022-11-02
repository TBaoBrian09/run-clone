import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from '@phamphu19498/runtogether-uikit'

interface Props {
  idRow?: number
  avatar?: string
  name?: string
  level?: string
  commision?: string
  manipulation?: string
}
const RowPartner: React.FC<Props> = ({ idRow, avatar, name, level, commision, manipulation }) => {
   return (
    <ContainerRow isBackground={idRow % 2 === 0 ? !false : false}>
      <Col>
        <CustomFlex>
          <CustomTitle>AVATAR</CustomTitle>
          <ImgAvatar src={avatar} />
        </CustomFlex>
      </Col>
      <Col>
        <CustomFlex>
          <CustomTitle>NAME</CustomTitle>
          <Text>{name}</Text>
        </CustomFlex>
      </Col>
      <Col>
        <CustomFlex>
          <CustomTitle>LEVEL</CustomTitle>
          <Text>{level}</Text>
        </CustomFlex>
      </Col>
    </ContainerRow>
  )
}
export default RowPartner

const ContainerRow = styled(Flex)<{ isBackground: boolean }>`
  width: 100%;
  height: 100px;
  background: ${({ isBackground }) => (isBackground ? '#F2F2F2' : 'transparent')};
  padding-left: 0px;
  box-shadow: inset 0px -1px 0px #e4e4e4;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    background:#F2F2F2;
    margin-bottom:1rem;
  }
`
const CustomTitle = styled(Text)`
  @media screen and (min-width: 600px) {
    display: none;
  }
`
const Col = styled(Flex)`
  width: 33.33%;
  height: 100%;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 60px;
    justify-content: flex-start;
    padding:0px 15px 0px 15px;
  }
`

const ImgAvatar = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 90px;
`

const ImgIcon = styled.img`
  width: 30px;
  height: 30px;
`
const CustomFlex = styled(Flex)`
    justify-content:center;
    width: 100%;
    align-items: center;
    @media screen and (max-width: 600px) {
        justify-content:space-between;
    }
`
