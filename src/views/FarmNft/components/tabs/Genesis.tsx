import React,{ useState } from 'react'
import { Text, Heading } from 'components/Pancake-uikit'
import styled from 'styled-components'

const Genesis = () => {
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

export default Genesis