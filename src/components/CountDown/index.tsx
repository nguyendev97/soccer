import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@pancakeswap/uikit'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'

const WrapperTimer = styled(Flex)`
  flex-direction: row;
  margin-bottom: 20px;
`
const ColTimer = styled(Flex)`
  align-items: center;
  flex-direction: column;
`
const TimeCount = styled(Text)<{ isMobile: boolean }>`
  font-weight: 700;
  font-size: ${({ isMobile }) => (isMobile ? '30px' : '36px')};
  color: #fff;
`
const TimeType = styled(Text)<{ isMobile: boolean }>`
  font-weight: 400;
  font-size: ${({ isMobile }) => (isMobile ? '11px' : '14px')};
  background: #1d018d;
  border-radius: 6px;
  text-align: center;
  width: ${({ isMobile }) => (isMobile ? '54px' : '68px')};
  height: ${({ isMobile }) => (isMobile ? '20px' : '24px')};
  line-height: ${({ isMobile }) => (isMobile ? '20px' : '24px')};
`

export interface Props {
  date?: string
}

const CountDown: React.FC<React.PropsWithChildren<Props>> = ({ date }) => {
  const { isMobile } = useMatchBreakpoints()
  const [days, setDays] = useState<any>('00')
  const [hours, setHours] = useState<any>('00')
  const [minutes, setMinutes] = useState<any>('00')
  const [seconds, setSeconds] = useState<any>('00')
  useEffect(() => {
    if (!date) return
    const countDownDate = new Date(date || '01/01/2024').getTime()
    const timer = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime()
      // Find the distance between now and the count down date
      const distance = countDownDate - now
      // Time calculations for days, hours, minutes and seconds
      const daysDistance = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hoursDistance = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutesDistance = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const secondsDistance = Math.floor((distance % (1000 * 60)) / 1000)
      const daysFormat = daysDistance < 10 ? `0${daysDistance}` : daysDistance
      const hoursFormat = hoursDistance < 10 ? `0${hoursDistance}` : hoursDistance
      const minutesFormat = minutesDistance < 10 ? `0${minutesDistance}` : minutesDistance
      const secondsFormat = secondsDistance < 10 ? `0${secondsDistance}` : secondsDistance
      setDays(daysFormat)
      setHours(hoursFormat)
      setMinutes(minutesFormat)
      setSeconds(secondsFormat)
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timer)
      }
    }, 1000)

    // return clearInterval(timer);
  }, [date])

  return (
    <WrapperTimer>
      <ColTimer>
        <TimeCount isMobile={isMobile}>{days}</TimeCount>
        <TimeType isMobile={isMobile}>Days</TimeType>
      </ColTimer>
      <ColTimer style={{ marginLeft: '5px', marginRight: '5px ' }}>
        <TimeCount isMobile={isMobile}>:</TimeCount>
      </ColTimer>
      <ColTimer>
        <TimeCount isMobile={isMobile}>{hours}</TimeCount>
        <TimeType isMobile={isMobile}>Hours</TimeType>
      </ColTimer>
      <ColTimer style={{ marginLeft: '5px', marginRight: '5px ' }}>
        <TimeCount isMobile={isMobile}>:</TimeCount>
      </ColTimer>
      <ColTimer>
        <TimeCount isMobile={isMobile}>{minutes}</TimeCount>
        <TimeType isMobile={isMobile}>Minutes</TimeType>
      </ColTimer>
      <ColTimer style={{ marginLeft: '5px', marginRight: '5px ' }}>
        <TimeCount isMobile={isMobile}>:</TimeCount>
      </ColTimer>
      <ColTimer>
        <TimeCount isMobile={isMobile}>{seconds}</TimeCount>
        <TimeType isMobile={isMobile}>Seconds</TimeType>
      </ColTimer>
    </WrapperTimer>
  )
}

export default CountDown
