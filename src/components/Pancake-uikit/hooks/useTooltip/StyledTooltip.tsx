import styled from "styled-components";

export const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    z-index: -1;
  }

  &::before {
    content: "";
    transform: rotate(45deg);
    background: #E4E4E4;
  }
`;

export const StyledTooltip = styled.div`
  padding: 16px;
  font-size: 16px;
  line-height: 130%;
  border-radius: 16px;
  max-width: 340px;
  z-index: 101;
  background:#E4E4E4;
  color: ${({ theme }) => (theme.isDark ? theme.tooltip.text : '#101133')};;
  box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
  backdrop-filter: blur(30px);
  &[data-popper-placement^="top"] > ${Arrow} {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > ${Arrow} {
    top: -4px;
  }

  &[data-popper-placement^="left"] > ${Arrow} {
    right: -4px;
  }

  &[data-popper-placement^="right"] > ${Arrow} {
    left: -4px;
  }
`;
