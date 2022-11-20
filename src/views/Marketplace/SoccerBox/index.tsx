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
const COMMON_TYPE = 4
const GOLDEN_TYPE = 2
const SILVER_TYPE = 3

const SoccerBox = () => {
  const { account, chainId } = useWeb3React()
  const [amountBox, setAmountBox] = useState(0)
  const [amountGoldenBox, setAmountGoldenBox] = useState(0)
  const [amountSilverBox, setAmountSilverBox] = useState(0)
  const [amountCommonBox, setAmountCommonBox] = useState(0)
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
      boxesContract.balanceOf(account, GOLDEN_TYPE).then((res) => {
        setAmountGoldenBox(res.toNumber())
      })
      boxesContract.balanceOf(account, SILVER_TYPE).then((res) => {
        setAmountSilverBox(res.toNumber())
      })
      boxesContract.balanceOf(account, COMMON_TYPE).then((res) => {
        setAmountCommonBox(res.toNumber())
      })
    }
  }, [account, boxesContract, currentBlock])

  const [onPresentOpenBoxesModal] = useModal(<OpenBoxesModal maxAmount={amountBox} />)
  const [onPresentOpenHalloweenBoxesModal] = useModal(<OpenBoxesModal type="halloween" maxAmount={amountHalloweenBox} />)

  return (
    <>
      <StyledFlexWrapper>
        <Container>
          <Grid gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(3, 1fr)"]} gridColumnGap="16px" gridRowGap="16px">
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
            <BoxItem
              disabled={amountGoldenBox < 1}
              totalBox={amountGoldenBox}
              avatar="/videos/Golden.mp4"
              boxName="Golden box"
              onClick={null}
            />
            <BoxItem
              disabled={amountSilverBox < 1}
              totalBox={amountSilverBox}
              avatar="/videos/Silver.mp4"
              boxName="Silver box"
              onClick={null}
            />
            <BoxItem
              disabled={amountCommonBox < 1}
              totalBox={amountCommonBox}
              avatar="/videos/common.mp4"
              boxName="Common box"
              onClick={null}
            />
          </Grid>
        </Container>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
