import { Button, SearchIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import CountDown from 'components/CountDown'
import SearchInput from 'components/SearchInput'
import VariousKickers from 'components/VariousKickers'
import Image from 'next/image'
import styled from 'styled-components'
import { coin2xImage } from 'views/Marketplace/images'
import CompetitionTable from './CompetitionTable'

const Airdrop = () => {
  return (
    <Wrapper>
      <StyledNotify>Claim box Successfully!</StyledNotify>

      <AirdropSection />

      <QuestBoxSection />

      <SearchSection />

      <CompetitionSection />
    </Wrapper>
  )
}

export default Airdrop

const AirdropSection = () => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <SectionWrapper>
      <SectionTitle>AIRDROP</SectionTitle>
      {/* TOKEN */}
      <AirdropWrapper>
        <AirdropTitle>AIRDROP TOKEN</AirdropTitle>
        <AirdropContent>
          <AirdropWrapperData>
            <DataItem>
              <DataTitle>Amount:</DataTitle> 1000 Slots
            </DataItem>

            <DataItem>
              <DataTitle>Remain:</DataTitle>
            </DataItem>

            <DataItem>
              <DataTitle>Reward:</DataTitle> 100
              <Image
                src={coin2xImage}
                width={isMobile ? '18px' : '20px'}
                height={isMobile ? '18px' : '20px'}
                alt="coin"
              />
            </DataItem>
          </AirdropWrapperData>
          <CountDownWrapper>
            <CountDown date="2022/12/18" />
          </CountDownWrapper>
        </AirdropContent>
      </AirdropWrapper>
      <GradientButton
        style={{ fontSize: '16px', fontWeight: 700, marginLeft: isMobile ? 0 : '20px', margin: '20px auto' }}
      >
        Claim
      </GradientButton>

      {/* BOX */}
      <AirdropWrapper>
        <AirdropTitle>AIRDROP FREE BOX</AirdropTitle>
        <AirdropContent>
          <AirdropWrapperData>
            <DataItem>
              <DataTitle>Amount:</DataTitle> 1000 Slots
            </DataItem>

            <DataItem>
              <DataTitle>Remain:</DataTitle>
            </DataItem>

            <DataItem>
              <DataTitle>Reward:</DataTitle> 1
              <Image
                src="/images/quest-box.png"
                width={isMobile ? '18px' : '20px'}
                height={isMobile ? '18px' : '20px'}
                alt="coin"
              />
            </DataItem>
          </AirdropWrapperData>
          <CountDownWrapper>
            <CountDown date="2022/12/18" />
          </CountDownWrapper>
        </AirdropContent>
      </AirdropWrapper>
      <GradientButton
        style={{ fontSize: '16px', fontWeight: 700, marginLeft: isMobile ? 0 : '20px', margin: '20px auto' }}
      >
        Claim
      </GradientButton>
    </SectionWrapper>
  )
}

const QuestBoxSection = () => {
  const { isMobile } = useMatchBreakpoints()
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

      <GradientButton
        style={{ fontSize: '16px', fontWeight: 700, marginLeft: isMobile ? 0 : '20px', margin: '20px auto' }}
      >
        Claim Box
      </GradientButton>
    </SectionWrapper>
  )
}

const SearchSection = () => {
  return (
    <SectionWrapper style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
      <SectionTitle>SEARCH</SectionTitle>
      <SectionDesc>Complete quests to increase your rank!</SectionDesc>
      <SearchWrapper>
        <SearchInput onChange={() => console.log('')} />
        <SearchIcon className="search-icon" />
      </SearchWrapper>
    </SectionWrapper>
  )
}

const CompetitionSection = () => {
  return (
    <SectionWrapper style={{ maxWidth: '900px', margin: 'auto' }}>
      <SectionTitle>QUEST COMPETITION</SectionTitle>
      <SectionDesc>Complete quests to increase your rank!</SectionDesc>
      <CompetitionTable />
    </SectionWrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 63px;
  background-color: #130355;

  @media (max-width: 576px) {
    margin-top: 27px;
  }
`
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
const AirdropWrapper = styled.div`
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
const AirdropTitle = styled.h3`
  font-size: 24px;
  line-height: 160%;
  color: #e5e5e5;
`
const AirdropContent = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`
const AirdropWrapperData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
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
