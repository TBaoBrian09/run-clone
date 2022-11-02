import React, { useState, CSSProperties } from 'react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { Text, Flex, useModal, Modal } from '@phamphu19498/runtogether-uikit'
import { register, sendmail } from 'state/auth.createslice'
import OtpTimer from 'otp-timer'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { Barcode, EyeCloseIcon } from 'components/Pancake-uikit'
import CryptoJS from "crypto-js";
// eslint-disable-next-line import/no-unresolved
import { useDispatch } from 'react-redux'
import useToast from 'hooks/useToast'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage'
// eslint-disable-next-line import/no-unresolved
import { unwrapResult } from '@reduxjs/toolkit'
import { AppDispatch } from 'state'
import { rules } from 'config/constants/auth/rules'
import useTheme from 'hooks/useTheme'
import RingLoader from "react-spinners/RingLoader";

// eslint-disable-next-line import/no-cycle
import LoginModal from './LoginModal'
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
} from './styles'



interface RouteParams {
  onDismiss?: () => void
}

const queryParams = new URLSearchParams(window.location.search);
const dataReferralCode = queryParams.get("referral_code")

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface RegisterProp {
  email: string
  password: string
  confirmpassword: string
  // eslint-disable-next-line camelcase
  referral_code?: string
  codeotp: string
}
const initValue: RegisterProp = {
  email: '',
  password: '',
  confirmpassword: '', 
  referral_code: '',
  codeotp: '',
}


