import React from 'react'
import styled from 'styled-components'
import {Flex, Link, Skeleton, Text, TimerIcon} from '@phamphu19498/runtogether-uikit'
import {getBscScanLink} from 'utils'
import {Pool} from 'state/types'
import {useBlock} from 'state/block/hooks'
import Balance from 'components/Balance'
import {useTranslation} from 'contexts/Localization'
import {getPoolBlockInfo} from 'views/Pools/helpers'
import {BSC_BLOCK_TIME} from "config";
import BaseCell, {CellContent} from './BaseCell'




interface FinishCellProps {
    pool: Pool
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 120px;
`

const EndsInCell: React.FC<FinishCellProps> = ({pool}) => {
    const {sousId, totalStaked, startBlock, endBlock, isFinished} = pool
    const {currentBlock} = useBlock()
    const {t} = useTranslation()

    const {shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay} =
        getPoolBlockInfo(pool, currentBlock)
    const seconds = blocksToDisplay * BSC_BLOCK_TIME
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d === 1 ? "d " : "d ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? "h " : "h ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? "m " : "m ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? "s" : "s") : "";
    const timeToDisplay = dDisplay + hDisplay + mDisplay + sDisplay
    const isCakePool = sousId === 0

    const renderBlocks = shouldShowBlockCountdown ? (
        <Flex alignItems="center">
            <Flex>
                {/* <Balance fontSize="16px" value={blocksToDisplay} decimals={0} color="primary" />
                <Text ml="4px" color="primary" textTransform="lowercase">
                    {t('Blocks')}
                </Text> */}
                <Text ml="4px" textTransform="lowercase">
                    {timeToDisplay}
                </Text>
            </Flex>
            <Flex flex="1">
                <Link
                    external
                    href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')}
                    onClick={(e) => e.stopPropagation()}
                >
                    <TimerIcon ml="4px"/>
                </Link>
            </Flex>
        </Flex>
    ) : (
        <Text>-</Text>
    )

    // A bit hacky way to determine if public data is loading relying on totalStaked
    // Opted to go for this since we don't really need a separate publicDataLoaded flag
    // anywhere else
    const isLoadingPublicData = !totalStaked.gt(0) || !currentBlock || (!blocksRemaining && !blocksUntilStart)
    const showLoading = isLoadingPublicData && !isCakePool && !isFinished
    return (
        <StyledCell role="cell">
            <CellContent>
                <Text fontSize="16px" color="text" textAlign="left">
                    {hasPoolStarted || !shouldShowBlockCountdown ? t('Ends in') : t('Starts in')}
                </Text>
                {showLoading ? <Skeleton width="80px" height="16px"/> : renderBlocks}
            </CellContent>
        </StyledCell>
    )
}

export default EndsInCell
