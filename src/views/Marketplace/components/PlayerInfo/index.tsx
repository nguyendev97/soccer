// import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Flex } from '@pancakeswap/uikit'
import groupBy from 'lodash/groupBy'
// import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
// import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'
import { coin2xImage } from '../../images'

const PlayerWrapper = styled.div`
  position: relative;
  background: linear-gradient(3.19deg, #1d018d 2.64%, #1d018d 97.36%);
  border-radius: 10px;
  padding: 8px;
`
const PlayerInfoWrapper = styled.div<{ rarity: string; col?: number }>`
  margin: auto;
  position: relative;
  width: ${({ col }) => (col === 5 ? '177px' : '204px')};
  height: ${({ col }) => (col === 5 ? '247px' : '284px')};
  background: ${({ rarity }) => `url('/images/player-bg-${rarity.toLowerCase()}.png') no-repeat center center`};
  background-size: contain;
  @media (max-width: 768px) {
    width: 150px;
    height: 230px;
  }
`
const PlayerAvatar = styled.div<{ src?: string; col?: number }>`
  width: 50%;
  left: 25px;
  height: ${({ col }) => (col === 5 ? '163px' : '200px')};
  position: absolute;
  top: 40px;
  background: url('${({ src }) => src}') no-repeat center center;
  background-size: contain;
  @media (max-width: 768px) {
    height: 140px;
  }
`
const PlayerName = styled.span<{ col?: number }>`
  position: absolute;
  bottom: ${({ col }) => (col === 5 ? '27px' : '31px')};
  left: ${({ col }) => (col === 5 ? '25px' : '30px')};
  text-transform: uppercase;
  color: #191325;
  font-weight: 700;
  font-size: 12px;
  @media (max-width: 768px) {
    bottom: 32px;
    left: 24px;
    font-size: 10px;
  }
`
const PlayerInfoPrice = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`
const PlayerPrice = styled.div`
  position: relative;
`
const TextPrice = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  margin-left: 7px;
`
const StyledSpan = styled.span`
  font-weight: 400;
  font-size: 11px;
  color: #ccd3ff;
  text-transform: uppercase;
`

const PlayerInfo: React.FC<React.PropsWithChildren<{ col?: number }>> = ({ col }) => {
  // const { isMobile } = useMatchBreakpoints()
  // const { t } = useTranslation()
  const fakeData = [
    {
      name: 'Lionel Messi',
      description: 'Lionel Messi is a soccer player the Argentina national team',
      external_url: 'https://ipfsgw.soccercrypto.io/ipfs/QmbepmeeWTrKGtWeo7kM8Dy9CzPayQWGP37GuZ14Q5kQhg',
      token_id: '10843',
      attributes: [
        {
          key: 'Rarity',
          trait_type: 'Rarity',
          value: 'Legend',
        },
        {
          key: 'Level',
          trait_type: 'Level',
          value: '1',
        },
        {
          key: 'Energy',
          trait_type: 'Energy',
          value: '6',
        },
        {
          key: 'Durability',
          trait_type: 'Durability',
          value: '300',
        },
        {
          key: 'SHO',
          trait_type: 'SHO',
          value: '76-100',
        },
        {
          key: 'POW',
          trait_type: 'POW',
          value: '76-100',
        },
        {
          key: 'SPE',
          trait_type: 'SPE',
          value: '76-100',
        },
        {
          key: 'JMP',
          trait_type: 'JMP',
          value: '76-100',
        },
      ],
      imagePlayer: 'https://ipfsgw.soccercrypto.io/ipfs/QmbepmeeWTrKGtWeo7kM8Dy9CzPayQWGP37GuZ14Q5kQhg',
    },
  ]
  return (
    <PlayerWrapper>
      {fakeData.map(({ imagePlayer, name, attributes }) => {
        const attributesMap: any = groupBy(attributes, 'key')
        return (
          <>
            <PlayerInfoWrapper rarity={attributesMap.Rarity[0].value as string} col={col}>
              <PlayerAvatar src={imagePlayer} col={col} />
              <PlayerName col={col}>{name}</PlayerName>
            </PlayerInfoWrapper>
            <PlayerInfoPrice>
              <PlayerPrice>
                <Flex style={{ alignItems: 'center' }}>
                  <Image src={coin2xImage} width="16px" height="16px" />
                  <TextPrice>1000</TextPrice>
                </Flex>
                <StyledSpan>(2.45 BUSD)</StyledSpan>
              </PlayerPrice>
              <GradientButton style={{ height: '32px', fontSize: '16px' }}>BUY</GradientButton>
            </PlayerInfoPrice>
          </>
        )
      })}
    </PlayerWrapper>
  )
}

export default PlayerInfo
