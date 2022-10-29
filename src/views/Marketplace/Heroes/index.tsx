import styled from 'styled-components'
// import { useState, useEffect } from 'react'
import { Flex } from '@pancakeswap/uikit'
import PlayerInfo from '../components/PlayerInfo'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
`
const StyledFlexContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -12px;
`
export const Col = styled.div<{ col: number }>`
  width: calc(100% / ${({ col }) => col});
  padding: 0 12px;
  margin-bottom: 30px;
  @media (max-width: 992px) {
    width: 50%;
    margin-bottom: 15px;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 20px;
  }
`
const Heroes: React.FC<React.PropsWithChildren<{ col?: number }>> = ({ col }) => {
  return (
    <>
      <StyledFlexWrapper>
        <StyledFlexContent>
          <Row>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
            <Col col={col}>
              <PlayerInfo col={col} />
            </Col>
          </Row>
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Heroes
