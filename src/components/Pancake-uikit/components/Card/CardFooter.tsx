import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export type CardFooterProps = SpaceProps;

const CardFooter = styled.div<CardFooterProps>`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  ${space}
`;

CardFooter.defaultProps = {
  p: "24px",
};

export default CardFooter;
