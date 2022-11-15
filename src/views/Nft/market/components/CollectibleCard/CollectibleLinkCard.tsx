import { NextLinkFromReactRouter } from 'components/NextLink'
import { useWeb3React } from '@pancakeswap/wagmi'
import { StyledCollectibleCard } from './styles'
import CardBody from './CardBody'
import { CollectibleCardProps } from './types'
import { nftsBaseUrl } from '../../constants'

const CollectibleLinkCard: React.FC<React.PropsWithChildren<CollectibleCardProps>> = ({
  nft,
  nftLocation,
  currentAskPrice,
  ...props
}) => {
  const { account } = useWeb3React()
  return (
    <StyledCollectibleCard {...props}>
      <NextLinkFromReactRouter to={`${nftsBaseUrl}/collections/${nft.collectionAddress}/${nft.tokenId}`}>
        <CardBody isUserNft={account?.toLowerCase() === nft?.marketData.currentSeller.toLowerCase()} nft={nft} nftLocation={nftLocation} currentAskPrice={currentAskPrice} />
      </NextLinkFromReactRouter>
    </StyledCollectibleCard>
  )
}

export default CollectibleLinkCard
