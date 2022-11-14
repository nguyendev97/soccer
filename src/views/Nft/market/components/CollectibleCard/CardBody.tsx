import { Box, CardBody, Flex, Text, useModal, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import BuyModal from '../BuySellModals/BuyModal'
import SellModal from '../BuySellModals/SellModal'
import { BNBAmountLabel, MetaRow } from './styles'
import LocationTag from './LocationTag'
import { CollectibleCardProps } from './types'


const CardStyled = styled(CardBody)`
  background: linear-gradient(3.19deg, #1D018D 2.64%, #1D018D 97.36%);
  border-radius: 10px;
`

const PlayerImgStyled = styled.img`
  width: 100%;
  height: fit-contents;
`

const CollectibleCardBody: React.FC<React.PropsWithChildren<CollectibleCardProps>> = ({
  nft,
  currentAskPrice,
  isUserNft,
}) => {
  const { t } = useTranslation()
  const [onPresentBuyModal] = useModal(<BuyModal nftToBuy={nft} />)
  const [onPresentSellModal] = useModal(
    <SellModal variant={nft.marketData?.isTradable ? 'edit' : 'sell'} nftToSell={nft} onSuccessSale={null} />,
  )

  const ownerButtons = (
    <Flex flexDirection={['column', 'column', 'row']}>
      <Button
        scale="sm"
        disabled={!nft.marketData?.isTradable}
        width='max-content'
        onClick={event => {
          event.preventDefault()
          onPresentSellModal()
        }}
      >
        {nft.marketData?.isTradable ? t('Adjust price') : t('List for sale')}
      </Button>
    </Flex>
  )

  return (
    <CardStyled p="16px">
      <PlayerImgStyled src={nft?.image?.thumbnail} alt={nft.name} />
      <Flex alignItems="center" justifyContent="space-between">
        {nft?.collectionName && (
          <Text fontSize="12px" color="textSubtle" mb="8px">
            {nft?.collectionName}
          </Text>
        )}
      </Flex>
      <Flex pt="8px" justifyContent="space-between" alignItems="flex-end">
        <Box>
          {currentAskPrice && (
            <MetaRow flexDirection="column" alignItems="flex-start" title={isUserNft ? t('Your price') : t('Asking price')}>
              <BNBAmountLabel amount={currentAskPrice}  />
            </MetaRow>
          )}
        </Box>
        {isUserNft && ownerButtons}
        {!isUserNft && (
          <Button
            scale="sm"
            disabled={!nft.marketData?.isTradable}
            width='max-content'
            onClick={event => {
              event.preventDefault()
              onPresentBuyModal()
            }}
          >
            {t('Buy')}
          </Button>
        )}
      </Flex>
    </CardStyled>
  )
}

export default CollectibleCardBody
