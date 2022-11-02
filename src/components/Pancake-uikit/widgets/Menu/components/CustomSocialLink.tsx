import React from "react";
import styled from 'styled-components'
import LanguageIcon from "components/Pancake-uikit/components/Svg/Icons/Language";
import { SvgProps } from "../../../components/Svg";
import * as IconModule from "../icons";

interface DataPropsType {
    Label:string
    Icon:string
    Link:string
}
const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };
   

const CustomSocialLink: React.FC<DataPropsType> = ({ Label, Icon, Link }) => {
    const SocialLogo = Icons[Icon];
    const iconProps = { width: "25px", color: "white", style: { cursor: "pointer" } };
    const mr = "10px";
    const mt = '6px';
    return (
        <SocialLogo {...iconProps} mt={mt} mr={mr} color="text" onClick={() => window.open(`${Link}`)}/>
    );
}

export default CustomSocialLink;
