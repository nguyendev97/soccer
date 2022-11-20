import Boxes from './boxes/index'

const BoxesPage = () => {
  return <Boxes />
}

export default BoxesPage

// import { useRouter } from 'next/router'

// function RedirectPage({ ctx }) {
//   const router = useRouter()
//   // Make sure we're in the browser
//   if (typeof window !== 'undefined') {
//     return router.push('/nfts/collections/0xFDBcAF35b55c0B8969b7B1265a405f87896380c1')
//   }
// }

// RedirectPage.getInitialProps = ctx => {
//   // We check for ctx.res to make sure we're on the server.
//   if (ctx.res) {
//     ctx.res.writeHead(302, { Location: '/nfts/collections/0xFDBcAF35b55c0B8969b7B1265a405f87896380c1' });
//     ctx.res.end();
//   }
//   return { };
// }

// export default RedirectPage
