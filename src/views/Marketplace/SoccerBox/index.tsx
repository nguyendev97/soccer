import styled from 'styled-components'
import { Flex, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import BoxItem from '../components/BoxItem'
import BoxModal from '../components/BoxModal'
import SuccessModal from '../components/SuccessModal'
import { specialBoxImage, goldBoxImage, silverBoxImage, commonBoxImage } from '../images'

const StyledFlexWrapper = styled.div`
  width: 100%;
`
const StyledFillter = styled(Flex)`
  flex-direction: column;
  align-items: center;
  flex-direction: revert;
  justify-content: flex-end;
  margin-bottom: 20px;
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
`

const SoccerBox = () => {
  const { t } = useTranslation()
  const [onPresentBoxModal] = useModal(<BoxModal />)
  const [onPresentSuccessModal] = useModal(<SuccessModal />)
  const handleChangeQuery = () => {
    console.log('change search')
  }
  const handleTypeOptionChange = (option: OptionProps): void => {
    console.log('change select')
  }

  return (
    <>
      <StyledFlexWrapper>
        <StyledFillter>
          <SearchInput onChange={handleChangeQuery} placeholder="Search" />
          <Select
            style={{ width: '188px', marginLeft: '30px' }}
            options={[
              {
                label: t('All types'),
                value: 'all',
              },
              {
                label: t('Special box'),
                value: 'special',
              },
              {
                label: t('Gold box'),
                value: 'gold',
              },
              {
                label: t('Silver box'),
                value: 'silver',
              },
              {
                label: t('Common box'),
                value: 'common',
              },
            ]}
            onOptionChange={handleTypeOptionChange}
          />
        </StyledFillter>
        <Container>
          <Row>
            <Col4>
              <BoxItem avatar={specialBoxImage} boxName="Special box" onClick={onPresentBoxModal} />
            </Col4>
            <Col4>
              <BoxItem avatar={goldBoxImage} boxName="Gold box" />
            </Col4>
            <Col4>
              <BoxItem avatar={silverBoxImage} boxName="Silver box" />
            </Col4>
            <Col4>
              <BoxItem avatar={commonBoxImage} boxName="Common box" />
            </Col4>
          </Row>
        </Container>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
