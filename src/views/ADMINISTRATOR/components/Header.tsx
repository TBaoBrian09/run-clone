import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@phamphu19498/runtogether-uikit'

const Header = ({ nameTitle, namePlace, imgIcon, ...props }) => {
  return (
    <Container>
      <Row className="hihihii">
        <Col height="100%">
          <FlexTitle paddingTop="100px" width="100%" height="100%" alignItems="start" flexDirection="column">
            <TextTitle textTransform="uppercase" color="#fff" fontSize="16px" bold>
              {nameTitle}
            </TextTitle>
            <TextPlace fontSize="76px" bold color="#fff">
              {namePlace}
            </TextPlace>
          </FlexTitle>
        </Col>
        <ColImage>
          <WrapImg>
            <ImgIcon src={imgIcon} />
          </WrapImg>
        </ColImage>
      </Row>
    </Container>
  )
}

export default Header

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: url('./images/runInventory/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1rem;
  /* margin-top: 2rem; */
  @media screen and (max-width: 1024px) {
    height: 400px;
  }

  @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 3px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 250px;
    padding: 3px;
  }
`

const Row = styled.div`
  height: 100%;
`

const Col = styled(Flex)`
  padding: 0px 250px;
  z-index: 99;
  @media screen and (max-width: 1024px) {
    padding: 0px 0px 0px 115px;
  }
  @media screen and (max-width: 500px) {
    padding: 0px 0px 0px 10px;
  }
`

const FlexTitle = styled(Flex)`
  gap: 0px;
  @media screen and (max-width: 1024px) {
    padding-top: 70px;
  }
  @media screen and (max-width: 500px) {
    padding-top: 10px;
  }
`

const TextTitle = styled(Text)``

const TextPlace = styled(Text)`
  @media screen and (max-width: 1440px) {
    font-size: 90px;
  }

  @media screen and (max-width: 1024px) {
    font-size: 60px;
  }

  @media screen and (max-width: 800px) {
    font-size: 50px;
  }
  @media screen and (max-width: 500px) {
    font-size: 41px;
  }
`

const ColImage = styled(Flex)`
  position: absolute;
  right: 158px;
  top: 39px;
  @media screen and (max-width: 1024px) {
    top: 100px;
    right: 284px;
  }
  @media screen and (max-width: 800px) {
    right: 183px;
    top: 80px;
  }
  @media screen and (max-width: 500px) {
    right: 112px;
    top: 86px;
  }
`

// const ColImageShoe = styled(Flex)`
//   position: absolute;
//   top: 190px;
//   right: 20px;
//   @media screen and (max-width: 1024px) {
//     top: 165px;
//   }
//   @media screen and (max-width: 800px) {
//     top: 133px;
//   }
//   @media screen and (max-width: 500px) {
//     top: 133px;
//     right: 6px
//   }
// `

const WrapImg = styled.div``

const ImgIcon = styled.img`
  width: 627px;
  @media screen and (max-width: 1024px) {
    width: 250px;
  }
  @media screen and (max-width: 800px) {
    width: 200px;
  }
  @media screen and (max-width: 500px) {
    width: 150px;
  }
`

// const Img = styled.img`
//   width: 500px;
//   @media screen and (max-width: 1024px) {
//     width: 400px;
//   }
//   @media screen and (max-width: 800px) {
//     width: 280px;
//   }
//   @media screen and (max-width: 500px) {
//     width: 195px;
//   }
// `
