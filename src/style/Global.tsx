import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Red Hat Display', sans-serif;
  }
  body {

    img {
      height: auto;
      max-width: 100%;
    }
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`

export default GlobalStyle
