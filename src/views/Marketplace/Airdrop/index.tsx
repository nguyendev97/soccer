import { useState, useEffect } from 'react'
import { SearchIcon, useToast } from '@pancakeswap/uikit'
import CountDown from 'components/CountDown'
import SearchInput from 'components/SearchInput'
import VariousKickers from 'components/VariousKickers'
import Image from 'next/image'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useOpenSLegendContract, useERC1155 } from 'hooks/useContract'
import { getSLegendBoxAddress } from 'utils/addressHelpers'
import { coin2xImage } from 'views/Marketplace/images'
import { callWithEstimateGas } from 'utils/calls'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
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
      {/* <StyledNotify>Claim box Successfully!</StyledNotify> */}

      {/* Section */}
      {/* <AirdropSection /> */}
      <QuestBoxSection />
      <SearchSection />
      <CompetitionSection />
    </Wrapper>
  )
}

export default Airdrop

const SLEGEND = 6

// const AirdropSection = () => {
//   return (
//     <SectionWrapper>
//       <SectionTitle>AIRDROP</SectionTitle>
//       {/* TOKEN */}
//       <AirdropWrapper>
//         <AirdropTitle>AIRDROP TOKEN</AirdropTitle>
//         <AirdropContent>
//           <AirdropWrapperData>
//             <DataItem>
//               <DataTitle>Amount:</DataTitle> 1000 Slots
//             </DataItem>
//             <DataItem>
//               <DataTitle>Remain:</DataTitle>
//             </DataItem>

//             <DataItem>
//               <DataTitle>Reward:</DataTitle> 100
//               <Image
//                 src={coin2xImage}
//                 width={isMobile ? '18px' : '20px'}
//                 height={isMobile ? '18px' : '20px'}
//                 alt="coin"
//               />
//             </DataItem>
//           </AirdropWrapperData>
//           <CountDownWrapper>
//             <CountDown date="2022/12/18" />
//           </CountDownWrapper>
//         </AirdropContent>
//       </AirdropWrapper>
//       <GradientButton>Claim</GradientButton>
//       {/* BOX */}
//       <AirdropWrapper>
//         <AirdropTitle>AIRDROP FREE BOX</AirdropTitle>
//         <AirdropContent>
//           <AirdropWrapperData>
//             <DataItem>
//               <DataTitle>Amount:</DataTitle> 1000 Slots
//             </DataItem>
//             <DataItem>
//               <DataTitle>Remain:</DataTitle>
//             </DataItem>
//             <DataItem>
//               <DataTitle>Reward:</DataTitle> 1
//               <Image
//                 src="/images/quest-box.png"
//                 width={isMobile ? '18px' : '20px'}
//                 height={isMobile ? '18px' : '20px'}
//                 alt="coin"
//               />
//             </DataItem>
//           </AirdropWrapperData>
//           <CountDownWrapper>
//             <CountDown date="2022/12/18" />
//           </CountDownWrapper>
//         </AirdropContent>
//       </AirdropWrapper>
//       <GradientButton>Claim</GradientButton>
//     </SectionWrapper>
//   )
// }

const QuestBoxSection = () => {
  const { toastSuccess } = useToast()
  const [sLegendBoxAmount, setSLegendBoxAmount] = useState(0)
  const { account, chainId } = useWeb3React()
  const sLegendBoxAddress = getSLegendBoxAddress(chainId)
  const openSLegendContract = useOpenSLegendContract()
  const sLegendBoxContract = useERC1155(sLegendBoxAddress)

  const { callWithGasPrice } = useCallWithGasPrice()

  useEffect(() => {
    if (account) {
      sLegendBoxContract.balanceOf(account, SLEGEND).then(res => setSLegendBoxAmount(res.toNumber()))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  console.log({sLegendBoxAmount, sLegendBoxContract})

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const approvedForContract = await sLegendBoxContract.isApprovedForAll(account, openSLegendContract.address)
        return !approvedForContract
      } catch (error) {
        return true
      }
    },
    onApprove: () => {
      return callWithGasPrice(sLegendBoxContract, 'setApprovalForAll', [openSLegendContract.address, true])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        'Contract approved - You can now open boxes!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      return callWithEstimateGas(openSLegendContract, 'open', [Date.now(), [[SLEGEND]], [[sLegendBoxAmount > 5 ? 5 : sLegendBoxAmount]]], null, sLegendBoxAmount * 10000)
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(
        `Opened ${sLegendBoxAmount} box(es) just now`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    }
  })
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
            { rarity: 'Common kicker', background: 'rgba(68, 243, 107, 0.7)', percent: '5' },
            { rarity: 'Rare kicker', background: 'rgba(44, 66, 228, 0.7)', percent: '10' },
            { rarity: 'Epic kicker', background: 'rgba(118, 23, 183, 0.7)', percent: '45' },
            { rarity: 'Legendary kicker', background: 'rgba(255, 210, 59, 0.5)', percent: '40' },
          ]}
        />
      </BoxContent>
      <GradientButton disabled={sLegendBoxAmount < 1 || isApproving || isConfirming} onClick={!isApproved ? handleApprove : handleConfirm}>{isApproving || isConfirming ? 'Loading ...' : isApproved ? `Open now! [${sLegendBoxAmount}]` : 'Approve'}</GradientButton>
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
