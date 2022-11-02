import React, { useState } from 'react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form';
import { Text, Flex, InjectedModalProps, useModal, Modal } from '@phamphu19498/runtogether-uikit'
import axios from 'axios';
import { Encrypts } from 'config/api/encrypt';
// import {  } from 'components/Pancake-uikit'
import { useAudioModeManager, useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'state'
import usePersistState from 'hooks/usePersistState'
import { EyeCloseIcon } from 'components/Pancake-uikit'
import { login } from 'state/auth.createslice';
import { rules } from 'config/constants/auth/rules';
import useTheme from 'hooks/useTheme'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage';
import useToast from 'hooks/useToast'
import ExpertModal from './ExpertModal'
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
import RegisterModal from './RegisterModal'
// eslint-disable-next-line import/no-cycle
import Mail from '../../Pancake-uikit/components/Svg/Icons/Mail'
import LockIcon from '../../Pancake-uikit/components/Svg/Icons/LockIcon'
import EyeOpenIcon from '../../Pancake-uikit/components/Svg/Icons/EyeOpenIcon'

import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput,
  ContainerVerify,
  CsFlex,
  CsInput,
  CsInputVerify,
  FormSubmit,
  TransferModal,
  WrapIcon,
  WrapInput,
  WrapLink,
} from './styles'


// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface RegisterProp {
   number1: string,
}
const initValue:RegisterProp = {
   number1: '',
}
const VerifyModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [changePassword, setChangePassword] = useState(true)
  const changeIcon = changePassword !== true
  const [openModalRegister] = useModal(<RegisterModal />)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory();
  const { toastError } = useToast()
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
    SetCheckError(false);
    const body = {
        number1:data.number1,
    }   
   
    try{
    const responses:any = await dispatch(login(body))   
    unwrapResult(responses) ;    
    const {token} = responses.payload.data;     
    // eslint-disable-next-line camelcase
    const {user_info} = responses.payload.data;   
    const encrypt = Encrypts(token)  
    const encryptUserInfo = Encrypts(user_info);
    if (token) {
      localStorage.setItem('serviceToken', encrypt);
      localStorage.setItem('user_info', encryptUserInfo);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      window.location.reload();  
    } else {
          localStorage.removeItem('serviceToken');
          localStorage.removeItem('user_info');
          delete axios.defaults.headers.common.Authorization;
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
        error_code = "Password is invalid"
      }
      SetMessageError(error_code);                         
    }
}
  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex paddingTop="0px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">   
          <Text bold fontSize="24px">{t('Verify code')}</Text>
          </CsFlex>  
          <CsFlex width="100%" justifyContent="center" alignItems="center" mb='10px'>           
            <Text color="#B5B5BE">Enter the code we’ve sent by text to your email</Text>
          </CsFlex>
          <FormSubmit onSubmit={handleSubmit(handleLogin)}>
            <Flex flexDirection="column">
              <ContainerInput>
                <WrapInput>
                  {/* <ContainerIcon>
                    
                    <Mail />
                  </ContainerIcon> */}
                  {/* <Controller
                                control={control}
                                name="number1"
                                rules={rules.email}                                
                                render={({ field }) => (
                                   <ContainerVerify>
                                       <CsInputVerify name="number1" value={getValues('number1')}
                                        type="text" placeholder="" onChange={field.onChange}
                                       />
                                   
                                   </ContainerVerify>
                                )}
                     />  */}
                </WrapInput>
                <ErrorMessages errors={errors} name="email" />                 
              
               { checkError === true && <CustomMessageError>{getMessageError}</CustomMessageError> }
              </ContainerInput>
              <Flex justifyContent="center">
                <TransferModal>Forgot password?</TransferModal>
              </Flex>
              <Flex width="100%" mt="1rem">
                <ButtonSubmit width="100%" type="submit" value="Submit">
                  Send
                </ButtonSubmit>
              </Flex>
             
            </Flex>
          </FormSubmit>
        </Flex>
      </Flex>
    </CustomModal>
  )
}
export default VerifyModal

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

