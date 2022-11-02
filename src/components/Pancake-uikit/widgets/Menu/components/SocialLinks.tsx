import React from "react";
import { Button } from 'components/Pancake-uikit/components/Button';
import { Dropdown } from 'components/Pancake-uikit/components/Dropdown';
import { useMatchBreakpoints } from "components/Pancake-uikit/hooks/index";
import { Link } from '@phamphu19498/runtogether-uikit';
import styled from 'styled-components'
import LanguageIcon from "components/Pancake-uikit/components/Svg/Icons/Language";
import { SvgProps } from "../../../components/Svg";
import Flex from "../../../components/Box/Flex";
import MenuLink from "./MenuLink";
import * as IconModule from "../icons";
import { socials } from "../config";

const ItemMenu = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const SocialButton = styled(Button)`
  height: 35px;
  width: 30px;
`

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const FlexMenu: React.FC = () => (
  <Flex>
        {socials.map((social, index) => {
          
          const Icon = Icons[social.icon];
          const iconProps = { width: "24px", color: "white", style: { cursor: "pointer" } };
          const mr = index < socials.length - 1 ? "14px" : '14px';
          const mt = '6px';
    
          return (
            <MenuLink key={social.label} href={social.href} aria-label={social.label} color="textSubtle">
                    <Icon {...iconProps} mt={mt} mr={mr} />
            </MenuLink>
            
          );
        })}
  </Flex>
)

const DropDownMenu: React.FC = () => (
  
  <Dropdown
    position="bottom"
    target={
      <SocialButton variant="text" startIcon={ <LanguageIcon width="24px" color="#FFFFFF" /> } />
    }>
      <ItemMenu>
        {socials.map((social, index) => {
          const Icon = Icons[social.icon];
          const mt = '13px';
          const mr = '6px';
          return (
            <Link external small  mt={mt} color="#FFFFFF" href={social.href}>
              <Icon color="#FFFFFF" mr={mr}/> {social.label}
            </Link>
          );
        })}
      </ItemMenu>
  </Dropdown>
)

const SocialLinks = () => {

  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

  return (
     isMobile ?  
      <DropDownMenu /> : <FlexMenu /> 
  )
};

export default SocialLinks;
