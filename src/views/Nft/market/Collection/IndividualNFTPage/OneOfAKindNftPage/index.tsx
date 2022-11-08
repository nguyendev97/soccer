import { Flex, Heading, Text, Button, BinanceIcon, useModal } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import PageLoader from 'components/Loader/PageLoader'
import { useTranslation } from '@pancakeswap/localization'
import NFTMedia from 'views/Nft/market/components/NFTMedia'
import styled from 'styled-components'
import Image from 'next/image'
import { formatNumber } from 'utils/formatBalance'
import truncateHash from '@pancakeswap/utils/truncateHash'
import BuyModal from '../../../components/BuySellModals/BuyModal'
import SellModal from '../../../components/BuySellModals/SellModal'
import { useCompleteNft } from '../../../hooks/useCompleteNft'
import { powImage, shoImage, speImage, jmpImage } from './images'

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
  const { t } = useTranslation()
  const { combinedNft: nft, isOwn: isOwnNft, refetch } = useCompleteNft(collectionAddress, tokenId, chainId)
  const currentAskPriceAsNumber = nft?.marketData?.currentAskPrice ? parseFloat(nft?.marketData?.currentAskPrice) : 0
  const [onPresentBuyModal] = useModal(<BuyModal nftToBuy={nft} />)
  const [onPresentSellModal] = useModal(
    <SellModal variant={nft?.marketData?.isTradable ? 'edit' : 'sell'} nftToSell={nft} onSuccessSale={refetch} />,
  )

  const ownerButtons = (
    <Flex flexDirection={['column', 'column', 'row']}>
      <Button
        minWidth="168px"
        mr="16px"
        width={['100%', null, 'max-content']}
        mt="24px"
        onClick={onPresentSellModal}
      >
        {nft?.marketData?.isTradable ? 'Adjust price' : 'List for sale'}
      </Button>
    </Flex>
  )

  if (!nft) {
    return <PageLoader />
  }
  console.log({nft})
  return (
    <StyledFlexWrapper>
      <Page>
        <StyledFlexContent>
          <StyledContent>
            <Container>
              <Row>
                <Col2>
                  <NFTMedia key={nft.tokenId} nft={nft} width={440} height={440} />
                </Col2>
                <Col2>
                  <NftTitle>{nft.name}</NftTitle>
                  <NftInfo>
                    <NftInfoItem>
                      <NftInfoIcon>
                        <Image src="/images/rate-icon.png" width="27px" height="21px" />
                      </NftInfoIcon>
                      <NftInfoContent>
                        <SpanText>Hero Ratity</SpanText>
                        <SpanCount>{nft.meta.Rarity.value}</SpanCount>
                      </NftInfoContent>
                    </NftInfoItem>
                    <NftInfoItem>
                      <NftInfoIcon>
                        <Image src="/images/level-icon.png" width="25px" height="19px" />
                      </NftInfoIcon>
                      <NftInfoContent>
                        <SpanText>Level</SpanText>
                        <SpanCount>{nft.meta.Level.value}</SpanCount>
                      </NftInfoContent>
                    </NftInfoItem>
                  </NftInfo>
                  <NftInfoPrice>
                    <NftPrice flexDirection="column" alignItems="flex-start">
                      {currentAskPriceAsNumber > 0 ? (
                        <Flex alignItems="center" mt="8px">
                          <BinanceIcon width={24} height={24} mr="4px" />
                          <Text fontSize="28px" bold mr="4px">
                            {formatNumber(currentAskPriceAsNumber, 0, 5)}
                          </Text>
                        </Flex>
                      ) : (
                        <Text>Not for sale</Text>
                      )}
                      {isOwnNft && ownerButtons}
                      {!isOwnNft && (
                        <BuyButton
                          minWidth="168px"
                          disabled={!nft.marketData?.isTradable}
                          mr="16px"
                          width={['100%', null, 'max-content']}
                          mt="24px"
                          onClick={onPresentBuyModal}
                        >
                          Buy
                        </BuyButton>
                      )}
                    </NftPrice>
                  </NftInfoPrice>
                  <NftAddress>
                    <NftAddressBox>
                      <BoxTitle>ID:</BoxTitle>
                      <BoxContent>#{nft.tokenId}</BoxContent>
                    </NftAddressBox>
                    <NftAddressBox>
                      <BoxTitle>Owner</BoxTitle>
                      <BoxContent style={{ color: '#0089B4' }}>{nft?.marketData?.isTradable ? truncateHash(nft?.marketData?.currentSeller) : truncateHash(nft.owner)}</BoxContent>
                    </NftAddressBox>
                  </NftAddress>
                </Col2>
              </Row>
            </Container>
          </StyledContent>
          <FlexSubTabContent>
            <SubTabText>
              {nft.description}
            </SubTabText>
            <NftProperties>
              <ItemLegend>
                <ItemLegendText>{t('POW')}</ItemLegendText>
                <FlexLegendItem>
                  <Image src={powImage} width="20px" height="20px" />
                  <ItemLegendNumber ml="8px">{nft.meta.POW.value}</ItemLegendNumber>
                </FlexLegendItem>
              </ItemLegend>
              <ItemLegend>
                <ItemLegendText>{t('SHO')}</ItemLegendText>
                <FlexLegendItem>
                  <Image src={shoImage} width="20px" height="20px" />
                  <ItemLegendNumber ml="8px">{nft.meta.SHO.value}</ItemLegendNumber>
                </FlexLegendItem>
              </ItemLegend>
              <ItemLegend>
                <ItemLegendText>{t('SPE')}</ItemLegendText>
                <FlexLegendItem>
                  <Image src={speImage} width="20px" height="20px" />
                  <ItemLegendNumber ml="8px">{nft.meta.SPE.value}</ItemLegendNumber>
                </FlexLegendItem>
              </ItemLegend>
              <ItemLegend>
                <ItemLegendText>{t('JMP')}</ItemLegendText>
                <FlexLegendItem>
                  <Image src={jmpImage} width="20px" height="20px" />
                  <ItemLegendNumber ml="8px">{nft.meta.JMP.value}</ItemLegendNumber>
                </FlexLegendItem>
              </ItemLegend>
            </NftProperties>
          </FlexSubTabContent>
        </StyledFlexContent>
      </Page>
    </StyledFlexWrapper>
  )
}

