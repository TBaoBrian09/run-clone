import React,{ useState, useEffect }from 'react'
import styled from 'styled-components';

interface Props{
    initialMinute?:any;
    initialSeconds?:any;
    handleSendcode?:any;
}
const Timers = (props:Props) => {
    const {initialMinute = 0,initialSeconds = 0,handleSendcode} = props;
    const [minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    handleSendcode(()=>{
        alert('da vai')
        // sethandleMinutes("60");
        // sethandleSecond("00");
    })
    useEffect(()=>{
    const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div>
        { minutes === 0 && seconds === 0 ? <TextVerify onClick={()=>handleSendcode()}>
                       Get Verify Code
                  </TextVerify>
         // eslint-disable-next-line react/react-in-jsx-scope
            : <TextVerify> Code Resend in  {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</TextVerify> 
        }
        </div>       
    )
}
const TextVerify = styled.div`
font-style: normal;
font-weight: 600;
font-size: 14px;
text-align: right;
color: #FF592C;
`
export default Timers;