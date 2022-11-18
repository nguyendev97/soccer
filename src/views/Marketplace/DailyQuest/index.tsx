import VariousKickers from 'components/VariousKickers'
import Image from 'next/image'
import { coin2xImage } from 'views/Marketplace/images'
import {
  BoxContent,
  BoxShowCase,
  BoxWrapper,
  GradientButton,
  SectionDesc,
  SectionTitle,
  SectionWrapper,
  StyledNotify,
  Wrapper,
} from '../Airdrop/styles'
import {
  Day,
  DayWrapper,
  DeadlineWrapper,
  GradientBox,
  LineTitle,
  Number,
  Point,
  QuestContent,
  QuestImageWrapper,
  QuestReward,
  QuestStage,
  QuestWrapper,
  RangeInput,
  RangeInputWrapper,
  Reward,
  Timeline,
  TimelineWrapper,
  Timer,
} from './styles'

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
      <QuestReward>
        <p style={{ marginBottom: 24 }}>Quest Stage</p>
        <TimelineWrapper style={{ marginTop: 60 }}>
          <Timeline position={1 / 4} />
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
      </QuestReward>
      <LineTitle>
        Quest Stage <span style={{ color: '#36DBFF' }}># 1</span>
      </LineTitle>

      {/* Carousel here */}
      <QuestStage>
        <QuestItem icon="/icons/playlist.svg" title="Watch video" desc="Complete quests to earn quest points" />
        <QuestItem icon="/icons/facebook.svg" title="Follow fanpage" desc="Complete quests to earn quest points" />
      </QuestStage>
    </SectionWrapper>
  )
}

const QuestItem = ({ icon, title, desc }) => {
  return (
    <QuestWrapper>
      <QuestImageWrapper>
        <img src={icon} alt="" />
      </QuestImageWrapper>
      <QuestContent>
        <h4>{title}</h4>
        <p>{desc}</p>
        <RangeInputWrapper>
          <RangeInput type="range" min={0} max={1} />
          0/1
        </RangeInputWrapper>
      </QuestContent>
    </QuestWrapper>
  )
}

const questArray = [
  { position: 1, active: true, reward: 843.56 },
  { position: 2, active: false, reward: 843.56 },
  { position: 3, active: false, reward: 843.56 },
]
