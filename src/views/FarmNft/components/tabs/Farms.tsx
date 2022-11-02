import React,{ useState, useMemo, useEffect, useRef } from 'react'
import partition from 'lodash/partition'
import { useWeb3React } from '@web3-react/core'
import { usePoolsNft } from 'state/poolsNft/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text } from 'components/Pancake-uikit'
import styled from 'styled-components'
import { PoolNft } from 'state/types'
import Card  from './Card'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools = () => {
	return(
		<Container>
			<Text fontSize="48px" fontWeight="700" lineHeight="50px">Coming Soon</Text>
		</Container>
	)
}

const Container = styled.div`
	background: rgba(255, 255, 255, 0.5);
	border-radius: 10px;
	padding: 40px;
	margin-top: 30px;
	text-align: center;
`

// const Container = styled.div`
// 	margin-top: 40px;
// 	display: grid;
// 	grid-template-columns: 24% 24% 24% 24%;
// 	column-gap: 15px;
// 	row-gap: 15px;
// 	@media screen and (max-width: 991px) {
// 		grid-template-columns: 100%;
// 	}
// `

export default Pools