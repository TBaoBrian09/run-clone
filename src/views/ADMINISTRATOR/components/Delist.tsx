import React from "react";
import styled from "styled-components";
import { Text, Flex, Button, AutoRenewIcon } from "@phamphu19498/runtogether-uikit"
import { LINK_BOX_RUNGTOGETHER } from "config/index"
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization';
import tokens from "config/constants/tokens";
import { GetBoxName } from 'hooks/useGetBoxName'
import { useLiveTradeTokenPriceBusd } from 'state/farms/hooks'
import { useDelist } from "../hook/useDelist"

interface Props{
    boxType?:any
    nftInfo?:any
    onDismiss?: () => void
}
const Delist:React.FC<Props> = ({nftInfo, boxType, onDismiss}) => {
    const { t } = useTranslation()
    const linkImagesBox = `${LINK_BOX_RUNGTOGETHER}/box${nftInfo.boxType.toString()}.png`
    const converNftId = nftInfo ? new BigNumber(nftInfo.nftId.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()*1E18 : null
    const converPrice = nftInfo ? new BigNumber(nftInfo.priceListing.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber().toLocaleString('en', { maximumFractionDigits: 2 }) : "0"
    const saleId = nftInfo ? nftInfo.saleId : null
    const { boxName } = GetBoxName(nftInfo.boxType)
    const { handleDelist, requestedDelist, pendingDelist, isClose } = useDelist(saleId)
    return (
        <Flex width="370px" py="1rem" flexDirection="column">
            <ContainerBox>
                <img src={linkImagesBox} alt="images-box"/>
            </ContainerBox>
            <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                <Text bold fontSize='20px'>{t('Running Shoes Box NFT')}</Text>
                <Text bold fontSize='20px' >ID: {converNftId}</Text>  
            </Flex>
            <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                <Text bold fontSize='20px'>{t('Level')}</Text>
                <Text bold fontSize='20px' >{boxName}</Text>  
            </Flex>
            <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center">
                <Text bold fontSize='20px'>{t("Price")}</Text>
                <Flex>
                    <img src="/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png" style={{width:"30px", height:"30px"}} alt="logo"/>
                    <Text color="text" fontSize='22px' bold ml="5px">{converPrice} {tokens.livetrade.symbol}</Text>
                </Flex>
                
            </Flex>  
            { nftInfo &&
                <>
                    { isClose === true ?
                        <Button mt="1rem" width="100%" onClick={onDismiss}>
                            {t("Close")}
                        </Button>
                    :
                        <Button 
                            mt="1rem" 
                            width="100%"
                            onClick={handleDelist}
                            disabled={pendingDelist}
                            endIcon={pendingDelist ? <AutoRenewIcon spin color="textDisable" /> : null}
                        >
                            {t("Delist")}
                        </Button>
                    }
                </>
            }          
        </Flex>
    )
}
export default Delist

const ContainerBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 280px;
    background:${({ theme }) => theme.colors.gradients.bgSecondary};
    border-radius:20px;
`