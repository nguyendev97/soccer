import { MenuItemsType, SwapIcon, SwapFillIcon, HomeIcon } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
// import { nftsBaseUrl } from 'views/Nft/market/constants'
// import { perpLangMap } from 'utils/getPerpetualLanguageCode'
// import { perpTheme } from 'utils/getPerpetualTheme'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'
// import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, chainId) =>
  [
    {
      label: t('Home'),
      icon: HomeIcon,
      fillIcon: HomeIcon,
      href: '/',
      items: [],
    },
    {
      label: t('Whitepaper'),
      href: 'https://soccercrypto.gitbook.io/soccercrypto/',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      items: [],
    },
    {
      label: t('Tokenomics'),
      href: 'https://soccercrypto.io/tokenomics',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      items: [],
    },
    {
      label: t('Marketplace'),
      href: '/',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      items: [],
    },
    {
      label: t('Boxes'),
      href: '/',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      items: [],
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