export default IndividualNFTPage

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
  margin-top: 63px;
  background-color: #130355;
  @media (max-width: 768px) {
    margin-top: 27px;
  }
`
const StyledFlexContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
const StyledContent = styled.div`
  width: 1092px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const Container = styled.div`
  width: 100%;
  padding: 0px 15px;
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -12px;
`
export const Col2 = styled.div`
  width: calc(100% / 2);
  padding: 0 12px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const NftAvatar = styled(Flex)`
  justify-content: center;
  padding-bottom: 70px;
  background: url('/images/nfts/nft-bg.png') no-repeat bottom center;
  @media (max-width: 768px) {
    background-size: contain;
  }
`
export const NftTitle = styled(Heading)`
  font-weight: 600;
  font-size: 40px;
  color: #fff;
  margin-bottom: 20px;
`
export const NftInfo = styled(Flex)`
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`
export const NftInfoItem = styled(Flex)`
  background-color: transparent;
  border: 1px solid #4757b7;
  border-radius: 10px;
  padding: 8px 20px;
  width: 164px;
  height: 64px;
  align-items: center;

  &:not(:last-child) {
    margin-right: 10px;
  }
`
const NftInfoIcon = styled(Flex)`
  margin-right: 17px;
`
const NftInfoContent = styled(Flex)`
  flex-direction: column;
`
const SpanText = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #ccd3ff;
  margin-bottom: 10px;
`
const SpanCount = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #3579ff;
`
const SubTabText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: #ccd3ff;
`
const FlexSubTabContent = styled.div`
  background-color: transparent;
  background: #160461;
  border-radius: 10px;
  padding: 24px;
  margin-top: 32px;
`
const NftProperties = styled(Flex)`
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`
const ItemLegend = styled.div`
  width: 164px;
  height: 69px;
  padding: 8px 24px;
  background: #1d018d;
  border-radius: 10px;

  &:not(:last-child) {
    margin-right: 16px;
  }

  @media (max-width: 768px) {
    margin-right: 0 !important;
    margin-bottom: 20px;
  }
`
const FlexLegendItem = styled(Flex)`
  align-items: center;
`
const ItemLegendText = styled(Text)`
  color: #ccd3ff;
  font-weight: 400;
  font-size: 14px;
`
const ItemLegendNumber = styled(Text)`
  color: #ccd3ff;
  font-weight: 700;
  font-size: 18px;
`
const NftInfoPrice = styled.div`
  background: linear-gradient(349.42deg, #1d018d 15.74%, rgba(29, 9, 107, 0) 124.9%);
  border-radius: 10px;
  padding: 20px 24px;
  margin-top: 20px;
`
const NftPrice = styled(Flex)`
  margin-bottom: 20px;
`
const BuyButton = styled(Button)`
  background: linear-gradient(103.59deg, #00cc83 26.67%, #36dbff 74.7%);
  border-radius: 10px;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
`
const NftAddress = styled(Flex)`
  align-items: center;
  margin-top: 20px;
`
const NftAddressBox = styled.div`
  width: 45%;
  &:not(:last-child) {
    margin-right: 70px;
  }
`
const BoxTitle = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #ccd3ff;
`
const BoxContent = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  color: #ccd3ff;
`
