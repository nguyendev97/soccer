import { useRouter } from 'next/router'
import CollectionWrapper from './CollectionWrapper'

const Items = () => {
  const collectionAddress = useRouter().query.collectionAddress as string

  return (
    <CollectionWrapper collectionAddress={collectionAddress} />
  )
}

export default Items
