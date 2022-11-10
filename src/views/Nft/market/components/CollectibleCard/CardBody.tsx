import { Box, CardBody, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useBNBBusdPrice } from 'hooks/useBUSDPrice'
import styled from 'styled-components'
import { CostLabel, MetaRow } from './styles'
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
  nftLocation,
  currentAskPrice,
  isUserNft,
}) => {
  const { t } = useTranslation()
  const bnbBusdPrice = useBNBBusdPrice()

  return (
    <CardStyled p="16px">
      <PlayerImgStyled src={nft?.image?.thumbnail} alt={nft.name} />
      <Flex alignItems="center" justifyContent="space-between">
        {nft?.collectionName && (
          <Text fontSize="12px" color="textSubtle" mb="8px">
            {nft?.collectionName}
          </Text>
        )}
        {nftLocation && <LocationTag nftLocation={nftLocation} />}
      </Flex>
      <Box pt="8px">
        {currentAskPrice && (
          <MetaRow flexDirection="column" alignItems="flex-start" title={isUserNft ? t('Your price') : t('Asking price')}>
            <CostLabel cost={currentAskPrice} bnbBusdPrice={bnbBusdPrice} />
          </MetaRow>
        )}
      </Box>
    </CardStyled>
  )
}

export default CollectibleCardBody
