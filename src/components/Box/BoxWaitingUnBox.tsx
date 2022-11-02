import React, { useState } from 'react'
import styled from 'styled-components'
import { Player } from '@lottiefiles/react-lottie-player';



const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BoxWaitingUnBox: React.FC = () => {
  return (
    <Wrapper>
           <Player
            autoplay={!false}
            loop={!false}
            controls={false}
            src="https://assets6.lottiefiles.com/packages/lf20_murydc7u.json"
            style={{ height: '370px', width: '370px' }}
          />
    </Wrapper>
  )
}

export default BoxWaitingUnBox
