import { Button, Flex,  Text, useModal } from '@phamphu19498/runtogether-uikit';
import React from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
import ConnectWalletButton from "components/ConnectWalletButton";
import styled from 'styled-components';
import { GetBoxName } from 'hooks/useGetBoxName';
import { EditIcon, RemoveIcon } from 'components/Pancake-uikit'
import { useHistory } from 'react-router-dom';
import tokens from "config/constants/tokens";
import { renderBGCard, renderImgBox } from "utils/renderBGCard"
import ModalAction from "./ModalAction"
import ModalTransferToOffChain from './ModalTranferOffChain';
import ModalTransferAnotherWallet from './ModalTransferAnotherWallet';


interface PropsCard{
    ID?: number;
    IsHaving?: boolean;
    saleId?:any
    boxType?:any
    onChain:boolean
    price?:number
}

const Card:React.FC<PropsCard> = ({
    IsHaving,
    ID,
    saleId,
    boxType,
    onChain,
    price,
}) => {
    const {t} = useTranslation()
    const {account} = useWeb3React()
    const history = useHistory()
    function handleClick() {
        history.push(`/detailsell/${ID}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const { boxName } = GetBoxName(boxType.toString()) 
    const [OpenModalDelsit] = useModal(
        <ModalAction 
            isDelist={!false}
            title={t("Delist")}
            nftId={ID}
            saleId={saleId}
            price={price}
            boxType={boxType}
        />
    )
    const [OpenModalTransfer] = useModal(
        <ModalTransferToOffChain 
            nftId={ID}
            boxType={boxType}
        />
    )
    const [OpenModalTransferAnotherWallet] = useModal(
        <ModalTransferAnotherWallet 
            nftId={ID}
            boxType={boxType}
        />
    )
    return (
        <Container isHaving={IsHaving ? !false : false}>
            <Flex width="100%" flexDirection="column">
                <CustomCard background={renderBGCard(boxType)}>
                    <ImgShoes src={renderImgBox(boxType)} alt='Image Box'/>
                </CustomCard>
                <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                    <Text>{t('Run Together Box NFT')}</Text>
                </Flex>
                <Flex width="100%" mt="10px" justifyContent="space-between">
                    <CustomId>
                    {IsHaving === true ?
                        <Text bold>#{ID}</Text>
                    :
                        <Text bold>#{ID}</Text>
                    }
                    </CustomId>
                    <ContainerBoxName>
                        <Text color='#30B38C' bold>
                            {boxName}
                        </Text>
                    </ContainerBoxName>
                </Flex>
                { IsHaving === false &&
                    <Flex marginTop="1rem" width="100%" justifyContent="space-between" alignItems="center">
                        <Text bold fontSize='20px'>{t("Price")}</Text>
                        <Flex>
                            <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" style={{width:"30px"}} alt="logo"/>
                            <Text color="text" fontSize='22px' bold ml="5px">{price.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tokens.Run.symbol}</Text>
                        </Flex>
                    </Flex>
                }
            </Flex>
            { onChain &&
                <>
                    {account ? 
                        <Flex>
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
                        </Flex>
                            :
                            <CustomButtonConnectWallet mt="1rem" width="100%"/>
                    }
                </>
            }
            { IsHaving === true &&
                (
                    <ButtonTransfer onClick={OpenModalTransfer}>
                        <Icon src="/images/arrow-swap-horizontal.png" alt="icon transfer"/>
                        Deposit
                    </ButtonTransfer>
                )
            }
            { IsHaving === true &&
                (
                    <ButtonTransfer onClick={OpenModalTransferAnotherWallet}>
                        <Icon src="/images/arrow-swap-horizontal.png" alt="icon transfer"/>
                        Transfer to another wallet
                    </ButtonTransfer>
                )
            }

        </Container>
    );
};

export default Card;

const Icon = styled.img`
    height: 20px;
    width: 20px;
    border-radius:50%;
    margin-right: 8px;
`

const Container = styled.div<{isHaving?:boolean, background?:string}>`
    width: 368px;
    height: auto;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        padding: 15px 0px 15px 0px;
    }
`
const CustomCard = styled.div<{background?:string}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 280px;
    background:${({ background }) => background};
    border-radius: 8px;
    position: relative;
    justify-content: center;
    align-items: center;
`
const ImgShoes = styled.img`
    width: auto;
    height: auto;
`
const CustomButton = styled(Button)`
    margin-top: 1rem;
    border-radius:90px;
    box-shadow:none;
`
const DelistButton = styled(Button)<{isDisable:boolean}>`
  background: ${({ theme }) => theme.colors.primaryBright};
  margin-top:1rem;
  border-radius: 90px;
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
    width: 100px;
    height: 32px;
    border: 2px solid rgba(48, 179, 140, 0.25);
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`
const ButtonTransfer = styled(Button)`
    height: 48px;
    margin-top:1rem;
    border: 2px solid #E6E8EC;
    box-shadow:none;
    border-radius:90px;
    background:transparent;
    color: #000;
    &:hover{
        background:#E75243;
        color: #FFF;
        opacity: 1;
    }
`
const CustomButtonConnectWallet = styled(ConnectWalletButton)`
    width: 100% !important; 
`