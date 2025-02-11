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
    orderBy: 'createdAt',
    page: 1,
    size: 10,
    isHammered: false,
  })
  return (
    <Slider>
      {isError || isLoading ? (
        <NoHomeMainProduct />
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
