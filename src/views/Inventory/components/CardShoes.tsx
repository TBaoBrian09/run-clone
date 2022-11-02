import { Button, Flex, Text } from '@phamphu19498/runtogether-uikit';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
import { GetBoxName } from 'hooks/useGetBoxName';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Countdown, { zeroPad } from 'react-countdown'
import { renderBGCard, renderImgBox } from "utils/renderBGCard";
import {
    EfficiencyIcon,
    ComfortIcon,
    LuckIcon,
    DurabilityIcon,
    HydroIcon,
    RunningIcon,
    StarIcon,
    OclockIcon,
    CupIcon,
    SturdanceIcon,
    Progress
} 
from "components/Pancake-uikit"


interface PropsCard{
    ID?: number;
    nftName?:string
    nftImage?:string
    efficiency?:string
    comfort?:string
    luck?:string
    durability?:string
    countdown?:string
    nftType?:string
    mininghydro?:string
    runninghydro?:string
    speed?:number
    sturdence?:number
    expiration?:number
}

const CardShoes:React.FC<PropsCard> = ({
    ID,
    nftName,
    nftImage,
    efficiency,
    comfort,
    luck,
    durability,
    countdown,
    nftType,
    mininghydro,
    runninghydro,
    speed,
    sturdence,
    expiration
}) => {
    const {t} = useTranslation()
    const {account} = useWeb3React()
    const history = useHistory()
        const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) return (
          <Flex>
              <Text>00</Text>
              <Text>00</Text>
              <Text>00</Text>
              <Text>00</Text>
          </Flex>
      )
      return (
          <Flex>
              <Text color={parseInt(zeroPad(days)) < 10 ? "#E75243" : "#000" }>{zeroPad(days)} days, </Text>
              <Text color={parseInt(zeroPad(days)) < 10 ? "#E75243" : "#000" } bold> &nbsp; {zeroPad(hours)}:</Text>
              <Text color={parseInt(zeroPad(days)) < 10 ? "#E75243" : "#000" } bold>{zeroPad(minutes)}:</Text>
              <Text color={parseInt(zeroPad(days)) < 10 ? "#E75243" : "#000" } bold>{zeroPad(seconds)}</Text>
          </Flex>
      )
  }
    return (
        <Container>
            <Flex width="100%" flexDirection="column">
                <CustomCard background={renderBGCard(nftType)}>
                    <ImgShoes src={nftImage} alt='Image Box'/>
                </CustomCard>
                <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                    <ContainerTags background={renderBGCard(nftType)}>
                        <Text bold>{nftName}</Text>
                    </ContainerTags>
                </Flex>
                <Flex width="100%" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Flex width="30px">
                            <HydroIcon/>
                        </Flex>
                        <CustomText ml="5px">Mining hydro</CustomText>
                    </Flex>
                    <CustomText>{mininghydro}</CustomText>
                </Flex>
                <Flex width="100%" justifyContent="space-between" mt="10px">
                    <Flex alignItems="center">
                        <Flex width="30px">
                            <RunningIcon/>
                        </Flex>
                        <CustomText ml="5px">Running hydro</CustomText>
                    </Flex>
                    <CustomText>{runninghydro}</CustomText>
                </Flex>
                <Flex width="100%" justifyContent="space-between" mt="10px">
                    <Flex alignItems="center">
                        <Flex width="30px">
                            <StarIcon/>
                        </Flex>
                        <CustomText ml="5px">Speed</CustomText>
                    </Flex>
                    <CustomText>{speed} km/h</CustomText>
                </Flex>
                <Flex width="100%" justifyContent="space-between" mt="10px">
                    <Flex alignItems="center">
                        <Flex width="30px">
                            <EfficiencyIcon/>
                        </Flex>
                        <CustomText ml="5px">{t("Efficiency")}</CustomText>
                    </Flex>
                    <CustomText>{efficiency}</CustomText>
                </Flex>
                <Flex width="100%" justifyContent="space-between" mt="10px">
                    <Flex alignItems="center">
                        <Flex width="30px">
                            <SturdanceIcon/>
                        </Flex>
                        <CustomText ml="5px">{t("Sturdance")}</CustomText>
                    </Flex>
                    <CustomText>{sturdence}</CustomText>
                </Flex>
                <Flex width="100%" justifyContent="space-between" mt="10px">
                    <Flex alignItems="center">
                        <Flex width="30px">
                            <LuckIcon/>
                        </Flex>
                        <CustomText ml="5px">{t("Luck")}</CustomText>
                    </Flex>
                    <CustomText>{luck}</CustomText>
                </Flex>
                <ContainerRow>
                   <Flex alignItems="center">
                        <Flex width="30px">
                            <DurabilityIcon/>
                        </Flex>
                        <CustomText ml="5px">{t("Durability")}</CustomText>
                    </Flex>
                    <ContainerProgress>
                        <Progress variant="round" primaryStep={Number(durability)} scale="sm"/>
                    </ContainerProgress>
                </ContainerRow>
                <Flex width="100%" justifyContent="space-between" mt="10px">
                    <Flex alignItems="center">
                        <Flex width="30px">
                            <CupIcon/>
                        </Flex>
                        <CustomText ml="5px">{t("Expired date")}</CustomText>
                    </Flex>
                    <CustomText>{expiration} {t("days")}</CustomText>
                </Flex>
                {/* <Flex width="100%" justifyContent="space-between" mt="10px">  
                    <Flex alignItems="center"> 
                        <DurabilityIcon/>
                        <Text ml="5px">Durability</Text>
                    </Flex>
                    <Text>9</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" mt="10px">
                    <Text bold>{t("Countdown")}</Text>
                    <Countdown zeroPadTime={2} date={1661496419000}  renderer={renderCountdown}/>
                </Flex> */}
            </Flex>
        </Container>
    );
};

export default CardShoes;

const Container = styled.div<{isHaving?:boolean, background?:string}>`
    width: 368px;
    height: auto;
    padding: 15px 10px 15px 10px;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        padding: 15px 0px 15px 0px;
    }

`
const CustomCard = styled.div<{background?:string}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 280px;
    background:${({ background }) => background};
    border-radius: 8px;
    position: relative;
    justify-content: center;
    align-items: center;
`
const ImgShoes = styled.img`
    width: auto;
    height:250px;
`
const CustomText = styled(Text)`
    color:#000000;
`
const ContainerRow = styled.div`
    align-items: center;
    width: 100%;
    margin-top:10px;
    margin-bottom:10px;
    display: flex;
    flex-direction:row;
    gap:15px;
`
const ContainerProgress = styled.div`
    width:100%;
`
const ContainerTags = styled(Flex)<{background?:string}>`
    background: ${({ background }) => background};
    border-radius: 6px;
    width: 100%;
    height: auto;
    justify-content: start;
    padding:6px 0px 6px 10px;
    align-items: center;
    margin-bottom:10px;
    ${Text}{
        font-size:16px;
        font-weight:bold;
    }
`