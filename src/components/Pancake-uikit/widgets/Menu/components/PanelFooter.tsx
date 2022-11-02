import React from "react";
import styled from "styled-components";
import { CogIcon, TrendUpIcon } from "../../../components/Svg";
import IconButton from "../../../components/Button/IconButton";
import { MENU_ENTRY_HEIGHT } from "../config";
import { PanelProps, PushedProps } from "../types";
import LTDPrice from "./LTDPrice";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSelector from "./LangSelector";

interface Props extends PanelProps, PushedProps {}

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.nav.background};
  border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`;

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTrendUpIon = styled(TrendUpIcon)`
  height: 6px;
  margin-bottom: 12px;
  margin-left: -5px;
`

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  ltdPriceUsd,
  currentLang,
  langs,
  setLang,
}) => {
 
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <SocialEntry>
        <LTDPrice ltdPriceUsd={ltdPriceUsd} /> <StyledTrendUpIon color="text" />
      </SocialEntry>
      <SettingsEntry>
        <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
        <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />
      </SettingsEntry>
    </Container>
  );
};

export default PanelFooter;
