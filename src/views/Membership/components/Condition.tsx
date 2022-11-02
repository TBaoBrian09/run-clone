
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { useModal, Button } from '@phamphu19498/runtogether-uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { Address } from 'config/constants/types';
import tokens from 'config/constants/tokens';
import { useTranslation } from 'contexts/Localization'
import { Text, HelpIcon, useMatchBreakpoints, Flex, PrivilegesArrow, Box, Skeleton, RedeemBTNIcon } from 'components/Pancake-uikit'
import Upgrade from "./UpgradeLevel"
import ModalYourRight from "./ModalYourRights"
import { fetchUserBalanceNft, fetchUserBalanceLtd } from "../hooks/fetchDataBounty"



interface ConditionProps {
  backgroundurl:string
  title: string
  backgroundReamining:string
  DataRemaining: number
  ConditionImg:string
  ConditionName:string
  LTDRequired:number
  Maximumsupply:number
  contractAddress:Address
  maxNftPerUser:number
}


const CustomBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Condition: React.FC<ConditionProps> = ({ 
  title, 
  backgroundurl, 
  DataRemaining, 
  backgroundReamining, 
  ConditionImg, 
  ConditionName,
  LTDRequired,
  Maximumsupply,
  contractAddress,
  maxNftPerUser,
}) => {
    const { t } = useTranslation()
    const { account } = useActiveWeb3React()
    const [ModalUpgradeLevel] = 
      useModal(
        <Upgrade level={title}/>
    )
    const history = useHistory();
    const MovetoBottom = () => {
      document.getElementById('YourRight').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const [windowSize, setWindowSize] = useState(window.innerWidth)
          useEffect(() => {
              const handleResize = () => {
                  setWindowSize(window.innerWidth)
              }

              window.addEventListener('resize', handleResize)

              return () => window.removeEventListener('resize', handleResize)
          }, [])
    const [ OpenModal ] = useModal(<ModalYourRight level={title} />)     
    const [ balanceOfUser, setBanlance ] = useState(0)
    const [ balance, setBalance ] = useState(0)
    useEffect(() => {
        async function fetchBalance() {
          const result = await fetchUserBalanceNft(account, contractAddress )
          setBanlance(result)
        }
        async function fetchBalanceLtd() {
          const balanceLtd = await fetchUserBalanceLtd(account )
          setBalance(balanceLtd)
        }
        if( account ) {
          fetchBalance()
          fetchBalanceLtd()
        }
    }, [account, contractAddress])
  
  return (
    <CustomBox>
      {/* <ConditionWrapper style={{backgroundImage:`${backgroundurl}`}}>
          <ConditionUpgrade>
            {windowSize>1440 ?  
              <Privileges onClick={MovetoBottom}>
                <CustomButton scale="md" variant="text" style={{color:"primary"}}>
                  {t('Privileges')}
                </CustomButton>
                <PrivilegesArrow color="homePrice"  />
                <Button variant="text" endIcon={<PrivilegesArrow color="secondary" />}>  {t('Privileges')}</Button>
              </Privileges>
            :
              <Privileges onClick={ModalYourRights}>
                <CustomButton scale="md" variant="text" style={{color:"primary"}}>
                  {t('Privileges')}
                </CustomButton>
                <PrivilegesArrow color="homePrice" />
                <Button variant="text" endIcon={<PrivilegesArrow color="secondary" />}>  {t('Privileges')}</Button>
              </Privileges>
              
            }
          </ConditionUpgrade>
      </ConditionWrapper> */}

      <MCard>
            <ContainerImg>
              <Icon onClick={OpenModal}/>
              <Img src={ConditionImg} alt="condition"/>
            </ContainerImg>
            <Flex width="100%" justifyContent="space-between" mt="1.5rem">
              <Text bold color='primaryBright' fontSize='24px'>{ConditionName}</Text>
              <Flex>
                <Text color="textSecondary">{t("Remaining")}</Text>
                <Text bold color='text' ml="3px">{DataRemaining}</Text>
              </Flex>
              
            </Flex>
            <Line/> 
            <Flex width="100%" justifyContent="space-between" alignItems="center" mt="1rem">
              <Text color='textSecondary'>{t("LTD required")}</Text>
              <Flex alignItems="center">
                <img src="/images/LTD_Logo.svg" alt="logo" style={{width:"30px", height:"auto"}}/>
                <Text ml="8px" fontSize='18px' fontWeight="bold" color="text">{LTDRequired.toLocaleString('en', { maximumFractionDigits: 0 })}</Text>
              </Flex>
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" mt="1rem">
              <Text color='textSecondary'>{t("Maximum supply")}</Text>
              <Text ml="8px" fontSize='18px' fontWeight="bold" color="text">{Maximumsupply}</Text>
            </Flex>
            {/* { account ? 
                <> 
                  { LTDRequired < balance ?
                      <Button 
                          width='100%' 
                          mt="1rem"
                          onClick={ModalUpgradeLevel}
                          disabled={balanceOfUser>=maxNftPerUser}
                      >
                        { balanceOfUser>=maxNftPerUser ?
                          t("LIMIT")
                        :
                          t("Upgrade")
                        }
                       
                      </Button>
                  :
                      <Button
                        width='100%' 
                        mt="1rem"
                        disabled
                      >
                        {t("Insufficient %symbol% balance", { symbol:tokens.livetrade.symbol})}
                      </Button>
                  }
                </>
            :
                <ConnectWalletButton width="100%" mt="1rem"/>

            } */}
           
      </MCard>
    </CustomBox>
  )
}

export default Condition

const MCard = styled.div`
  width: 410px;
  height: 585px;
  display: flex;
  flex-direction: column;
  align-items:center;
  padding:18px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.isDark ? theme.colors.backgroundTab : theme.colors.backgroundModal};
  margin-bottom:1rem;
  @media only screen and (max-width: 600px) {
    width: 360px;
    height: 585px;
  }
`
const ContainerImg = styled.div`
  width: 370px;
  height: 334px;
  border-radius:15px;
  display:flex;
  justify-content:center;
  align-items:center;
  background: url(${({ theme }) => theme.isDark ? "/images/membership/mask-condition-dark.jpg" : "/images/membership/mask-condition-light.jpg"}) ;
  @media only screen and (max-width: 600px) {
    width: 320px;
    height: 334px;
  }
  position:relative;
`
const Img = styled.img`
  width: 200px;
  height: 182.88px;
`
const Line = styled.div`
  width:100%;
  margin-top:1rem;
  border-top:1px solid  ${({ theme }) => theme.isDark ? theme.colors.backgroundTab : theme.colors.backgroundModal};
`
const Icon = styled(HelpIcon)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor:pointer;
  fill:#fff;
`