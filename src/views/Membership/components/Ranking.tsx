import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text, Flex, useMatchBreakpoints } from 'components/Pancake-uikit'

interface RankingProps {
  image: string
  name: string
  transaction: string
  totalAssets: string
  upgradable?: boolean
}

const RankingWrapper = styled.div`
  width: 100%;
  min-height: 360px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gradients.backgroundContainer};
  border: 1px solid ${({ theme }) => theme.colors.borderLine};
  box-sizing: border-box;
  border-radius: 20px;

  .title-wrapper,
  .content-wrapper {
    margin-top: 24px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .line-split {
      margin: 16px 0;
      width: 80%;
      height: 1px;
      border-top: 1px solid #fdb533;
    }
  }
`

const Ranking: React.FC<RankingProps> = ({ image, name, transaction, totalAssets, upgradable }) => {
  const { t } = useTranslation()

  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  return (
    <RankingWrapper>
      <div className="title-wrapper">
        <img src={image} alt="LiveTrade" width="84px" />
        <Text color="warning" textTransform="uppercase" >{t(name)}</Text>
      </div>

      <div className="content-wrapper">
        <Text>{t('Giao dịch')}</Text>
        <Flex>
          <Text fontWeight="bold">{t(transaction)}</Text>
          <Text>{t('/tháng')}</Text>
        </Flex>

        <div className="line-split" />

        <Text>{t('Tổng tài sản')}</Text>
        <Text fontWeight="bold">{t(totalAssets)}</Text>
      </div>
    </RankingWrapper>
  )
}

export default Ranking
