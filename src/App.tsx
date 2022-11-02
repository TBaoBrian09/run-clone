  import React, { lazy, useEffect, useState } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { useSaveReferrer } from 'state/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import useCheckTokenExpired from 'hooks/useCheckTokenExpired'
import Register from 'views/Register'
import ResetCSS from './style/ResetCSS'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import history from './routerHistory'
import Pools from './views/Pools'
import { ModalAlert } from "./views/Account/components/ModalAlert"
import ComingSoon from './views/ComingSoon'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'
import COLLATERALS from './views/COLLATERALS/index'
// import Inventory from './views/Inventory/index'
import Account from './views/Account/index'
import Cart from './views/Cart/index'
import Earn from './views/Earn/index'
import Proposals from './views/Proposals/index'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Farms = lazy(() => import('./views/Farms'))
const MiniFarms = lazy(() => import('./views/MiniFarms'))
const NotFound = lazy(() => import('./views/NotFound'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const UserSell = lazy(() => import('./views/Inventory/components/SellPage'))
const BuyPage = lazy(() => import('./views/COLLATERALS/components/BuyPage'))
const Inventory = lazy(() => import('./views/Inventory/index'))
const ADMINISTRATOR = lazy(() => import('./views/ADMINISTRATOR/index'))
const MyBalance = lazy(() => import('./views/MyBalance/index'))
const MyPartner = lazy(() => import('./views/MyPartner/index'))
const PoolRun = lazy(() => import('./views/PoolRun/index'))
const Swap = lazy(() => import('./views/Swap'))
const AirdropDetails = lazy(() => import('./views/Airdrop/componets/Details/index'))
const Invest = lazy(() => import('./views/Invest'))
const MakeAProposals = lazy(() => import('./views/MakeAProposals'))
const Vote = lazy(() => import('./views/Vote'))
const Airdrop = lazy(() => import('./views/Airdrop'))
const MysteryBox = lazy(() => import('./views/MysteryBox'))

// const Register = lazy(() => import('./state/register/index'))
// This config is required for number formatting Membership 
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useSaveReferrer()
  
  useCheckTokenExpired()
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <ModalAlert/>
      {/* <GlobalCheckClaimStatus excludeLocations={['/collectibles']} /> */}
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <COLLATERALS />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <PoolRun />
            </Route>
            <Route path="/marketplace">
              <COLLATERALS />
            </Route>
            {/* <Route path="/inventory">
              <Inventory />
            </Route> */}
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/mybalance">
              <MyBalance />
            </Route>
            <Route path="/mypartner">
              <MyPartner />
            </Route>
            <Route path="/pawnnft">
              <ComingSoon />
            </Route>
            <Route path="/makeaproposals">
              <MakeAProposals />
            </Route>
            <Route path="/proposals">
              <Proposals />
            </Route>
            <Route path="/mysterybox">
              <MysteryBox />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            {/* <Route path="/cart">
              <Cart />
            </Route> 
            <Route path="/airdrop">
              <Airdrop />
            </Route>  
            <Route path="/makeaproposals">
              <MakeAProposals />
            </Route>
            <Route path="/proposals">
              <Proposals />
            </Route>
            
            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact strict path="/investtogether" component={Invest} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
            <Route exact path="/airdropdetails/:airdroptId" component={AirdropDetails}/>
            {/* <Route exact strict path="/remove" component={RemoveLiquidity} /> */}
            <Route exact path="/detailsell/:boxid" component={UserSell} />
            <Route exact path="/detailbuy/:saleId" component={BuyPage} />
            <Route exact path="/vote/:votingId" component={Vote} />
            <Route exact path="/sign-up" component={Register}/>
            <Route exact path="/detailbuy/:saleId" component={BuyPage} />
            <Route exact path="/inventory/:activeMystery" component={Inventory} />
            {/* <Route path="/">
              <Inventory />
            </Route> */}

            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      {/* <EasterEgg iterations={2} /> */}
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
