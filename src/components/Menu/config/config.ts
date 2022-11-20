import { MenuItemsType, SwapIcon, SwapFillIcon, HomeIcon } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
// import { nftsBaseUrl } from 'views/Nft/market/constants'
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
      label: t('Boxes'),
      href: '/boxes',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      items: [
        {
          label: t('Halloween Box'),
          href: '/boxes/halloween',
        },
        {
          label: t('Golden Box'),
          href: '/boxes',
        },
        {
          label: t('Silver Box'),
          href: '/boxes',
        },
        {
          label: t('Common Box'),
          href: '/boxes',
        },
      ],
    },
    {
      label: t('Marketplace'),
      href: '/nfts/collections/0xFDBcAF35b55c0B8969b7B1265a405f87896380c1',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      items: [
        {
          label: t('Players'),
          href: '/nfts/collections/0xFDBcAF35b55c0B8969b7B1265a405f87896380c1',
        },
        {
          label: t('Equipments'),
          href: '/nfts/collections/0x4EB1917B335cCbe44529D702Efcff33392896003',
        },
      ],
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
