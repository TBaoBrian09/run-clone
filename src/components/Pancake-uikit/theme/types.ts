import { StringFormatDefinition } from "ajv";

export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  nav: string;
};

export type Spacing = number[];

export type Radii = {
  small: string;
  default: string;
  card: string;
  circle: string;
};

export type Shadows = {
  level1: string;
  active: string;
  success: string;
  warning: string;
  focus: string;
  inset: string;
};

export type Gradients = {
  bubblegum: string;
  inverseBubblegum: string;
  cardHeader: string;
  blue: string;
  violet: string;
  violetAlt: string;
  gold: string;
  backgroundContainer: string;
  backgroundUpgrade:string;
  backgroundUserInfor:string;
  backgroundNftInfo:string;
  bgSecondary:string
};

export type Colors = {
  primary: string;
  primaryBright: string;
  primaryDark: string;
  secondary: string;
  tertiary: string;
  success: string;
  failure: string;
  warning: string;
  cardBorder: string;
  contrast: string;
  dropdown: string;
  dropdownDeep: string;
  invertedContrast: string;
  input: string;
  inputSecondary: string;
  background: string;
  backgroundDisabled: string;
  backgroundAlt: string;
  text: string;
  textDisabled: string;
  textSubtle: string;
  disabled: string;
  textDark: string;
  borderLine: string;
  membershipwrapperheaderbackground:string;
  upgradelevelContainer:string;
  borderUpgradeTableHeader:string;
  backgrounddark:string;
  backgroundlight:string;
  backgroundContainerMembership:string;
  divider: string;
  secondaryDark:string;
  backgroundDark:string;
  thirdDark:string;
  textDarkSecondary:string;
  bgCardProject:string;
  textSecondary:string;
  textThird:string;
  containerInput:string;
  backgroundListview:string;
  backgroundAcionList:string;
  modalHeader:string;
  modalHeaderWhite: string;
  backgroundModal:string;
  bright:string;
  bgRowLight:string;
  bgPasteButton:string;
  redeem:string;
  bgSecondary:string;
  // Gradients
  gradients: Gradients;

  // Additional colors
  binance: string;
  overlay: string;
  gold: string;
  silver: string;
  bronze: string;
  backgroundTab: string,
  textTab: string,
  borderTab: string,

  // DIPO Sub background
  dipoMainBackground: string,
  dipoContainerBackground: string,

  // Home Price
  homePrice: string,
  bgButtonModalPc: string,
  whiteColor: string,
  btnColor:string
};

export type ZIndices = {
  dropdown: number;
  modal: number;
};
