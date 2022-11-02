import React from 'react';
import styled from 'styled-components';
import { Button, Flex, Text } from '@phamphu19498/runtogether-uikit';
import { renderBGCard, renderImgBox } from "utils/renderBGCard";
import BigNumber from 'bignumber.js';
import tokens from 'config/constants/tokens';
import { useTranslation } from 'contexts/Localization';
import { useHistory } from 'react-router-dom';
import { GetBoxName } from 'hooks/useGetBoxName';
import { GetBalanceNftInMarket } from 'state/multiBuyBox'

interface PropsCard{
    nftSeller?:string
    boxName?: any
    totalNftInMarket?:number
}

const CardAdmin:React.FC<PropsCard> = ({
    nftSeller,
    boxName,
    totalNftInMarket
}) => {

    const {t} = useTranslation()
    const history = useHistory()
    const sAccount = nftSeller ? `${nftSeller.substring(0, 2)}...${nftSeller.substring(nftSeller.length - 4)}` : '';
    function handleClick() {
        history.push(`/cart`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <Container>
            <CustomCard>
                <ImgShoes src="/images/COLLATERALS/bg_multibox.png" alt='Image Box'/>
            </CustomCard>
            <Flex width="100%" justifyContent="space-between" alignItems="center" >
                <Text>{t('Run Together Box NFT')}</Text>
            </Flex>
            <FlexNameBox>
                { boxName.length > 0 
                    && 
                    boxName.map((item: any) => (
                        <Flex justifyContent="space-between" alignItems="center" key={item} mt="10px">
                            <ContainerBoxName>
                                    <Text fontSize='14px' bold color='#30B38C'>{item.name}</Text>
                            </ContainerBoxName>
                        </Flex>
                    ))
                }
            </FlexNameBox>
        
            <Flex width="100%" justifyContent="space-between" mt="10px">
                <Text bold fontSize="18px">{t("Total quantity In stock")}</Text>
                <Text bold mr="5px">{totalNftInMarket}</Text>
            </Flex>
            <CustomButton 
                onClick={handleClick}
            >
                {t("Buy")}
            </CustomButton>
            
        </Container>
    );
};

export default CardAdmin;

const Container = styled.div`
    width: 348px;
    height: 550px;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
`
const CustomCard = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 310px;
    border-radius:8px;
    position: relative;
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
const ImgShoes = styled.img`
    width: auto;
    height: auto;
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
    min-width: 150px;
    /* padding: 0px 15px;  */
    height: 32px;
    border: 2px solid rgba(48, 179, 140, 0.25);
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`
const Row = styled.div`
    display: flex;
    align-items: center;
`
const CustomButton = styled.button`
    width: 100%;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius: 90px;
    font-weight:bold;
    font-size:18px;
    background-color: transparent;
    cursor: pointer;
    &:hover{
        background-color: #FF592C;
        border: 2px solid #FF592C;
        transition-duration:0.5s;
        color:#fff;
    }
`

const FlexNameBox = styled(Flex)`
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 5px;
`