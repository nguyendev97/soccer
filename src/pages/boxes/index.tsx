import GoldenBox from 'views/Marketplace/Boxes/GoldenBox'
import SilverBox from 'views/Marketplace/Boxes/SilverBox'
import CommonBox from 'views/Marketplace/Boxes/CommonBox'

const IndexPage = () => {
  return (
    <>
      <GoldenBox />
      <SilverBox />
      <CommonBox />
    </>
  )
}

IndexPage.chains = []

export default IndexPage
