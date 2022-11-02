import React, { ReactNode, useState, useMemo } from "react";
import styled from "styled-components";
import useTheme from 'hooks/useTheme'
import { MENU_ENTRY_HEIGHT } from "../config";
import { LinkLabel, MenuEntry } from "./MenuEntry";
import { PushedProps } from "../types";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../../components/Svg";

interface Props extends PushedProps {
  label: string;
  icon: React.ReactElement;
  initialOpenState?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`;
const CustomLinkLabel = styled(LinkLabel)`
    color: ${({ isPushed, theme }) => (isPushed && "#fdb533")};
`
const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "transparent")};
  border-style: solid;
  border-width: 1px 0;
  a{
    font-size:18px !important;
    text-align: center;
    padding-left:40px;
  }
`;
const Accordion: React.FC<Props> = ({
  label,
  icon,
  isPushed,
  pushNav,
  initialOpenState = false,
  children,
  className,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState);
  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState);
    } else {
      pushNav(true);
      setIsOpen(true);
    }
  };
  return (
    <Container>
      <MenuEntry isPushed={isPushed} onClick={handleClick} className={className} isActive={isOpen}>
        {icon}
        <CustomLinkLabel isPushed={isOpen}>{label}</CustomLinkLabel>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        {children}
      </AccordionContent>
    </Container>
  );
};

export default React.memo(Accordion, (prev, next) => prev.isPushed === next.isPushed);
