import { Button } from '@pancakeswap/uikit'

import VariousKickers from 'components/VariousKickers'
import Image from 'next/image'
import styled from 'styled-components'
import { coin2xImage } from 'views/Marketplace/images'
import { Wrapper } from '../Airdrop/styles'

const DailyQuest = () => {
  return (
    <Wrapper>
      <StyledNotify>Your Quest Point: 0</StyledNotify>
      {/* Section */}
      <CheckInSection />
      <QuestBoxSection />
      <QuestSection />
    </Wrapper>
  )
}

export default DailyQuest

const CheckInSection = () => {
  return (
    <SectionWrapper>
      <SectionTitle>AIRDROP</SectionTitle>
      <SectionDesc>Claim daily free quest points 3 days in a row to get more reward!</SectionDesc>
      {/* TOKEN */}
      <GradientBox>
        <h3>Daily Free Quests Point</h3>
        <p>+1.43</p>
      </GradientBox>
      <GradientButton>Claim now</GradientButton>

      <TimelineWrapper style={{ marginTop: 60 }}>
        <Timeline position={0 / (pointArray.length - 1)} />
        {pointArray.map(({ position, active, reward }) => (
          <DayWrapper position={position / (pointArray.length - 1)} key={position}>
            {reward && (
              <Reward>
                <Number>{reward}</Number>
                <Image src={coin2xImage} width={16} height={16} alt="coin" />
              </Reward>
            )}
            <Point active={active} />
            <Day>{`Day ${position}`}</Day>
          </DayWrapper>
        ))}
        {/* Example */}
        {/* Timeline position 0/3 = 0%; 1/3 = 33%; 2/3 = 66%; 3/3 = 100% */}
        {/* <Timeline position={1 / 3} /> */}
      </TimelineWrapper>
    </SectionWrapper>
  )
}

const pointArray = [
  { position: 0, active: true },
  { position: 1, active: false },
  { position: 2, active: false, reward: 843.56 },
]

const QuestBoxSection = () => {
  return (
    <SectionWrapper style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
      <SectionTitle>QUEST BOX</SectionTitle>
      <SectionDesc>Use quest points to unlock quest box and earn amazing rewards!</SectionDesc>

      <BoxContent>
        <BoxShowCase>
          <BoxWrapper>
            <img src="/images/quest-box.png" alt="" style={{ paddingRight: '10px' }} />
          </BoxWrapper>
          <img src="/images/shelf.png" alt="" />
        </BoxShowCase>
        <VariousKickers
          rarities={[
            { rarity: 'Common kicker', background: 'rgba(68, 243, 107, 0.7)', percent: '17' },
            { rarity: 'Rare kicker', background: 'rgba(44, 66, 228, 0.7)', percent: '43' },
            { rarity: 'Epic kicker', background: 'rgba(118, 23, 183, 0.7)', percent: '30' },
            { rarity: 'Legendary kicker', background: 'rgba(255, 210, 59, 0.5)', percent: '10' },
          ]}
        />
      </BoxContent>

      <GradientButton>Claim Box</GradientButton>
    </SectionWrapper>
  )
}

const QuestSection = () => {
  return (
    <SectionWrapper style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
      <SectionTitle>QUEST</SectionTitle>
      <SectionDesc>Complete quests to earn quest points</SectionDesc>

      <DeadlineWrapper>
        <img src="/images/clock.svg" alt="clock" />
        <span>Expires in</span>
        <Timer>01d 23h 42m</Timer>
      </DeadlineWrapper>

      <LineTitle>Quest Reward</LineTitle>

      <QuestWrapper>
        <p style={{ marginBottom: 24 }}>Quest Stage</p>
        <TimelineWrapper style={{ marginTop: 60 }}>
          <Timeline position={0 / (pointArray.length - 1)} />
          {questArray.map(({ position, active, reward }) => (
            <DayWrapper position={position / 4} key={position}>
              {reward && (
                <Reward>
                  <Number>{reward}</Number>
                  <Image src={coin2xImage} width={16} height={16} alt="coin" />
                </Reward>
              )}
              <Point active={active} />
              <Day style={{ opacity: 0 }}>{`Day ${position}`}</Day>
            </DayWrapper>
          ))}
        </TimelineWrapper>
      </QuestWrapper>
      <LineTitle>Quest Stage # 1</LineTitle>
    </SectionWrapper>
  )
}

const questArray = [
  { position: 1, active: false, reward: 843.56 },
  { position: 2, active: false, reward: 843.56 },
  { position: 3, active: false, reward: 843.56 },
]
const StyledNotify = styled.div`
  width: 100%;
  padding: 20px 0;
  background: #1d018d;
  text-align: center;

  line-height: 160%;
  color: #e5e5e5;
`
const SectionWrapper = styled.section`
  background-color: #160461;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 40px;
  color: #fff;
`
const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 28px;
  line-height: 160%;
  color: #ffffff;
  text-align: center;
`
const SectionDesc = styled.p`
  color: #9197ba;
  text-align: center;
  margin-bottom: 30px;
`
const DataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
`
const DataTitle = styled.span`
  color: #9197ba;
`
const CountDownWrapper = styled.div`
  height: 103px;
  padding: 12px;
  background: #1d018d;
  border-radius: 10px;
  * {
    margin: 0;
  }
`
const GradientButton = styled(Button)`
  background: linear-gradient(103.59deg, #00cc83 26.67%, #36dbff 74.7%);
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 700;
  height: 44px;
  width: 220px;
  margin: 20px auto;
`
const BoxContent = styled.div`
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
const BoxShowCase = styled.div`
  width: 100%;
`
const BoxWrapper = styled.div`
  animation-delay: 2s;
  animation: floating-y 7s ease-in-out infinite;
  width: 100%;
  display: flex;
  justify-content: center;
`
const SearchWrapper = styled.div`
  margin-top: 10px;
  position: relative;
  .search-icon {
    position: absolute;
    top: 10px;
    right: 4px;
  }
`

const GradientBox = styled.div`
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

const TimelineWrapper = styled.div`
  position: relative;
  width: 348px;
  height: 0px;
  border: 0.5px solid #9197ba;
  margin: 30px 0;
`

const Timeline = styled.div<{ position: number }>`
  position: absolute;
  top: -1px;
  left: 0;
  border: 1px solid #36dbff;
  width: calc(${({ position }) => position * 100}%);
`
const DayWrapper = styled.div<{ position: number }>`
  position: absolute;
  top: -4px;
  left: calc(${({ position }) => position * 100}% - 4px);
`
const Day = styled.p`
  font-size: 14px;
  line-height: 160%;
  color: #ccd3ff;
  white-space: nowrap;
  margin-left: -10px;
`
const Point = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: ${({ active }) => (active ? '#36DBFF' : '#9197BA')};
  transform: scale(${({ active }) => (active ? 1.3 : 1)});
`
const Number = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  color: #ccd3ff;
`
const Reward = styled.div`
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
const DeadlineWrapper = styled.div`
  padding: 4px 12px;
  width: 239px;
  height: 37px;
  background: #0e0049;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Timer = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 160%;
  color: #00cc83;
`
const LineTitle = styled.div`
  position: relative;
  font-weight: 700;
  font-size: 18px;
  line-height: 160%;
  color: #ffffff;

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 184.5px;
    height: 0px;
    border-top: 0.5px solid #9197ba;
  }
  ::before {
    right: calc(100% + 20px);
  }
  ::after {
    left: calc(100% + 20px);
  }
`
const QuestWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`
