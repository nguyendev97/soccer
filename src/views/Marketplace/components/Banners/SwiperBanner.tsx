import styled from 'styled-components'
import { BoxProps } from '@pancakeswap/uikit'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SwipperWrapper = styled.div`
  position: relative;

  .swiper-pagination {
    bottom: 16px;

    .swiper-pagination-bullet {
      width: 24px;
      height: 6px;
      background: #545454;
      border-radius: 40px;
      opacity: 1;

      &.swiper-pagination-bullet-active {
        background: #36dbff;
      }
    }
  }
`
const SwipperImage = styled.div<{ src: string }>`
  width: 100%;
  height: 430px;
  background: url('${({ src }) => src}') no-repeat center center;
  @media (max-width: 768px) {
    height: 300px;
    background-size: cover;
  }
`

interface ItemProps extends BoxProps {
  banners?: Array<{ url: string }>
}

const SwiperBanner: React.FC<React.PropsWithChildren<ItemProps>> = ({ banners, ...props }) => {
  return (
    <SwipperWrapper {...props}>
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {banners.length > 0 &&
          banners.map((item) => (
            <SwiperSlide>
              <SwipperImage src={item.url} />
            </SwiperSlide>
          ))}
      </Swiper>
    </SwipperWrapper>
  )
}

export default SwiperBanner
