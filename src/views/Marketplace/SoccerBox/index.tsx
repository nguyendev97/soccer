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

const SPECIAL_TYPE = 1
const HALLOWEEN_TYPE = 5

const SoccerBox = () => {
  const { account, chainId } = useWeb3React()
  const [amountBox, setAmountBox] = useState(0)
  const [amountHalloweenBox, setAmountHalloweenBox] = useState(0)
  const boxesAddress = getBoxesAddress(chainId)
  const boxesContract = useERC1155(boxesAddress)
  const currentBlock = useCurrentBlock()
  
  useEffect(() => {
    if (account) {
      boxesContract.balanceOf(account, SPECIAL_TYPE).then((res) => {
        setAmountBox(res.toNumber())
      })
      boxesContract.balanceOf(account, HALLOWEEN_TYPE).then((res) => {
        setAmountHalloweenBox(res.toNumber())
      })
    }
  }, [account, boxesContract, currentBlock])

  const [onPresentOpenBoxesModal] = useModal(<OpenBoxesModal maxAmount={amountBox} />)
  const [onPresentOpenHalloweenBoxesModal] = useModal(<OpenBoxesModal type="halloween" maxAmount={amountHalloweenBox} />)

  return (
    <>
      <StyledFlexWrapper>
        <Container>
          <Grid gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(3, 1fr)"]} gridColumnGap="16px" gridRowGap="8px">
            <BoxItem
              disabled={amountHalloweenBox < 1}
              totalBox={amountHalloweenBox}
              avatar="/videos/halloween.mp4"
              boxName="Halloween box"
              onClick={onPresentOpenHalloweenBoxesModal}
            />
            <BoxItem
              disabled={amountBox < 1}
              totalBox={amountBox}
              avatar="/videos/special.mp4"
              boxName="Special box"
              onClick={onPresentOpenBoxesModal}
            />
          </Grid>
        </Container>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
