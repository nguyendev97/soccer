/* eslint-disable jsx-a11y/iframe-has-title */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html translate="no">
        <Head>
          {process.env.NEXT_PUBLIC_NODE_PRODUCTION && (
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_NODE_PRODUCTION} />
          )}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="https://soccercrypto.io/logo.png" />
          <link rel="image_src" type="image/jpeg" href="https://soccercrypto.io/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="Soccer Crypto - Football Game NFT World Cup 2022 Qatar a Free to Play & Free to Earn crypto soccer that allows players to immerse in the world of football build with BNB Chain "
          />
          <meta
            name="keywords"
            content="soccer crypto, crypto soccer, football world cup, football nft games, soccer crypto game, play to earn, crypto soccer token, soccer coin"
          />
          <meta name="Author" content="Soccer Crypto ~ Football World Cup Games 2022" />
          <meta name="copyright" content="SoccerCrypto" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="[HOT]Crypto Soccer - The first game football NFT games free to play on BNB Chain"
          />
          <meta
            name="twitter:title"
            content="[HOT]Soccer Crypto - The first game football NFT games free to play on BNB Chain"
          />
          <meta
            name="twitter:description"
            content="The era of blockchain technology applied to the NFT football game, the 2022 world cup event, Soccer Crypto - Free-to-play Free-to-earn for everyone"
          />
          <meta property="og:url" content="https://soccercrypto.io/" />
          <meta property="og:image" content="https://soccercrypto.io/logo.png" />
          <meta name="twitter:image" content="https://soccercrypto.io/" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@SoccerCryptoP2E" />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <div id="portal-root" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
