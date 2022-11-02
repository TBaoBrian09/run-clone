import React,{ useEffect, useState, useCallback } from 'react'
import { useFetchPublicPoolsNftData} from 'state/poolsNft/hooks'
import { Hero } from "components/KShark";
import Page from "components/Layout/Page";
import { Text, Heading } from 'components/Pancake-uikit'
import TotalMining from './components/TotalMining'
import GroupMenu from './components/GroupMenu'

const PoolNft = () => {
  useFetchPublicPoolsNftData()
  return(
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          Mining Pool
        </Heading>
        <Text color="#ffffff">Stake Baby Kshark to earn new token. You can unstake at any time.</Text>
        {/* <TotalMining/> */}
      </Hero>
      <GroupMenu/>
    </Page>
  )
}

export default PoolNft