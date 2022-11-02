// import React from 'react'
// import styled from 'styled-components'
// import { Card } from '@phamphu19498/runtogether-uikit'

// export const BodyWrapper = styled(Card)`
//   border-radius: 24px;
//   max-width: 436px;
//   width: 100%;
//   z-index: 1;
// `

// /**
//  * The styled container element that wraps the content of most pages and the tabs.
//  */
// export default function AppBody({ children }: { children: React.ReactNode }) {
//   return <BodyWrapper>{children}</BodyWrapper>
// }
import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 550px;
  width: 100%;
  z-index: 5;
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(20px);
  border-radius: 12px;
  margin-bottom:30px;
  @media only screen and (max-width: 600px) {
    margin-left:16px;
    margin-right:16px;
    width: 98%;
  }
`
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
