import styled from "styled-components";
import { ToggleProps, HandleProps, InputProps, ScaleKeys, scales, StyleToggleProps } from "./types";

const scaleKeyValues = {
  sm: {
    handleHeight: "10px",
    handleWidth: "10px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 12px)",
    toggleHeight: "16px",
    toggleWidth: "32px",
  },
  md: {
    handleHeight: "10px",
    handleWidth: "10px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 12px)",
    toggleHeight: "16px",
    toggleWidth: "32px",
  },
  lg: {
    handleHeight: "10px",
    handleWidth: "10px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 12px)",
    toggleHeight: "16px",
    toggleWidth: "32px",
  },
};

const getScale =
  (property: ScaleKeys) =>
  ({ scale = scales.LG }: ToggleProps) => {
    return scaleKeyValues[scale][property];
  };

export const Handle = styled.div<HandleProps>`
  background-color: ${({ theme }) => theme.colors.textSubtle};
  border-radius: 50%;
  cursor: pointer;
  height: ${getScale("handleHeight")};
  left: ${getScale("handleLeft")};
  position: absolute;
  top: ${getScale("handleTop")};
  transition: left 200ms ease-in;
  width: ${getScale("handleWidth")};
  z-index: 1;
`;

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.textSubtle};

  &:checked + ${Handle} {
    left: ${getScale("checkedLeft")};
    background-color: #fff;
  }
`;

const StyledToggle = styled.div<StyleToggleProps>`
  align-items: center;
  background-color: ${({ theme, $checked, $checkedColor, $defaultColor }) =>
    theme.colors[$checked ? $checkedColor : $defaultColor]};
  border-radius: 16px;
  border: 1px solid
    ${({ theme, $checked, $checkedColor }) => ($checked ? theme.colors[$checkedColor] : theme.colors.textSubtle)};
  box-shadow: none;
  cursor: pointer;
  display: inline-flex;
  height: ${getScale("toggleHeight")};
  position: relative;
  transition: background-color 200ms;
  width: ${getScale("toggleWidth")};
`;

export default StyledToggle;
