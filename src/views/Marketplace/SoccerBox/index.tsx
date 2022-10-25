import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useModal, Grid } from '@pancakeswap/uikit'
import { useERC1155 } from 'hooks/useContract'
import { useCurrentBlock } from 'state/block/hooks'
import { getBoxesAddress } from 'utils/addressHelpers'
import OpenBoxesModal from '../components/OpenBoxesModal'
import BoxItem from '../components/BoxItem'

const StyledFlexWrapper = styled.div`
  width: 100%;
`

export const Container = styled.div`
  margin: 0 auto;
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Col4 = styled.div`
  width: calc(100% / 4);
  padding: 0 12px;
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 15px;
  }
`

const SPECIAL_TYPE = 1

const SoccerBox = () => {
  const { account, chainId } = useWeb3React()
  const [amountBox, setAmountBox] = useState(0)
  const boxesAddress = getBoxesAddress(chainId)
  const boxesContract = useERC1155(boxesAddress)
  const currentBlock = useCurrentBlock()

  useEffect(() => {
    if (account) {
      boxesContract.balanceOf(account, SPECIAL_TYPE).then((res) => {
        setAmountBox(res.toNumber())
      })
    }
  }, [account, boxesContract, currentBlock])

  const [onPresentRegisterModal] = useModal(<OpenBoxesModal maxAmount={amountBox} />)

  return (
    <>
      <StyledFlexWrapper>
        <Container>
          <Grid gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(3, 1fr)"]} gridRowGap="8px">
            <BoxItem
              disabled={amountBox < 1}
              totalBox={amountBox}
              avatar="/videos/special.mp4"
              boxName="Special box"
              onClick={onPresentRegisterModal}
            />
          </Grid>
        </Container>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
