import { useRouter } from 'next/router'
import PageLoader from 'components/Loader/PageLoader'
import { useWeb3React } from '@pancakeswap/wagmi'
import IndividualNFTPage from './OneOfAKindNftPage'

const IndividualNFTPageRouter = () => {
  const router = useRouter()
  const { chainId } = useWeb3React()
  const { collectionAddress, tokenId } = router.query

  if (router.isFallback || !collectionAddress || !chainId) {
    return <PageLoader />
  }
  console.log({ collectionAddress, tokenId })
  return <IndividualNFTPage chainId={chainId} collectionAddress={String(collectionAddress)} tokenId={String(tokenId)} />
}

export default IndividualNFTPageRouter
