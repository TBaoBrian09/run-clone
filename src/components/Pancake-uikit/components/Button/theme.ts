import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
    borderRadius: '8px',
    fontSize: '14px'
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "primary",
    color: "black",
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "disabled",
    boxShadow: "none",
    color: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "transparent",
    color: "primary",
    border: "2px solid #ffab00",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "black",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "black",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "text",
    boxShadow: "none",
  },
  [variants.PRIMARYDARK]: {
    backgroundColor: "primaryDark",
    color: "black",
  },
  [variants.CUSTOMBTN]: {
    backgroundColor: "#e2e2e2",
    color: "#000",
  },
  [variants.REDEENBUTTON]: {
    backgroundColor: "redeem",
    color: "#fff",
  },
  [variants.COMING]: {
    backgroundColor: "#00FFE0",
    color: "#000",
  },
  [variants.COMPLETED]: {
    backgroundColor: "#8F00FF",
    color: "#fff",
  },
  [variants.LIVE]: {
    backgroundColor: "#49A2F2",
    color: "#fff",
  },
};
