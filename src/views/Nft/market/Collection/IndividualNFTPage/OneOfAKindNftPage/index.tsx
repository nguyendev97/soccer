import { useMemo } from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import sum from 'lodash/sum'
import Page from 'components/Layout/Page'
import { useGetCollection } from 'state/nftMarket/hooks'
import PageLoader from 'components/Loader/PageLoader'
import fromPairs from 'lodash/fromPairs'
import useNfts from 'hooks/useNfts'
import { useWeb3React } from '@pancakeswap/wagmi'
import MainNFTCard from './MainNFTCard'
import { TwoColumnsContainer } from '../shared/styles'
import PropertiesCard from '../shared/PropertiesCard'
import DetailsCard from '../shared/DetailsCard'
import useGetCollectionDistribution from '../../../hooks/useGetCollectionDistribution'
import { useCompleteNft } from '../../../hooks/useCompleteNft'

interface IndividualNFTPageProps {
  collectionAddress: string
  tokenId: string
}

const IndividualNFTPage: React.FC<React.PropsWithChildren<IndividualNFTPageProps>> = ({
  collectionAddress,
  tokenId,
}) => {
  useNfts({ collectionAddress, tokenIds: [tokenId] })
  const collection = useGetCollection(collectionAddress)
  const { data: distributionData, isFetching: isFetchingDistribution } = useGetCollectionDistribution(collectionAddress)
  const { combinedNft: nft, isOwn: isOwnNft, isProfilePic, refetch } = useCompleteNft(collectionAddress, tokenId)

  const properties = nft?.attributes

  const attributesRarity = useMemo(() => {
    if (distributionData && !isFetchingDistribution && properties) {
      return fromPairs(
        Object.keys(distributionData).map((traitType) => {
          const total = sum(Object.values(distributionData[traitType]))
          const nftAttributeValue = properties.find((attribute) => attribute.traitType === traitType)?.value
          const count = distributionData[traitType][nftAttributeValue]
          const rarity = (count / total) * 100
          return [traitType, rarity]
        }),
      )
    }
    return {}
  }, [properties, isFetchingDistribution, distributionData])

  

  if (!nft || !collection) {
    // Normally we already show a 404 page here if no nft, just put this checking here for safety.

    // For now this if is used to show loading spinner while we're getting the data
    return <PageLoader />
  }

  return (
    <Page>
      <MainNFTCard nft={nft} isOwnNft={isOwnNft} nftIsProfilePic={isProfilePic} onSuccess={refetch} />
      <TwoColumnsContainer flexDirection={['column', 'column', 'column', 'column', 'row']}>
        <Flex flexDirection="column" width="100%">
          <PropertiesCard properties={properties} rarity={attributesRarity} />
          <DetailsCard contractAddress={collectionAddress} ipfsJson={nft?.marketData?.metadataUrl} />
        </Flex>
      </TwoColumnsContainer>
    </Page>
  )
}

export default IndividualNFTPage
