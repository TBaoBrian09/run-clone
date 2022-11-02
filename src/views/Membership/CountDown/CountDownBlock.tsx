import React from 'react'
import styled from 'styled-components'
import Countdown, { zeroPad } from 'react-countdown'
import ItemBlock from './ItemBlock'

const StyledCountDown = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
`

const CountDownBlock = () => {

    const timer = 1636981200000; // Ngày 15/11 : 20H

    const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) return (
            <StyledCountDown>
                <ItemBlock label="DAYS">
                00
                </ItemBlock>
                <ItemBlock label="HOURS">
                00
                </ItemBlock>
                <ItemBlock label="MINUTES">
                00
                </ItemBlock>
                <ItemBlock label="SECONDS">
                00
                </ItemBlock>
            </StyledCountDown>
        )
    
        return (
            <StyledCountDown>
                <ItemBlock label="DAYS">
                {zeroPad(days)}
                </ItemBlock>
                <ItemBlock label="HOURS">
                {zeroPad(hours)}
                </ItemBlock>
                <ItemBlock label="MINUTES">
                {zeroPad(minutes)}
                </ItemBlock>
                <ItemBlock label="SECONDS">
                {zeroPad(seconds)}
                </ItemBlock>
            </StyledCountDown>
        )
    }
  
    return (
        <Countdown zeroPadTime={2} date={timer}  renderer={renderCountdown}/>
    );
  }
  
  export default CountDownBlock
  