import styled from 'styled-components'
import { Input, Button, Flex, BoxProps } from '@pancakeswap/uikit'

const PaginationWrapper = styled(Flex)`
  align-items: center;
`
const PrevButton = styled(Button)`
  width: 56px;
  height: 38px;
  border-radius: 8px;
  background: url('/images/arraw-right.png') no-repeat center center;
  background-color: #1d018d;
  transform: rotate(180deg);
`
const NextButton = styled(Button)`
  width: 56px;
  height: 38px;
  border-radius: 8px;
  background: url('/images/arraw-right.png') no-repeat center center;
  background-color: #1d018d;
`
const PageInput = styled(Input)`
  width: 122px;
  height: 38px;
  border: 0.5px solid #9197ba;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 700;
  font-size: 16px;
  color: #ccd3ff;
  text-align: center;
  margin: 0px 10px;
`
const TotalPage = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #ccd3ff;
  margin-right: 10px;
`

interface ItemProps extends BoxProps {
  currentPage?: number
  totalPage?: number
}

const Pagination: React.FC<React.PropsWithChildren<ItemProps>> = ({ currentPage, totalPage, ...props }) => {
  return (
    <PaginationWrapper {...props}>
      <PrevButton />
      <PageInput value={currentPage} />
      <TotalPage>of {totalPage}</TotalPage>
      <NextButton />
    </PaginationWrapper>
  )
}

export default Pagination
