import { Flex } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import PageLoader from 'components/Loader/PageLoader'
import MainNFTCard from './MainNFTCard'
import { TwoColumnsContainer } from '../shared/styles'
import DetailsCard from '../shared/DetailsCard'
import { useCompleteNft } from '../../../hooks/useCompleteNft'

interface IndividualNFTPageProps {
  collectionAddress: string
  tokenId: string
  chainId: number
}

const IndividualNFTPage: React.FC<React.PropsWithChildren<IndividualNFTPageProps>> = ({
  collectionAddress,
  tokenId,
  chainId
}) => {
  const { combinedNft: nft, isOwn: isOwnNft, refetch } = useCompleteNft(collectionAddress, tokenId, chainId)

  if (!nft) {
    return <PageLoader />
  }

  return (
    <Page>
      <MainNFTCard nft={nft} isOwnNft={isOwnNft} onSuccess={refetch} />
      <TwoColumnsContainer flexDirection={['column', 'column', 'column', 'column', 'row']}>
        <Flex flexDirection="column" width="100%">
          <DetailsCard contractAddress={collectionAddress} ipfsJson={nft?.marketData?.metadataUrl} />
        </Flex>
      </TwoColumnsContainer>
    </Page>
  )
}

export default IndividualNFTPage
