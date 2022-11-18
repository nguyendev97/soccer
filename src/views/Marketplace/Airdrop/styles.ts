import { Button } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 63px 0;
  background-color: #130355;

  @media (max-width: 576px) {
    padding: 27px 0;
  }
`
export const StyledNotify = styled.div`
  width: 100%;
  padding: 20px 0;
  background: #1d018d;
  text-align: center;

  line-height: 160%;
  color: #e5e5e5;
`
export const SectionWrapper = styled.section`
  background-color: #160461;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 40px;
  color: #fff;
`
export const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 28px;
  line-height: 160%;
  color: #ffffff;
  text-align: center;
`
export const SectionDesc = styled.p`
  color: #9197ba;
  text-align: center;
  margin-bottom: 30px;
`
export const AirdropWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  gap: 18px;
  width: 545px;
  height: 183px;
  border: 1px solid #9197ba;
  border-radius: 10px;
  margin-top: 40px;

  @media (max-width: 576px) {
    width: auto;
    height: auto;
  }
`
export const AirdropTitle = styled.h3`
  font-size: 24px;
  line-height: 160%;
  color: #e5e5e5;
`
export const AirdropContent = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`
export const AirdropWrapperData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`
export const DataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
`
export const DataTitle = styled.span`
  color: #9197ba;
`
export const CountDownWrapper = styled.div`
  height: 103px;
  padding: 12px;
  background: #1d018d;
  border-radius: 10px;
  * {
    margin: 0;
  }
`
export const GradientButton = styled(Button)`
  background: linear-gradient(103.59deg, #00cc83 26.67%, #36dbff 74.7%);
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 700;
  height: 44px;
  width: 220px;
  margin: 20px auto;
`
export const BoxContent = styled.div`
  max-width: 700px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    padding: 0 20px;
  }
`
export const BoxShowCase = styled.div`
  width: 100%;
`
export const BoxWrapper = styled.div`
  animation-delay: 2s;
  animation: floating-y 7s ease-in-out infinite;
  width: 100%;
  display: flex;
  justify-content: center;
`
export const SearchWrapper = styled.div`
  margin-top: 10px;
  position: relative;
  .search-icon {
    position: absolute;
    top: 10px;
    right: 4px;
  }
`
