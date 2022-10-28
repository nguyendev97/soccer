import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "@pancakeswap/uikit";
// import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import Footer from "../../components/Footer";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { NavProps } from "./types";
// import LangSelector from "../../components/LangSelector/LangSelector";
import { MenuContext } from "./context";
import { Container } from "../../components/Footer/styles";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  &:after {
    position: fixed;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/images/main-background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    z-index: -1;
  }
`;

const StyledNav = styled.nav<{ isMobile: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1d018d;
  padding-bottom: 10px;
  padding-top: ${({ isMobile }) => (isMobile ? "10px" : "0px")};
  background: transparent;
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number; isTopPage: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
  background: ${({ isTopPage }) => (isTopPage ? "#130355" : "#130355")};
  box-shadow: ${({ isTopPage }) => (isTopPage ? "none" : "0px 0px 24px rgba(0, 0, 0, 0.1)")};
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    height: auto;
  }
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;
const WrapperMenuMobile = styled.div`
  position: relative;
`;
const WrapperMenuMobileContent = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  width: 100%;
  background-color: #130355;
  top: 84px;
  height: calc(100vh - 84px);
  padding: 15px;
  overflow-y: auto;
`;
const MenuMobileIcon = styled(Button)<{ showMenuMobile: boolean }>`
  width: 36px;
  height: 36px;
  background: url("/images/${({ showMenuMobile }) => `${showMenuMobile ? "menu-close" : "menu-open"}`}.svg") no-repeat
    center center;
`;
const MenuMobileItems = styled(MenuItems)`
  flex-direction: column;
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  children,
}) => {
  const router = useRouter();
  const { isMobile } = useMatchBreakpoints();
  const [showMenu, setShowMenu] = useState(true);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [isTopPage, setIsTopPage] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
        setIsTopPage(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        setIsTopPage(false);
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  useEffect(() => {
    setShowMenuMobile(false);
  }, [router]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly);
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly);

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <Wrapper>
        <FixedContainer showMenu={showMenu} height={120} isTopPage={isTopPage}>
          {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
          <Container>
            <StyledNav isMobile={isMobile}>
              <Flex>
                <Logo isDark={isDark} href={homeLink?.href ?? "/"} />
                {!isMobile && (
                  <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml="24px" />
                )}
              </Flex>
              {!isMobile ? (
                <Flex alignItems="center" height="100%">
                  {rightSide}
                </Flex>
              ) : (
                <WrapperMenuMobile>
                  <MenuMobileIcon showMenuMobile={showMenuMobile} onClick={() => setShowMenuMobile(!showMenuMobile)} />
                  {showMenuMobile && (
                    <WrapperMenuMobileContent>
                      <MenuMobileItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
                      <Flex alignItems="center">{rightSide}</Flex>
                    </WrapperMenuMobileContent>
                  )}
                </WrapperMenuMobile>
              )}
            </StyledNav>
          </Container>
        </FixedContainer>
        {/* {subLinks && (
          <Flex justifyContent="space-around">
            <SubMenuItems items={subLinksWithoutMobile} mt={`${totalTopMenuHeight + 1}px`} activeItem={activeSubItem} />

            {subLinksMobileOnly?.length > 0 && (
              <SubMenuItems
                items={subLinksMobileOnly}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItem}
                isMobileOnly
              />
            )}
          </Flex>
        )} */}
        <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : `${isMobile ? "25px" : "60px"}`}>
          <Inner isPushed={false} showMenu={showMenu}>
            {children}
            <Footer
              items={footerLinks}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              buyCakeLabel={buyCakeLabel}
              mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
            />
          </Inner>
        </BodyWrapper>
        {/* {isMobile && <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />} */}
      </Wrapper>
    </MenuContext.Provider>
  );
};

export default Menu;
