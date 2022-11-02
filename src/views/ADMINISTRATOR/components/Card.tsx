import { Button, Flex,  Text, useModal } from '@phamphu19498/runtogether-uikit';
import React from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
import ConnectWalletButton from "components/ConnectWalletButton";
import styled from 'styled-components';
import { GetBoxName } from 'hooks/useGetBoxName';
import { EditIcon, RemoveIcon } from 'components/Pancake-uikit'
import { LINK_BOX_RUNGTOGETHER } from "config/index"
import { useLiveTradeTokenPriceBusd } from 'state/farms/hooks'
import { useHistory } from 'react-router-dom';
import tokens from "config/constants/tokens";
import { renderBGCard } from "utils/renderBGCard"
import ModalAction from "./ModalAction"


interface PropsCard{
    ID?: number;
    IsHaving?: boolean;
    saleId?:any
    boxType?:any
    nftInfo?:any
    onChain:boolean
}

const Card:React.FC<PropsCard> = ({
    IsHaving,
    ID,
    saleId,
    boxType,
    nftInfo,
    onChain
}) => {
    const {t} = useTranslation()
    const {account} = useWeb3React()
    const history = useHistory()
    function handleClick() {
        history.push(`/detailsell/${ID}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const linkImagesBox = `${LINK_BOX_RUNGTOGETHER}/box${parseInt(boxType)}.png`
    const imgTag = `/images/martketplace/${parseInt(boxType)}.png`
    const converPrice = nftInfo ? new BigNumber(nftInfo.priceListing.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber().toLocaleString('en', { maximumFractionDigits: 2 }) : "0"
    const converNftId = nftInfo ? new BigNumber(nftInfo.nftId.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()*1E18 : null
    const { boxName } = GetBoxName(boxType.toString()) 
    const [OpenModalDelsit] = useModal(
        <ModalAction 
            isDelist={!false}
            title={t("Delist")}
            nftInfo={nftInfo}
        />
    )
    const [OpenModalEdit] = useModal(
        <ModalAction 
            isDelist={false}
            title={t("Edit")}
            nftInfo={nftInfo}
        />
    )
    return (
        <Container isHaving={IsHaving ? !false : false}>
            <Flex width="100%" flexDirection="column">
                <CustomCard background={renderBGCard(boxType)}>
                    <ImgShoes src={linkImagesBox} alt='Image Box'/>
                    <Tags src={imgTag} alt="tag box"/>
                </CustomCard>
                <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                    <Text>{t('Run Together Box NFT')}</Text>
                </Flex>
                <Flex width="100%" mt="10px" justifyContent="space-between">
                    <CustomId>
                    {IsHaving === true ?
                        <Text bold>#{ID}</Text>
                    :
                        <Text bold>#{converNftId}</Text>
                    }
                    </CustomId>
                    <ContainerBoxName>
                        <Text color='#30B38C' bold>
                            {boxName}
                        </Text>
                    </ContainerBoxName>
                </Flex>
                
                { IsHaving === false &&
                    <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center">
                        <Text bold fontSize='20px'>{t("Price")}</Text>
                        <Flex>
                            <img src="/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png" style={{width:"30px"}} alt="logo"/>
                            <Text color="text" fontSize='22px' bold ml="5px">{converPrice} {tokens.busd.symbol}</Text>
                        </Flex>
                    </Flex>
                }
            </Flex>
            { onChain &&
                <>
                    {account ? 
                        <>
                            {IsHaving === true ? 
                                <CustomButton width="100%" onClick={handleClick}>
                                    {t(`SELL`)}
                                </CustomButton>
                                :
                                <Flex width="100%" justifyContent="space-between">
                                    <DelistButton
                                        width="100%"
                                        startIcon={<RemoveIcon/>}
                                        onClick={OpenModalDelsit}
                                    >
                                    {t("Delist")}
                                    </DelistButton>
                                </Flex>
                                
                            }
                        </>
                            :
                            <ConnectWalletButton width="100%"/>
                    }
                </>
            }

        </Container>
    );
};

export default Card;

const Container = styled.div<{isHaving?:boolean, background?:string}>`
    width: 348px;
    height: ${({ isHaving }) => isHaving ? "456px" : "486px"};
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const CustomCard = styled.div<{background?:string}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 280px;
    background:${({ background }) => background};
    border-radius: 8px;
    position: relative;
`
const ImgShoes = styled.img`
    width: auto;
    height: auto;
`
const CustomButton = styled(Button)`
`
const DelistButton = styled(Button)<{isDisable:boolean}>`
  background: ${({ theme }) => theme.colors.failure};
  color:#fff;
  > svg {
      stroke: #fff;
  }
`
const EditButton = styled(Button)<{isDisable:boolean}>`
    color:#fff;
    > svg {
        stroke: #fff;
    }
`
const CustomId = styled(Flex)`
    background: rgba(48, 179, 140, 0.25);
    border-radius: 6px;
    width: 61px;
    height: 32px;
    padding:0px 10px 0px 10px;
    justify-content: center;
    align-items: center;
`
const ContainerBoxName = styled(Flex)`
    width: 175px;
    height: 32px;
    border: 2px solid rgba(48, 179, 140, 0.25);
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`
const Tags = styled.img`
    height: 40px;
    width: 40px;
    border-radius:50%;
    overflow:hidden;
    position: absolute;
    top:10px;
    right:10px;
`