import { Flex, SearchIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import CountDown from 'components/CountDown'
import SearchInput from 'components/SearchInput'
import Image from 'next/image'
import { EffectCoverflow, Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { coin2xImage } from 'views/Marketplace/images'
import CompetitionTable from '../Airdrop/CompetitionTable'
import {
  AirdropContent,
  AirdropTitle,
  AirdropWrapper,
  AirdropWrapperData,
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
} from '../Airdrop/styles'
import 'swiper/css/bundle'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

const CARDS_LEGEND = [
  'legend/SoccerCrypto-player-Pogba.png',
  'legend/SoccerCrypto-player-messi.png',
  'legend/SoccerCrypto-player-neymar.png',
  'legend/SoccerCrypto-player-ronaldo.png',
]
const CARDS_COMMON = [
  'common/SoccerCrypto-player-1.png',
  'common/SoccerCrypto-player-2.png',
  'common/SoccerCrypto-player-Ahmed Zain.png',
  'common/SoccerCrypto-player-Alejandro Brand.png',
  'common/SoccerCrypto-player-Alphonso Davies.png',
  'common/SoccerCrypto-player-Chicharito.png',
  'common/SoccerCrypto-player-Hannibal Mejbri.png',
  'common/SoccerCrypto-player-Harry Wilson.png',
  'common/SoccerCrypto-player-Layer 39.png',
  'common/SoccerCrypto-player-Luka Jovic.png',
  'common/SoccerCrypto-player-Thomas Partey.png',
  'common/SoccerCrypto-player-bdessamad Ezzalzouli.png',
  'common/SoccerCrypto-player-carcelen.png',
  'common/SoccerCrypto-player-eisa ahmed palangi.png',
]
const CARDS_RARE = [
  'rare/Shahab Zahedi.png',
  'rare/SoccerCrypto-player-Christian Pulisic.png',
  'rare/SoccerCrypto-player-Mbabu.png',
  'rare/SoccerCrypto-player-cavani.png',
  'rare/SoccerCrypto-player-lewandowski.png',
  'rare/SoccerCrypto-player-minamino.png',
  'rare/SoccerCrypto-player-sadio mane.png',
  'rare/SoccerCrypto-player-son heung min.png',
]
const CARDS_EPIC = [
  'epic/SoccerCrypto-player-Frenkie de Jong.png',
  'epic/SoccerCrypto-player-Lukaku.png',
  'epic/SoccerCrypto-player-Toni kroos.png',
  'epic/SoccerCrypto-player-harry kane.png',
  'epic/SoccerCrypto-player-luka modric.png',
  'epic/SoccerCrypto-player-sergio ramos.png',
]

const MintNFT = () => {
  return (
    <Wrapper>
      <StyledNotify>Claim box Successfully!</StyledNotify>

      {/* Section */}
      <AirdropSection />
      <MintNFTSection />
      <SearchSection />
      <CompetitionSection />
    </Wrapper>
  )
}

export default MintNFT

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

const MintNFTSection = () => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <SectionWrapper style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
      <SectionTitle>MINT NFT</SectionTitle>
      <SectionDesc>Use quest points to unlock quest box and earn amazing rewards!</SectionDesc>

      <Flex maxWidth={['350px', null, '750px']} mt="12px">
        <Swiper
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          grabCursor
          navigation
          spaceBetween={8}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          slidesPerView={isMobile ? 2.1 : 4.1}
        >
          {[...CARDS_LEGEND, ...CARDS_EPIC, ...CARDS_RARE, ...CARDS_COMMON].map((card) => {
            return (
              <SwiperSlide key={card}>
                <img style={{ height: 250 }} src={`/images/cards/${card}`} alt="card" />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Flex>

      <GradientButton>Mint NFT</GradientButton>
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
