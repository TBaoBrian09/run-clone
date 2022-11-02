import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import Page from 'components/Layout/Page'
import { Image, Heading, RowType, Toggle, Text, Button, ArrowForwardIcon, Flex } from 'components/Pancake-uikit'
import { Hero, ControlContainer, ToggleWrapper, LabelWrapper, FilterContainer, ViewControls, SortText  } from 'components/KShark'
import { useTranslation } from 'contexts/Localization'

const MiniFarms = () => {
	const { t } = useTranslation()
	return(
		<Page>
			<Hero>
				<Heading as="h1" size="xl" color="#ffffff">
				{t('Farms on Mini Farm')}
				</Heading>
				<Text color="#ffffff">{t('Stake LP tokens to earn.')}</Text>
			</Hero>
		</Page>
	)
}

export default MiniFarms