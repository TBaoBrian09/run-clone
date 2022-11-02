import React from 'react'
import { Text } from 'components/Pancake-uikit'
import styled from 'styled-components'

const TotalMining = () => {
	return(
		<Container>
			<TextTotal>
				<Text fontSize="30px">Pool NFT</Text>
				{/* <Text fontSize="54px" className="total" color="#4880FF">17,791,636,927</Text>
				<Text fontSize="30px">≈ $1,487,573</Text> */}
			</TextTotal>
		</Container>
	)
}

const Container = styled.div`
	height: 268px;
	margin-top: 22px;
	margin-bottom: 32px;
	background-image: url(./images/bg-pool-nft.png);
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: center;
	border-radius: 14px;
	background-color: #fff;
	display: flex;
	@media screen and (max-width: 991px) {
		background-image: none;
	}
`

const TextTotal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	font-size: 20px;
	padding-left: 35px;
	width: 100%;
	> div {
		line-height: 30px;
		word-break: break-word;
	}

	> .total {
		font-size: 40px;
	}
`

export default TotalMining