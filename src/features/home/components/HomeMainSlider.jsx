import Slider from '@/components/Slider'
import HomeMainProduct from './HomeMainProduct'
import { useSearchAuctions } from '@/apis/auction'
import NoHomeMainProduct from './NoHomeMainProduct'

function HomeMainSlider() {
  const {
    data: products,
    isError,
    isLoading,
  } = useSearchAuctions({
    sortType: 'createdAt',
    sortOrder: 'DESC',
    page: 1,
    size: 10,
    isHammered: false,
  })
  return (
    <Slider>
      {isError || isLoading || products?.auctionDetailProjection.length < 1 ? (
        <NoHomeMainProduct />
      ) : (
        products?.auctionDetailProjection.map((product, index) => (
          <HomeMainProduct
            key={index}
            index={index + 1}
            size={products.auctionDetailProjection.length}
            product={product}
          />
        ))
      )}
    </Slider>
  )
}

export default HomeMainSlider
