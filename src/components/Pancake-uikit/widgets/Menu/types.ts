import BigNumber from "bignumber.js";
import { ReactElement } from "react";
import { Colors } from "../../theme/types";
export interface Language {
  code: string;
  language: string;
  locale: string;
}

export interface PushedProps {
  isPushed: boolean;
  pushNav: (isPushed: boolean) => void;
}

export interface NavTheme {
  background: string;
}

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}

export interface MenuSubEntry {
  label: string;
  href: string;
  calloutClass?: string;
  status?: LinkStatus;
  isExternal:boolean;
}

export interface MenuEntry {
  label: string;
  icon: string;
  items?: MenuSubEntry[];
  href?: string;
  calloutClass?: string;
  initialOpenState?: boolean;
  status?: LinkStatus;
  
}

export interface PanelProps {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  ltdPriceUsd?: BigNumber,
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  links: Array<MenuEntry>;
}

export interface NavProps extends PanelProps {
  userMenu?: ReactElement;
  globalMenu?: ReactElement;
}
