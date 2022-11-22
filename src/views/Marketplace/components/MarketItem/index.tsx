import styled from 'styled-components'
import { useState } from 'react'
import Image from 'next/image'
import { API_NFT } from 'config/constants/endpoints'
import { useImportNFTContract, useERC721 } from 'hooks/useContract'
import { useWeb3React, useSignMessage } from '@pancakeswap/wagmi'
import { Text, BoxProps, Button, Heading, Flex, useToast } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { getRefferalOwnerAddress, getPlayersAddress } from 'utils/addressHelpers'
import useToken from 'hooks/useToken'
import { callWithEstimateGas } from 'utils/calls'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { ToastDescriptionWithTx } from 'components/Toast'
import { TOKEN_KEY } from 'config'
// import GradientButton from 'components/GradientButton'
import { powImage, shoImage, speImage, jmpImage } from '../../images'
// import { ButtonContainer } from 'views/Nft/market/Collection/IndividualNFTPage/shared/styles'
const refferalOwnerAddress = getRefferalOwnerAddress()



interface ItemProps extends BoxProps {
  tokenId: string
  code?: string
  ratity: string
  level?: string
  avatar?: any
  price?: string
  pow?: string
  sho?: string
  spe?: string
  jmp?: string
  statusName?: string
  onApply?: (min: number, max: number) => void
  onClear?: () => void
}

const getButton = (statusName: string) => {
  switch (statusName) {
    case 'inWallet':
      return <ButtonSelling disabled>In Wallet</ButtonSelling>
    case 'selling':
      return <ButtonSelling>{statusName}</ButtonSelling>
    case 'remove':
      return <ButtonRemove>{statusName}</ButtonRemove>
    case 'approve':
      return <ButtonApprove>{statusName}</ButtonApprove>
    default:
      return <ButtonSelling>Button</ButtonSelling>
  }
}

export const getNonce = async (address) => {
  const res = await fetch(`${API_NFT}/user-nonce?address=${address}`)
  if (res.ok) {
    const json = await res.json()
    return json
  }
  console.error('Failed to fetch getNonce', res.statusText)
  return { nonce: 0 }
}

export const login = async (data) => {
  const res = await fetch(`${API_NFT}/user/authenticate`, {
    body: JSON.stringify(data),
    method: 'POST', // or 'PUT'
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
  }})
  if (res.ok) {
    const json = await res.json()
    return json
  }
  console.error('Failed to fetch login', res.statusText)
  return null
}

export const register = async (data) => {
  const res = await fetch(`${API_NFT}/users`, {
    body: JSON.stringify(data),
    method: 'POST', // or 'PUT'
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
  }})
  if (res.ok) {
    const json = await res.json()
    return json
  }
  console.error('Failed to fetch register', res.statusText)
  return null
}

export const importNfts = async (data, toastErr) => {
  const authorization = localStorage.getItem(TOKEN_KEY)
  const res = await fetch(`${API_NFT}/import`, {
    body: JSON.stringify(data),
    method: 'POST', // or 'PUT'
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${authorization}`
  }})
  if (res.ok) {
    const json = await res.json()
    return json
  }
  toastErr('Failed to post importNfts')
  console.error('Failed to fetch importNfts', res.statusText)
  return null
}

export const updateImportNfts = async (requestId, toastErr) => {
  const authorization = localStorage.getItem(TOKEN_KEY)
  const res = await fetch(`${API_NFT}/import/${requestId}`, {
    method: 'PUT', // or 'PUT'
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${authorization}`
  }})
  if (res.ok) {
    const json = await res.json()
    return json
  }
  toastErr('Failed to update importNfts')
  console.error('Failed to fetch updateImportNfts', res.statusText)
  return null
}

const MarketItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  code,
  ratity,
  level,
  avatar,
  pow,
  sho,
  spe,
  jmp,
  statusName,
  tokenId,
  ...props
}) => {
  const { toastSuccess, toastError } = useToast()
  const { setToken, token } = useToken()
  const { signMessageAsync } = useSignMessage()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { account, chainId } = useWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const [isImported, setIsImported] = useState(false)
  const { t } = useTranslation()
  const playersAddress = getPlayersAddress(chainId)
  const importNFTContract = useImportNFTContract()
  const playersContract = useERC721(playersAddress)

  const handleImport = async () => {
    if (!token) {
      const { nonce } = await getNonce(account)
      const signature = await signMessageAsync({ message: `ss2022- ${nonce || 0}` })
      let res = null
      if (!nonce) {
        res = await register({
          signature,
          address: account,
          nonce: '0',
          referBy: refferalOwnerAddress
        })
      } else {
        res = await login({
          signature,
          address: account,
        })
        setToken(res.token)
      }
    }
    
    const resImport = await importNfts({
      tokenIds: [tokenId]
    }, toastError).catch(err => toastError(err.message))
    console.log({resImport})
    // importNFT.
    const tx = await callWithEstimateGas(importNFTContract, 'importNFT', [tokenId, [resImport.importRequestId]])
    await tx.wait()
    const resUpdate = updateImportNfts(resImport.importRequestId, toastError).catch(err => toastError(err.message))
    console.log({resUpdate})
    if (resUpdate) {
      setIsImported(true)
    }
    return tx
  }

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const approvedForContract = await playersContract.isApprovedForAll(account, importNFTContract.address)
        return !approvedForContract
      } catch (error) {
        return true
      }
    },
    onApprove: () => {
      return callWithGasPrice(playersContract, 'setApprovalForAll', [importNFTContract.address, true])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        'Contract approved - You can now import!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      return handleImport()
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(
        `Your NFT was imported!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    }
  })

  return (
    <FlexRowItem {...props}>
      <Flex width={isMobile ? '100%' : 'auto'}>
        <Flex>
          <Avatar>
            <PlayerInfo rarity={ratity}>
              <PlayerAvatar avatar={avatar.replace('.io', '.net')} />
              {/* <img style={{height: 100, width: 'fit-content'}} src={avatar} alt={code} className="avatar-img" /> */}
            </PlayerInfo>
          </Avatar>
          <ItemInfo>
            <LegendTextRaty>{ratity}</LegendTextRaty>
            <LegendTextCode>{code}</LegendTextCode>
            <LegendTextLevel>{level}</LegendTextLevel>
          </ItemInfo>
        </Flex>
        {isMobile && <ItemPrice>{getButton(statusName)}</ItemPrice>}
      </Flex>
      <ItemProperties>
        <ItemLegend>
          {!isMobile && <ItemLegendText>{t('POW')}</ItemLegendText>}
          <FlexLegendItem>
            <Image src={powImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLegendText ml="8px">{pow}</ItemLegendText>
          </FlexLegendItem>
        </ItemLegend>
        <ItemLegend>
          {!isMobile && <ItemLegendText>{t('SHO')}</ItemLegendText>}
          <FlexLegendItem>
            <Image src={shoImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLegendText ml="8px">{sho}</ItemLegendText>
          </FlexLegendItem>
        </ItemLegend>
        <ItemLegend>
          {!isMobile && <ItemLegendText>{t('SPE')}</ItemLegendText>}
          <FlexLegendItem>
            <Image src={speImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLegendText ml="8px">{spe}</ItemLegendText>
          </FlexLegendItem>
        </ItemLegend>
        <ItemLegend>
          {!isMobile && <ItemLegendText>{t('JMP')}</ItemLegendText>}
          <FlexLegendItem>
            <Image src={jmpImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLegendText ml="8px">{jmp}</ItemLegendText>
          </FlexLegendItem>
        </ItemLegend>
      </ItemProperties>
      {!isMobile && (
        <ItemPrice>
          {chainId === 97 ? isImported
            ? <ButtonSelling disabled>Imported</ButtonSelling>
            :<ButtonSelling onClick={event => {
              event.preventDefault()
              if (isApproved) {
                handleConfirm()
              } else {
                handleApprove()
              }
            }}>{isApproving || isConfirming ? 'Loading ...' : isApproved ? 'Import' : 'Approve'}</ButtonSelling>
            : null
          }
          {chainId === 56 && <ButtonSelling disabled>In Wallet</ButtonSelling>}
        </ItemPrice>
      )}
    </FlexRowItem>
  )
}

export default MarketItem

const FlexRowItem = styled(Flex)`
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: center;
  background: #1d018d;
  border-radius: 10px;
  padding: 8px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`
const Avatar = styled.div`
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`
const ItemInfo = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
`
const ItemProperties = styled(Flex)`
  flex-direction: row;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin-top: 10px;
    padding-bottom: 10px;
  }
`
const ItemPrice = styled.div`
  padding-right: 50px;
  @media (max-width: 768px) {
    padding-right: 0px;
    margin-left: auto;
  }
`
const ItemLegend = styled.div`
  margin: 0 12px;
  @media (max-width: 768px) {
    margin: 0;
  }
`
const LegendTextRaty = styled(Text)`
  color: #36dbff;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const LegendTextCode = styled(Heading)`
  font-weight: 600;
  font-size: 20px;
  margin: 8px 0;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`
const LegendTextLevel = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const ItemLegendText = styled(Text)`
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
`
const FlexLegendItem = styled(Flex)`
  margin-top: 10px;
`
const ButtonSelling = styled(Button)`
  padding: 0px 20px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  background: transparent;
  border: 1px solid #ccd3ff;
  color: #fff;
  height: 40px;
  border-radius: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    height: 36px;
  }
`
const ButtonRemove = styled(Button)`
  padding: 0px 20px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  background: #9197ba;
  border: 1px solid #9197ba;
  color: #fff;
  height: 40px;
  border-radius: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    height: 36px;
  }
`
const ButtonApprove = styled(Button)`
  padding: 0px 20px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  background: linear-gradient(103.59deg, #00cc83 26.67%, #36dbff 74.7%);
  border: 0;
  color: #fff;
  height: 40px;
  border-radius: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    height: 36px;
  }
`

const PlayerInfo = styled(Flex)<{ rarity: string }>`
  width: 110px;
  height: 110px;
  padding: 5px;
  background: ${({ rarity }) => `url('/images/rarity/${rarity}.png') no-repeat center center`};
  background-size: contain;
  align-items: center;
  justify-content: center;
`
const PlayerAvatar = styled.div<{ avatar: string }>`
  width: 100%;
  height: 100%;
  background: ${({ avatar }) => `url('${avatar}') no-repeat center center`};
  background-size: contain;
`