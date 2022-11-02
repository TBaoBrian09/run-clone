import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { GetLevelVip, GetNonceCode, GetUser } from 'state/account'
import { useTranslation } from 'contexts/Localization'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage'
import { useWeb3React } from '@web3-react/core'
import PageFullWidth from 'components/Layout/PageFullWidth'
import { AutoRenewIcon, Button, useModal } from '@phamphu19498/runtogether-uikit'
import { Controller, useForm } from 'react-hook-form'
import { rules } from 'config/constants/auth/rules'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { Decrypts, DecryptsUserInfo } from 'config/api/decrypts'
import Header from 'components/HeaderGlobal/Header'
import { useUpdateAddress } from './hook/useUpdateAddress'
// import Header from './components/Header'

import {
  Col,
  ContainerIcon,
  CustomButtonUpdate,
  CustomCol2,
  CustomColBorder,
  CustomContainer,
  CustomContainer1,
  CustomContainer3,
  CustomFlexText,
  CustomIconCopy,
  CustomInput,
  CustomLabel,
  Divider,
  FormSubmit,
  ImgLogo,
  Relative,
  Row,
  TextLevel,
  TextYou,
  Tooltip,
  WrapInput,
} from './styles'
import { useSign } from "./hook/useSign"


interface Props {
  name?: any
  address?: any
  email?: any
  username?: any
  mobile?: any
  id?: any
}

const initValue: Props = {
  username: '',
  address: '',
  mobile: '',
}

const Account = () => {
  const { t } = useTranslation()
  
  const [level] = GetLevelVip()
  const { account } = useWeb3React()
  const [ nonceCode ] = GetNonceCode(account)
  const [isOpenTooltip, setOpenTooltip] = useState(false)
  // const userToken = localStorage.getItem('serviceToken');
  const userToken = Decrypts();
  const data: any = DecryptsUserInfo() || ''
  // console.log('data',user);
  let { name, address, email, username, mobile } = data
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    defaultValues: initValue,
  })

  if (!name) {
    name = 'No Data'
  }
  if (!address) {
    address = 'No Data'
  }
  if (!email) {
    email = 'No Data'
  }
  if (!username) {
    username = 'No Data'
  }
  if (!mobile) {
    mobile = 'No Data'
  }
  const [checkError, SetCheckError] = useState(false)
  const handleLogin = async (_data) => {
    SetCheckError(false)
    const body = {
      username: _data.username,
    }
  }
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  useEffect(() => {
      const handleResize = () => {
          setWindowSize(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
  }, [])
  function renderAddress(userAddress){
    if ( userAddress ) {
      if (windowSize>1080){
        return userAddress
      } return `${userAddress.substring(0, 4)}...${userAddress.substring(userAddress.length - 4)}`
    }
    return "No Data"
  }
  // update wallet address
  const { handleSign, signatureKey, pendingSign } = useSign(nonceCode)
  const { handleUpdateAddress, pendingUpdate, requestedUpdate } =useUpdateAddress(account, signatureKey)
  useEffect(() => {
    if ( signatureKey ) {
      handleUpdateAddress()
    }
  }, [signatureKey]) // eslint-disable-line react-hooks/exhaustive-deps
  const [ user ] = GetUser(requestedUpdate)
  const isAddress = user?.address ? !false : false
  const handleCopy = () => {
    navigator.clipboard.writeText(user?.address)
    setOpenTooltip(!false)
    setTimeout(() => {
      setOpenTooltip(false)
    }, 3000)
  }
  return (
    <PageFullWidth>
      <Header namePlace="My account" nameTitle="run together" imgIcon="./images/runMyAccount/imgBanner.png" bgColor='#6C5DD3' />
      <CustomContainer1>
        <Row>
          <CustomCol2>
            <ImgLogo src="./images/account/Logo.png" />
            <CustomFlexText>
              { userToken &&
                  <>
                      <TextYou>You are in</TextYou>
                      <TextLevel>{level}</TextLevel>
                  </>
              }
            </CustomFlexText>
          </CustomCol2>
        </Row>
      </CustomContainer1>
      <CustomContainer>
        <Row>
          <CustomColBorder>
            <Divider />
          </CustomColBorder>
        </Row>
      </CustomContainer>
      <CustomContainer3>
        <FormSubmit onSubmit={handleSubmit(handleLogin)}>
          <Row>
            <Col>
              <WrapInput>
                <CustomLabel>Your Full Name</CustomLabel>
                <CustomInput type="text" value={user?.name ? user?.name : "No Data"} disabled />
              </WrapInput>

              <WrapInput>
                <CustomLabel>Email</CustomLabel>
                <CustomInput type="text" value={user?.email ? user?.email : "No Data"} disabled />
              </WrapInput>
              <WrapInput>
                <CustomLabel>Phone</CustomLabel>
                <CustomInput type="text" value={user?.mobile ? user?.mobile : "No Data"} disabled />
              </WrapInput>              
            </Col>
            <Col>
              <WrapInput>
                <CustomLabel>User Name</CustomLabel>
                <CustomInput type="text" value={user?.username ? user?.username : "No Data"} disabled />
              </WrapInput>

              <WrapInput>
                <CustomLabel>Wallet Address</CustomLabel> 
                <Relative>
                  <ContainerIcon>
                    { user?.address &&
                      <CustomIconCopy onClick={handleCopy} />
                    }
                    <Tooltip isTooltipDisplayed={isOpenTooltip}>Copied</Tooltip>
                  </ContainerIcon>

                  <CustomInput
                    value={renderAddress(user?.address)}
                    readOnly
                  />
                </Relative>
                <ErrorMessages errors={errors} name="address"  />
              </WrapInput>
              <WrapInput>
                { (!isAddress && userToken ) &&
                  <>
                    { account ?
                        <CustomButton
                          mt="23px"
                          width="100%" 
                          bgcolor="#1B1D21" 
                          color="#fff" 
                          onClick={handleSign}
                          endIcon={pendingSign ? <AutoRenewIcon spin color="textSecondary" /> : null}
                          disabled={pendingSign}
                        >
                            Update Wallet Address
                        </CustomButton>
                      :
                        <ConnectWalletButton mt="23px"/>
                    } 
                  </>
                }
              </WrapInput>              
            </Col>
          </Row>
        </FormSubmit>
      </CustomContainer3>
    </PageFullWidth>
  )
}

export default Account

const CustomButton = styled(Button)`
    width:250px;
    background: #FF592C;
    border-radius: 90px;
    box-shadow:none;
    @media screen and (max-width: 600px){
      width: 100%;
    }
`