const RegisterModal: React.FC<RouteParams> = ({ onDismiss }) => {

  const [dataSubmit, setDataSubmit] = useState(initValue)
  const dispatch = useDispatch<AppDispatch>()
  const { toastError, toastSuccess } = useToast()
  const [checkError, SetCheckError] = useState(false)
  const [getMessageError, SetMessageError] = useState('')
  const [ errorSendMail, setErrorSendMail ] = useState("")
  const history = useHistory()

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

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const [changePassword, setChangePassword] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(true)
  const changeIcon = changePassword !== true
  const ConfirmchangeIcon = confirmPassword !== true
  const [openModalLogin] = useModal(<LoginModal />)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [timeto, Settimeto] = useState(0)

  const handleRegister = async (data) => {
    
    setLoading(true)
    const body = {
      email: data.email,
      password: data.password,
      referral_code: dataReferralCode || data.referral_code,
      code: data.codeotp,
    }
    try {
      const responses: any = await dispatch(register(body))
      unwrapResult(responses)
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
        return;
      }
      toastSuccess(t('Register Success'), t(''))

      if(dataReferralCode) {
        setTimeout(() => {
          setLoading(false)
          history.push("/")
          openModalLogin()
        }, 500)
      } else {
        setTimeout(() => {
          setLoading(false)
          openModalLogin()
        }, 500)
      }
    
     
    } catch (error) {
      console.log('error', error)
      // eslint-disable-next-line camelcase
      let { error_code }: any = error
      SetCheckError(true)
      // eslint-disable-next-line camelcase
      if (error_code === 'USER_NOT_FOUND') {
        // eslint-disable-next-line camelcase
        error_code = 'User is not found'
      }
      // eslint-disable-next-line camelcase
      if (error_code === 'PASSWORD_IS_INVALID') {
        // eslint-disable-next-line camelcase
        error_code = 'Password is invalid'
      }
       // eslint-disable-next-line camelcase
      if (error_code === 'OTP_INVALID_OR_EXPIRED') {
        // eslint-disable-next-line camelcase
        error_code = 'Otp is invalid'
      }
      SetMessageError(error_code)
      setLoading(false)
    }
  }
  const handleSendCode = async () => {
    const body = {
      email: getValues('email') || '',
    }
    // if (getValues('email') && getValues('email')!==""){
    try {
      // openModalVerify()
      const responses: any = await dispatch(sendmail(body))
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
        return;
      }
      if (responses.payload.status === 200) {
        Settimeto(1)
        toastSuccess(t('Please check your email'), t(''));
        setErrorSendMail("")
      } else {
        // toastError(t('You have left the email blank or the email already exists'), t(''))
        setErrorSendMail("You have left the email blank or the email already exists")
      }

      unwrapResult(responses)
    } catch (error) {
      Settimeto(0)
      console.log('loi', error)
      // eslint-disable-next-line camelcase
      const { error_code }: any = error
      // eslint-disable-next-line camelcase
      const { error_msg }: any = error
      // eslint-disable-next-line camelcase
      if (error && error_code) {
        // eslint-disable-next-line camelcase
        SetMessageError(error_code)
      }
      // eslint-disable-next-line camelcase
      if (error && error_msg) {
        // eslint-disable-next-line camelcase
        SetMessageError(error_msg)
      }
    }
  }


  return (
     <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
      <Flex flexDirection="column">
        <Flex pt="5px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text bold fontSize="24px">
              Register
            </Text>
          </CsFlex>

          { !dataReferralCode ? 
             <CsFlex width="100%" justifyContent="center" alignItems="center">
               <Text color="#B5B5BE">Have an account?</Text> 
               <TransferModal onClick={openModalLogin}>Log in now</TransferModal>
             </CsFlex>
             : 
             ""
          }
          <FormSubmit onSubmit={handleSubmit(handleRegister)}>
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
                      <CsInput
                        name="email"
                        value={getValues('email')}
                        type="email"
                        placeholder="Your email address"
                        onChange={field.onChange}
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
                    render={({ field }) => (
                      <CsInput
                        type={changePassword ? 'password' : 'text'}
                        name="password"
                        value={getValues('password')}
                        placeholder="Your password"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <WrapIcon
                    className="icon"
                    onClick={() => {
                      setChangePassword(changeIcon)
                    }}
                  >
                    {changeIcon ? <EyeOpenIcon /> : <EyeCloseIcon />}
                  </WrapIcon>
                </WrapInput>
                <ErrorMessages errors={errors} name="password" />

                <WrapInput>
                  <ContainerIcon>
                    <LockIcon />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    name="confirmpassword"
                    rules={{
                      ...rules.confirmpassword,
                      validate: {
                        samepassword: (v) => v === getValues('password') || 'Password is not match',
                      },
                    }}
                    render={({ field }) => (
                      <CsInput
                        type={confirmPassword ? 'password' : 'text'}
                        name="confirmpassword"
                        value={getValues('confirmpassword')}
                        placeholder="Confirm password"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <WrapIcon
                    className="icon"
                    onClick={() => {
                      setConfirmPassword(ConfirmchangeIcon)
                    }}
                  >
                    {ConfirmchangeIcon ? <EyeOpenIcon /> : <EyeCloseIcon />}
                  </WrapIcon>
                </WrapInput>
                <ErrorMessages errors={errors} name="confirmpassword" />

                <WrapInput>
                  <ContainerIcon>
                    <Barcode />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    name="referral_code"
                    render={({ field }) => (
                      dataReferralCode ?
                          <CsInput
                          disabled
                          type="text"
                          name="referral_code"
                          value={dataReferralCode || getValues('referral_code')}
                          placeholder="Referral code"
                          onChange={field.onChange}
                          />
                      :
                        <CsInput
                          type="text"
                          name="referral_code"
                          value={dataReferralCode || getValues('referral_code')}
                          placeholder="Referral code"
                          onChange={field.onChange}
                        />
                    )}
                  />
                </WrapInput>
                <ErrorMessages errors={errors} name="referral_code" />

                <WrapInput>
                  <ContainerIcon>
                    {/* <Barcode /> */}
                    <img src="/images/KeyIcon.svg" alt="" />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    rules={rules.codeotp}
                    name="codeotp"
                    render={({ field }) => (
                      <CsInput
                        type="text"
                        name="codeotp"
                        value={getValues('codeotp')}
                        placeholder="Registration code"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <WrapTextVerify>
                    {timeto === 0 ? (
                      <TextVerify onClick={() => handleSendCode()}>Get Verify Code</TextVerify>
                    ) : (
                      <CustomOtpTimer
                        minutes={0}
                        seconds={60}
                        text="Resend after "
                        ButtonText="Get Verify Code"
                        resend={handleSendCode}
                        textColor="#FF592C"
                        buttonColor="#FF592C"
                        background="transparent"
                      />
                    )}
                  </WrapTextVerify>
                  {checkError === true && <CustomMessageError>{getMessageError}</CustomMessageError>}
                </WrapInput>

                <WrapVerifyMobile>
                  <WrapTextVerifyMobile>
                    {timeto === 0 ? (
                      <TextVerify onClick={() => handleSendCode()}>Get Verify Code</TextVerify>
                    ) : (
                      <CustomOtpTimer
                        minutes={0} 
                        seconds={60}
                        text="Code resend is "
                        ButtonText="Get Verify Code"
                        resend={handleSendCode}
                        textColor="#FF592C"
                        buttonColor="#FF592C"
                        background="transparent"
                      />
                    )}
                  </WrapTextVerifyMobile>
                </WrapVerifyMobile>
                <ErrorMessages errors={errors} name="codeotp" />
              </ContainerInput>
              { errorSendMail &&
                <Text color="#FF592C">{errorSendMail}</Text>
              }
               <Flex width="100%" mt="1rem">
                  <ButtonSubmit
                    width="100%"
                    type="submit"
                    value="Submit"
                    disabled={loading}
                  >
                    {!loading ? 
                      " Register"
                    :
                      <RingLoader color={color} loading={loading} cssOverride={override} size={30} />
                    }
                  </ButtonSubmit>
                </Flex>
            </Flex>
          </FormSubmit>
        </Flex>
      </Flex>
    </CustomModal>
  )
}

export default RegisterModal;

const CustomOtpTimer = styled(OtpTimer)`
  font-weight: 900 !important;
`

const CustomModal = styled(Modal)`
  padding: 20px 0px !important;
  width: 475px;
  min-width: 350px;
  @media only screen and (max-width: 768px) {
    width: 400px;
    height: auto;
    padding: 10px 0px;
  }
  @media only screen and (max-width: 320px) {
    min-width: 320px;
    width: 320px;
  }
  & > div {
    overflow-y: auto;
    padding: 0px 24px;
    max-height: 100%;

    &:first-child {
      display: ${dataReferralCode ? 'none': 'block'};
    }

  }
`
const WrapTextVerify = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 0px;
  font-weight: 900 !important;
  cursor: pointer;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  align-items: center;
  @media (max-width: 600px) {
    right: 5px;
  }
  > div > button {
    font-weight: 600;
  }
  @media screen and (max-width: 320px) {
    display: none;
  }
`
const TextVerify = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: right;
  color: #ff592c;
  cursor: pointer;
`
const CustomMessageError = styled.div`
  color: #ff592c;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  margin-top: 5px;
  margin-left: 35px;
`
const WrapVerifyMobile = styled.div`
  display: none;

  @media screen and (max-width: 320px) {
    display: block;
    margin: 10px;
  }
`

const WrapTextVerifyMobile = styled.div``
