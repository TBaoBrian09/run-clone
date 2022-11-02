import { darkColors, lightColors } from "../../theme/colors";
import { ToggleTheme } from "./types";

export const light: ToggleTheme = {
  handleBackground: lightColors.primaryBright,
};

export const dark: ToggleTheme = {
  handleBackground: darkColors.primaryBright,
};
