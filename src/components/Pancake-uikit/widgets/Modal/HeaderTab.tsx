import React, { useState } from "react";
import styled from "styled-components";
import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'

const styleActive = { background: '#49A2F2', color: '#fff', borderRadius:"5px"}

const Header = () =>{
    const { t } = useTranslation()
    const [ activeIndex, setActiveIndex ] = useState(0)
    return (
        <Wrapper>
            <CustomButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
                <CustomButtonMenuItem style={activeIndex === 0 ? styleActive : undefined}>
                {t('Upgrade')}
                </CustomButtonMenuItem>
                <CustomButtonMenuItem style={activeIndex !== 0 ? styleActive : undefined}>
                    {t('Redeem')}
                </CustomButtonMenuItem>
            </CustomButtonMenu>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    align-items: center;
    background: ${({ theme }) => theme.colors.modalHeader};
    display: flex;
    padding: 12px 24px;
`
const CustomButtonMenu = styled(ButtonMenu)`
    border-radius: 40px;
    background:${({ theme }) =>  theme.colors.background};
`
const CustomButtonMenuItem = styled(ButtonMenuItem)`
    display:flex;
    align-items:center;
    justify-content:center;
    height:35px;
    color:${({ theme }) => theme.colors.text};
`