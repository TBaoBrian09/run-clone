import React, { useState } from 'react'
import styled from 'styled-components'
import { Player } from '@lottiefiles/react-lottie-player';



const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BoxOpened: React.FC = () => {
  return (
    <Wrapper>
           <Player
            autoplay={!false}
            loop={!false}
            controls={false}
            src="https://assets3.lottiefiles.com/packages/lf20_lkauahce.json"
            style={{ height: '350px', width: '350px' }}
          />
    </Wrapper>
  )
}

export default BoxOpened
