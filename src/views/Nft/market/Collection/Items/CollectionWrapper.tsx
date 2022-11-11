import { createPortal } from 'react-dom'
import { Box, Grid } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import ScrollToTopButton from 'components/ScrollToTopButton/ScrollToTopButtonV2'
import styled from 'styled-components'
import { Collection } from 'state/nftMarket/types'
import SideFilter from './SideFilters'
import CollectionNfts from './CollectionNfts'

interface CollectionWrapperProps {
  collection: Collection
}

const CollectionWrapper: React.FC<React.PropsWithChildren<CollectionWrapperProps>> = ({ collection }) => {
  return (
    <ContainerStyled py="32px">
      <Container px={[0, null, '24px']}>
        <Grid gridTemplateColumns={["1fr", null, "1fr 3fr"]} gridColumnGap="16px" gridRowGap="8px">
          <SideFilter collectionAddress={collection?.address} />
          <Container px='0px'>
            <CollectionNfts collectionAddress={collection?.address} />
          </Container>
          {createPortal(<ScrollToTopButton />, document.body)}
        </Grid>
      </Container>
    </ContainerStyled>
  )
}

export default CollectionWrapper

const ContainerStyled = styled(Box)`
  width: 100%;
  margin-top: 63px;
  background-color: #130355;
  @media (max-width: 768px) {
    margin-top: 27px;
  }
`