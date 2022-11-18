import { SearchIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import CountDown from 'components/CountDown'
import SearchInput from 'components/SearchInput'
import VariousKickers from 'components/VariousKickers'
import Image from 'next/image'
import { coin2xImage } from 'views/Marketplace/images'
import CompetitionTable from './CompetitionTable'
import {
  AirdropContent,
  AirdropTitle,
  AirdropWrapper,
  AirdropWrapperData,
  BoxContent,
  BoxShowCase,
  BoxWrapper,
  CountDownWrapper,
  DataItem,
  DataTitle,
  GradientButton,
  SearchWrapper,
  SectionDesc,
  SectionTitle,
  SectionWrapper,
  StyledNotify,
  Wrapper,
} from './styles'

const Airdrop = () => {
  return (
    <Wrapper>
      <StyledNotify>Claim box Successfully!</StyledNotify>

      {/* Section */}
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
      <GradientButton>Claim</GradientButton>
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
      <GradientButton>Claim</GradientButton>
    </SectionWrapper>
  )
}

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
