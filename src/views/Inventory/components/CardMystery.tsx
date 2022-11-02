import { Button, Flex,  Text, useModal } from '@phamphu19498/runtogether-uikit';
import React from 'react';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import Test from 'components/Box/BoxOpened';
import ModalUnboxMystery from './ModalUnboxMystery';

interface PropsCard{
    ID?: number;
}

const CardMystery: React.FC<PropsCard> = ({
    ID
}) => {
    const {t} = useTranslation();
    const [ OpenModalUnbox ] = useModal(
        <ModalUnboxMystery 
            nftId={ID}           
        />
    );
    return (
        <Container>
            <Flex width="100%" flexDirection="column">
                <CustomCard >
                    <ImgShoes src="/images/mysterybox/box.png" alt='Image Mystery Box' />
                </CustomCard>
                <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                    <Text>{t('Mystery Box')}</Text>
                    <CustomId>
                        <Text bold>#{ID}</Text>
                    </CustomId>
                </Flex>
            </Flex>
            <CustomButton width="100%" onClick={OpenModalUnbox}>
                {t(`Unbox`)}
            </CustomButton>
        </Container>
    );
};

export default CardMystery;

const Container = styled.div`
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 320px;
    border-radius: 8px;
    position: relative;
`
const ImgShoes = styled.img`
    width: 100%;
    height: 100%;
`
const CustomButton = styled(Button)`
    margin-top: 1rem;
    border-radius:90px;
    box-shadow:none;
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