import Slider from '@/components/Slider'
import HomeMainProduct from './HomeMainProduct'
import { useSearchAuctions } from '@/apis/auction'

function HomeMainSlider() {
  const {
    data: products,
    isError,
    isLoading,
  } = useSearchAuctions({
    orderBy: 'createdAt',
    page: 1,
    size: 10,
    isHammered: false,
  })
  return (
    <Slider>
      {isError || isLoading ? (
        <NoHomeMainProduct
          index={1}
          size={1}
          product={{
            auctionId: 1,
            title: '삼성 비스포크 냉장고',
            productName: '삼성 비스포크 185L',
            minimumBid: 1000000,
            currentBidPrice: 1200000,
            instantHammerPrice: 1500000,
            myBidPrice: null,
            bidderCount: 10,
            bidCount: 15,
            startTime: '2025-01-21 06:30:00',
            endTime: '2025-02-21 06:30:00',
          }}
        />
      ) : (
        products?.map((product, index) => (
          <HomeMainProduct
            key={index}
            index={index + 1}
            size={products.length}
            product={product}
          />
        ))
      )}
    </Slider>
  )
}

export default HomeMainSlider
