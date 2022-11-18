import styled from 'styled-components'

export const GradientBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  width: 289px;
  height: 98px;
  border: 1px solid #00cc83;
  filter: drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;

  text-align: center;
  color: #ccd3ff;
  p {
    font-weight: 700;
    font-size: 40px;
    line-height: 160%;
  }
`

export const TimelineWrapper = styled.div`
  position: relative;
  width: 348px;
  height: 6px;
  background: #0e0049;
  border-radius: 10px;
  margin: 30px 0;
  @media (max-width: 576px) {
    width: 290px;
  }
`

export const Timeline = styled.div<{ position: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 6px;
  background: #36dbff;
  border-radius: 10px;
  width: calc(${({ position }) => position * 100}%);
`
export const DayWrapper = styled.div<{ position: number }>`
  position: absolute;
  top: -1px;
  left: calc(${({ position }) => position * 100}% - 4px);
`
export const Day = styled.p`
  font-size: 14px;
  line-height: 160%;
  color: #ccd3ff;
  white-space: nowrap;
  margin-left: -10px;
`
export const Point = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: ${({ active }) => (active ? '#36DBFF' : '#9197BA')};
  transform: scale(${({ active }) => (active ? 1.3 : 1)});
`
export const Number = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  color: #ccd3ff;
`
export const Reward = styled.div`
  position: absolute;
  width: 60px;
  height: 46px;
  bottom: 40px;
  left: 5px;
  transform: translateX(-50%);
  background: #1d018d;
  border-radius: 6px;
  text-align: center;
`
export const DeadlineWrapper = styled.div`
  padding: 4px 12px;
  width: 239px;
  height: 37px;
  background: #0e0049;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const Timer = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 160%;
  color: #00cc83;
`
export const LineTitle = styled.div`
  position: relative;
  font-weight: 700;
  font-size: 18px;
  line-height: 160%;
  color: #ffffff;
  margin: 40px 0 30px;

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 184.5px;
    height: 0px;
    border-top: 0.5px solid #9197ba;

    @media (max-width: 576px) {
      width: 80px;
    }
  }
  ::before {
    right: calc(100% + 20px);
  }
  ::after {
    left: calc(100% + 20px);
  }
`
export const QuestReward = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const QuestStage = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const QuestWrapper = styled.div`
  display: flex;
  padding: 10px 30px 10px 10px;
  gap: 12px;
  /* width: 407px; */
  height: 110px;
  background: #1d018d;
  border-radius: 10px;
`
export const QuestImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 90px;
  height: 90px;
  background: linear-gradient(205.65deg, #263192 2.69%, #1d096b 47.14%, #0046cd 93.07%);
  border-radius: 10px;
`
export const QuestContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 4px;

  h4 {
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
    color: #ffffff;
  }
  p {
    font-size: 12px;
    line-height: 160%;
    color: #9197ba;
  }
`

export const RangeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const RangeInput = styled.input`
  &[type='range'] {
    height: 6px;
    border-radius: 10px;
    background: #130355;
  }
`
