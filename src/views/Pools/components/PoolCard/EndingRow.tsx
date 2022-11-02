import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import {
  Flex,
  Text,
  TimerIcon,
  Skeleton,
  useTooltip,
  Link,
  HelpIcon,
} from '@phamphu19498/runtogether-uikit'
import { useBlock } from 'state/block/hooks'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import { getBscScanLink } from 'utils'
import Balance from 'components/Balance'
import { getPoolBlockInfo } from 'views/Pools/helpers'



interface ExpandedFooterProps {
  pool: Pool
  account: string
}


const StyledLink=styled(Link)`
color:#fff !important;
> svg {
  fill: #fff !important;
}
&:hover{
  text-decoration: none;
}
`
const Ending: React.FC<ExpandedFooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const { currentBlock } = useBlock()

  const {
    startBlock,
    endBlock,
  } = pool

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  return (
    <>
      {shouldShowBlockCountdown && (
        <Flex justifyContent="space-between" alignItems="center" style={{padding:"5px 24px"}}>
          <Text fontSize='16px' color="textSecondary">{hasPoolStarted ? t('Ends in') : t('Starts in')}:</Text>
          {blocksRemaining || blocksUntilStart ? (
            <Flex alignItems="center">
              <StyledLink external href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')}>
                <Balance small value={blocksToDisplay} decimals={0} />
                {/* <Text small ml="4px" textTransform="lowercase">
                  {t('Blocks')}
                </Text>
                <TimerIcon width="20px" mr="6px" ml="6px" mt="1px" /> */}
              </StyledLink>
            </Flex>
          ) : (
            <Skeleton width="54px" height="21px" />
          )}
        </Flex>
      )}
    </>
  )
}

export default React.memo(Ending)