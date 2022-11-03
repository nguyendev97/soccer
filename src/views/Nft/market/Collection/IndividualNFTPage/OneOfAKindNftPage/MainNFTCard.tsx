import { BinanceIcon, Box, Button, Card, CardBody, Flex, Text, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

import { NftToken } from 'state/nftMarket/types'
import { formatNumber } from 'utils/formatBalance'
import NFTMedia from 'views/Nft/market/components/NFTMedia'
import BuyModal from '../../../components/BuySellModals/BuyModal'
import SellModal from '../../../components/BuySellModals/SellModal'
import { nftsBaseUrl } from '../../../constants'
import { CollectionLink, Container } from '../shared/styles'

interface MainNFTCardProps {
  nft: NftToken
  isOwnNft: boolean
  onSuccess: () => void
}

const MainNFTCard: React.FC<React.PropsWithChildren<MainNFTCardProps>> = ({
  nft,
  isOwnNft,
  onSuccess,
}) => {
  const { t } = useTranslation()

  const currentAskPriceAsNumber = nft?.marketData?.currentAskPrice ? parseFloat(nft.marketData?.currentAskPrice) : 0
  const [onPresentBuyModal] = useModal(<BuyModal nftToBuy={nft} />)
  const [onPresentSellModal] = useModal(
    <SellModal variant={nft.marketData?.isTradable ? 'edit' : 'sell'} nftToSell={nft} onSuccessSale={onSuccess} />,
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
        {nft.marketData?.isTradable ? t('Adjust price') : t('List for sale')}
      </Button>
    </Flex>
  )

  return (
    <Card mb="40px">
      <CardBody>
        <Container flexDirection={['column-reverse', null, 'row']}>
          <Flex flex="2">
            <Box>
              <CollectionLink to={`${nftsBaseUrl}/collections/${nft.collectionAddress}`}>
                {nft?.collectionName}
              </CollectionLink>
              <Text fontSize="40px" bold mt="12px">
                {nft.name}
              </Text>
              {nft.description && <Text mt={['16px', '16px', '48px']}>{t(nft.description)}</Text>}
              <Text color="textSubtle" mt={['16px', '16px', '48px']}>
                {t('Price')}
              </Text>
              {currentAskPriceAsNumber > 0 ? (
                <Flex alignItems="center" mt="8px">
                  <BinanceIcon width={18} height={18} mr="4px" />
                  <Text fontSize="24px" bold mr="4px">
                    {formatNumber(currentAskPriceAsNumber, 0, 5)}
                  </Text>
                </Flex>
              ) : (
                <Text>{t('Not for sale')}</Text>
              )}
              {isOwnNft && ownerButtons}
              {!isOwnNft && (
                <Button
                  minWidth="168px"
                  disabled={!nft.marketData?.isTradable}
                  mr="16px"
                  width={['100%', null, 'max-content']}
                  mt="24px"
                  onClick={onPresentBuyModal}
                >
                  {t('Buy')}
                </Button>
              )}
            </Box>
          </Flex>
          <Flex flex="2" justifyContent={['center', null, 'flex-end']} alignItems="center" maxWidth={440}>
            <NFTMedia key={nft.tokenId} nft={nft} width={440} height={440} />
          </Flex>
        </Container>
      </CardBody>
    </Card>
  )
}

export default MainNFTCard
