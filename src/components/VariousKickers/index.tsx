import { Text, Flex } from '@pancakeswap/uikit'

interface Rarity {
  background: string
  rarity: string
  percent: string
}

export interface VariousKickersProps {
  rarities: Rarity[]
}

const VariousKickers: React.FC<React.PropsWithChildren<VariousKickersProps>> = ({ rarities }) => {

  return (
    <Flex flexDirection="column" borderRadius="12px" overflow="hidden">
      <Flex px="12px" height="42px" alignItems="center" justifyContent="space-between" background="#1D018D">
        <Text color="#FFFFFF">Drop rate</Text>
      </Flex>
      {rarities.map(({ percent, rarity, background }) => {
        return (<Flex px="12px" height="42px" alignItems="center" justifyContent="space-between" background={background}>
            <Text color="#FFFFFF">{rarity}</Text>
            <Text color="#FFFFFF">{percent}%</Text>
          </Flex>)
      })}
    </Flex>
  )
}

export default VariousKickers
