import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useModal } from '@pancakeswap/uikit'
import { useERC1155 } from 'hooks/useContract'
import { getBoxesAddress } from 'utils/addressHelpers'
import OpenBoxesModal from '../components/OpenBoxesModal'
import BoxItem from '../components/BoxItem'
import { specialBoxImage } from '../images'

const StyledFlexWrapper = styled.div`
  width: 100%;
`

export const Container = styled.div`
  margin: 0 auto;
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
`
export const Col4 = styled.div`
  width: calc(100% / 4);
  padding: 0 12px;
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 15px;
  }
`

const boxesAddress = getBoxesAddress()
const SPECIAL_TYPE = 1

const SoccerBox = () => {
  const { account } = useWeb3React()
  const [amountBox, setAmountBox] = useState(0)
  const boxesContract = useERC1155(boxesAddress)

  useEffect(() => {
    if (account) {
      boxesContract.balanceOf(account, SPECIAL_TYPE).then((res) => setAmountBox(res.toNumber()))
    }
  }, [account, boxesContract])

  const [onPresentRegisterModal] = useModal(<OpenBoxesModal onDone={null} />)

  return (
    <>
      <StyledFlexWrapper>
        <Container>
          <Row>
            <Col4>
              <BoxItem
                disabled={amountBox < 1}
                totalBox={amountBox}
                avatar={specialBoxImage}
                boxName="Special box"
                onClick={onPresentRegisterModal}
              />
            </Col4>
            {/* <Col4>
              <BoxItem avatar={goldBoxImage} boxName="Gold box" />
            </Col4>
            <Col4>
              <BoxItem avatar={silverBoxImage} boxName="Silver box" />
            </Col4>
            <Col4>
              <BoxItem avatar={commonBoxImage} boxName="Common box" />
            </Col4> */}
          </Row>
        </Container>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
