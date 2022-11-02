import React from 'react'
import { useTranslation } from 'contexts/Localization'
import {
  Flex,
  Text,
  HelpIcon,
} from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'

const CustomText = styled(Text)`
  font-size: 16px;
`

const DepositFeeRow: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex alignItems="center" justifyContent="space-between" style={{padding:"5px 24px"}}>
      <CustomText color='textSecondary'>{t('Deposit Fee')}:</CustomText>
      <Flex alignItems="flex-start">
        <CustomText>N/A</CustomText>
        {/* <span>
          <HelpIcon color="textSubtle" width="20px" mr="6px" ml="6px" mt="1px" />
        </span> */}
      </Flex>
    </Flex>
  )
}

export default React.memo(DepositFeeRow)