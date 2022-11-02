// import React from 'react'
// import styled from 'styled-components'
// import { Flex } from '@phamphu19498/runtogether-uikit'
// import Footer from 'components/Menu/Footer'
// import SubNav from 'components/Menu/SubNav'

// const StyledPage = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   padding: 16px;
//   padding-bottom: 0;
//   min-height: calc(100vh - 64px);
//   background: ${({ theme }) => theme.colors.gradients.bubblegum};

//   ${({ theme }) => theme.mediaQueries.xs} {
//     background-size: auto;
//   }

//   ${({ theme }) => theme.mediaQueries.sm} {
//     padding: 24px;
//     padding-bottom: 0;
//   }

//   ${({ theme }) => theme.mediaQueries.lg} {
//     padding-top: 32px;
//     min-height: calc(100vh - 64px);
//   }
// `

// const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
//   return (
//     <StyledPage {...props}>
//       <SubNav />
//       {children}
//       <Flex flexGrow={1} />
//       <Footer />
//     </StyledPage>
//   )
// }

// export default Page
import React from 'react'
import styled from 'styled-components'
import { Flex } from 'components/Pancake-uikit'
import Footer from 'components/Menu/Footer'
import SubNav from 'components/Menu/SubNav'
import BannerHeader from 'components/BannerHeader'
import { useTranslation } from 'contexts/Localization'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  // background-image: url("/images/LiveTrade_BACKGROUND.svg");
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center;
  // background-attachment: fixed;

  ${({ theme }) => theme.mediaQueries.xs} {
    
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    min-height: calc(100vh - 64px);
  }
`
const Container = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
`

const Wrapper = styled.div`
  //  background-image: url("/images/Swap_Background.png");
   background-position:center;
   background-repeat: no-repeat;
   background-size: cover;
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {

  const { t } = useTranslation()

  return (
    <Wrapper>
      {/* <Container>
        <BannerHeader>
          {t('Swap')}
        </BannerHeader>
      </Container> */}
      <StyledPage {...props}>
        {/* <SubNav /> */}
        {children}
        <Flex flexGrow={1} />
        {/* <Footer /> */}
      </StyledPage>
    </Wrapper>
  )
}

export default Page
