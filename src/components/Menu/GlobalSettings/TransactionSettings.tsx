import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Button } from '@phamphu19498/runtogether-uikit'
// import { Button } from 'components/Pancake-uikit'
import Input from 'components/Pancake-uikit/components/Input/Input'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import QuestionHelper from '../../QuestionHelper'
import { CsBox } from './styles'


const CustomButton = styled(Button)`
  height:35px;
  border-radius:10px;
  margin-right:5px;
  padding:0px 24px;
  box-shadow:none;
  @media screen and (max-width: 600px) {
   margin-bottom:10px;
   margin-right:10px;
  }
`
const CustomInput = styled(Input)`
  width: 100%;
  padding:8px 12px 8px 12px;
  color:${({ theme }) => theme.colors.text};
  background:${({ theme }) => theme.colors.input};
  border-radius:10px;
  border:none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`
const CustomFlex = styled(Flex)`
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`
const CustomSetting = styled(Flex)`
  @media (max-width:600px){
     margin-right:10px;
  }
`
enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const SlippageTabs = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    setSlippageInput(value)

    try {
      const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
      if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
        setUserSlippageTolerance(valueAsIntFromRoundedFloat)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="24px">
        <Flex mb="12px">
          <Text>{t('Slippage Tolerance')}</Text>
          <QuestionHelper
            text={t(
              'A high slippage tolerance can increase the chance of successful transactions but may also result in unfavorable prices.',
            )}
            placement="top-start"
            ml="4px"
          />
        </Flex>
        <CustomFlex justifyContent="space-between" width="100%">
          <CustomSetting justifyContent="space-between">
          <CustomButton
            mt="4px"
            mr="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(10)
            }}
            // variant={userSlippageTolerance === 10 ? 'primary' : 'disable'}
            style={{backgroundColor: userSlippageTolerance === 10  ? "#FF592C": "#F5F5F5",color: userSlippageTolerance === 10 ? "white" : "black"}}
          >
            0.1%
          </CustomButton>
          <CustomButton
            mt="4px"
            mr="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(50)
            }}
            style={{backgroundColor: userSlippageTolerance === 50  ? "#FF592C": "#F5F5F5",color: userSlippageTolerance === 50 ? "white" : "black"}}
          >
            0.5%
          </CustomButton>
          <CustomButton
            mr="4px"
            mt="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(100)
            }}
            style={{backgroundColor: userSlippageTolerance === 100  ? "#FF592C": "#F5F5F5",color: userSlippageTolerance === 100 ? "white" : "black"}}
          >
            1.0%
          </CustomButton>
          </CustomSetting>
          <Flex alignItems="center" width="100%">
            <CsBox mt="4px">
              <CustomInput
                scale="sm"
                placeholder={(userSlippageTolerance / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage((userSlippageTolerance / 100).toFixed(2))
                }}
                onChange={(e) => parseCustomSlippage(e.target.value)}
                isWarning={!slippageInputIsValid}
                isSuccess={![10, 50, 100].includes(userSlippageTolerance)}
              />
            </CsBox>
            <Text color="#FF592C" bold ml="5px">
                %
            </Text>
          </Flex>
        </CustomFlex>
        {!!slippageError && (
          <Text fontSize="14px" color={slippageError === SlippageError.InvalidInput ? 'red' : '#FF592C'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="24px" width="100%">
        <Flex alignItems="center">
          <Text>{t('Transaction deadline (mins)')}</Text>
          <QuestionHelper
            text={t('Your transaction will revert if it is pending for longer than this deadline.')}
            placement="top-start"
            ml="4px"
            mr="5px"
          />
        </Flex>
        <Flex width="30%" style={{marginRight:'15px'}}> 
          <Box width="100%" mt="4px">
            <CustomInput
              scale="sm"
              color={deadlineError ? 'red' : undefined}
              onBlur={() => {
                parseCustomDeadline((ttl / 60).toString())
              }}
              placeholder={(ttl / 60).toString()}
              value={deadlineInput}
              onChange={(e) => parseCustomDeadline(e.target.value)}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SlippageTabs
