import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import Image from "next/image";
import { Flex, Box } from "../../../../components/Box";
import Text from "../../../../components/Text/Text";
import { coin2xImage } from "../images";
// import { ChevronDownIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
// import MenuIcon from "./MenuIcon";
import { UserMenuItem } from "./styles";

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  height: 44px;
  padding-left: 20px;
  padding-right: 8px;
  position: relative;

  &:hover {
    opacity: 0.65;
  }
`;

export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.invertedContrast};
  display: none;
  font-weight: 400;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
export const AccountInfo = styled(Flex)`
  position: relative;
`;
export const AccountWallet = styled(Flex)`
  flex-direction: column;
  justify-content: center;
`;
export const WrapperTextAmount = styled(Flex)`
  justify-content: flex-end;
  margin-top: 10px;
`;
export const TextAmount = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  margin-right: 10px;
  line-height: 1.2;
`;
export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background: url("/images/user-avatar.png") no-repeat center center;
  margin-left: 20px;
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  sotBalance,
  variant = variants.DEFAULT,
  children,
  disabled,
  placement = "bottom-end",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const accountEllipsis = account ? `${account.substring(0, 12)}...${account.substring(account.length - 4)}` : null;
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    placement,
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
  });

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <StyledUserMenu
        onTouchStart={() => {
          setIsOpen((s) => !s);
        }}
      >
        <AccountInfo>
          <AccountWallet>
            <LabelText title={typeof text === "string" ? text || account : account}>
              {text || accountEllipsis}
            </LabelText>
            <WrapperTextAmount>
              <TextAmount>{sotBalance} SOT</TextAmount>
              <Image src={coin2xImage} width="20px" height="20px" alt="coin" />
            </WrapperTextAmount>
          </AccountWallet>
          <Avatar />
        </AccountInfo>
        {/* {!disabled && <ChevronDownIcon color="text" width="24px" />} */}
      </StyledUserMenu>
      {!disabled && (
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <Box onClick={() => setIsOpen(false)}>{children?.({ isOpen })}</Box>
        </Menu>
      )}
    </Flex>
  );
};

export default UserMenu;
