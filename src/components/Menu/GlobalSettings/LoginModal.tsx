import React, { useState, CSSProperties } from 'react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form';
import { Text, Flex, InjectedModalProps, useModal, Modal } from '@phamphu19498/runtogether-uikit'
import axios from 'axios';
import { Encrypts } from 'config/api/encrypt';
import { useTranslation } from 'contexts/Localization'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'state'
import { EyeCloseIcon } from 'components/Pancake-uikit'
import CryptoJS from "crypto-js";
import { login } from 'state/auth.createslice';
import { rules } from 'config/constants/auth/rules';
import useTheme from 'hooks/useTheme'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage';
import useToast from 'hooks/useToast'
import { GetUser } from 'state/account'
import { fetchUserInfo } from 'state/account/actions';
import { fetchUser } from 'state/account/fetchData';
import { useWeb3React } from '@web3-react/core';
import RingLoader from "react-spinners/RingLoader";
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
import RegisterModal from './RegisterModal'
// eslint-disable-next-line import/no-cycle
import ForgotModal from './ForgotPasswordModal';
import Mail from '../../Pancake-uikit/components/Svg/Icons/Mail'
import LockIcon from '../../Pancake-uikit/components/Svg/Icons/LockIcon'
import EyeOpenIcon from '../../Pancake-uikit/components/Svg/Icons/EyeOpenIcon'

import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput,
  CsFlex,
  CsInput,
  FormSubmit,
  TransferModal,
  WrapIcon,
  WrapInput,
  WrapLink,
} from './styles'

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface RegisterProp {
  email: string,
  password: string,  
}
const initValue:RegisterProp = {
  email: '',
  password: '',  
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const LoginModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [changePassword, setChangePassword] = useState(true)
  const changeIcon = changePassword !== true
  const [loading, setLoading] = useState(false);
  const { toastSuccess,toastError } = useToast()
  const [color, setColor] = useState("#FFFFFF");
  const [openModalRegister] = useModal(<RegisterModal />)
  const [openModalForgot] = useModal(<ForgotModal />)
  const { account } = useWeb3React()
  const [ user ] = GetUser(true)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory();
  const [checkError,SetCheckError] = useState(false);
  const [getMessageError,SetMessageError] = useState('');
  const {
    handleSubmit,
    control,
    getValues,              
    formState:{ errors },
    setError,
    watch
} = useForm({
        defaultValues:initValue        
    });
  const handleLogin = async (data) => {   
    setLoading(true) 
    SetCheckError(false);
 
    const body = {
        email:data.email,
        password: data.password,       
    }   
    try{
      const responses:any = await dispatch(login(body))   
      unwrapResult(responses) ;    
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
      }
      const {token} = responses.payload.data;     
      // eslint-disable-next-line camelcase
      const {user_info} = responses.payload.data;
      const encrypt = Encrypts(token);
      const encryptUserInfo = Encrypts(user_info);
      if (token) {
        localStorage.setItem('serviceToken', encrypt);
        localStorage.setItem('user_info', encryptUserInfo);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        if ( account && user_info?.address ){
          if (account.toLocaleUpperCase() !== user_info?.address.toLocaleUpperCase()){
            sessionStorage.setItem('isDifferent', "true");
          }
        }
        onDismiss()
      } else {
            localStorage.removeItem('serviceToken');
            localStorage.removeItem('user_info');
            delete axios.defaults.headers.common.Authorization;
            setLoading(false)
      }
    }

    catch(error){  
      console.log('error',error);  
       // eslint-disable-next-line camelcase
      let {error_code}:any = error;   
      SetCheckError(true);
      // eslint-disable-next-line camelcase
      if (error_code === "USER_NOT_FOUND") {
        // eslint-disable-next-line camelcase
        error_code = "User is not found"
      }
      // eslint-disable-next-line camelcase
      if (error_code === "PASSWORD_IS_INVALID") {
        // eslint-disable-next-line camelcase
        error_code = "Email or password is invalid"
      }
      SetMessageError(error_code);       
      setLoading(false)                  
    }
}
  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex paddingTop="0px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">   
          <Text bold fontSize="24px">{t('Login')}</Text>
          </CsFlex>  
          <CsFlex width="100%" justifyContent="center" alignItems="center">           
            <Text color="#B5B5BE">New user?</Text>
            <TransferModal onClick={openModalRegister}>Register now</TransferModal>
          </CsFlex>
          <FormSubmit onSubmit={handleSubmit(handleLogin)}>
            <Flex flexDirection="column">
              <ContainerInput>
                <WrapInput>
                  <ContainerIcon>
                    <Mail />
                  </ContainerIcon>
                  <Controller
                      control={control}
                      name="email"
                      rules={rules.email}                                
                      render={({ field }) => (
                          <CsInput name="email" value={getValues('email')}
                              type="email" placeholder="Your email address" onChange={field.onChange}
                      />
                      )}
                    /> 
                </WrapInput>
                <ErrorMessages errors={errors} name="email" />                 
                <WrapInput>
                  <ContainerIcon>
                    <LockIcon />
                  </ContainerIcon>

                  <Controller 
                   control={control} 
                   name="password" 
                   rules={rules.password}
                   render={({ field }) => 
                   (<CsInput
                    type={changePassword ? 'password' : 'text'}
                     name="password" 
                     value={getValues('password')} 
                     placeholder="Password" onChange={field.onChange} />)}/>  
                                                                   
                  <WrapIcon
                    className="icon"
                    onClick={() => {
                      setChangePassword(changeIcon)
                    }}
                  >
                    {changeIcon ? <EyeOpenIcon /> : <EyeCloseIcon />}
                  </WrapIcon>
                </WrapInput>
                <ErrorMessages errors={errors} name="password"/>  
               { checkError === true && <CustomMessageError>{getMessageError}</CustomMessageError> }
              </ContainerInput>
              <Flex width="100%" mt="1rem">
                  <ButtonSubmit 
                    width="100%"
                    type="submit"
                    value="Submit"
                    disabled={loading}
                  >
                    {!loading ? 
                        "Login"
                        :
                      <RingLoader color={color} loading={loading} cssOverride={override} size={30} />
                    }
                  </ButtonSubmit>
              </Flex>
              <Flex 
                  justifyContent="center"
                  onClick={openModalForgot}
              >
              <TransferModal>Forgot password?</TransferModal>
              </Flex>
            </Flex>
          </FormSubmit>
        </Flex>
      </Flex>
    </CustomModal>
  )
}
export default LoginModal

const CustomModal = styled(Modal)`
  padding: 0px !important;
  width: 475px;
  min-width: 350px;
  @media only screen and (max-width: 600px) {
    width: 360px;
  }
  @media only screen and (max-width: 320px) {
    min-width: 320px;
    width: 320px;
  }
`
const CustomMessageError = styled.div`
color: #FF592C;
font-size:12px;
font-weight:400;
letter-spacing: 0.1;
`

