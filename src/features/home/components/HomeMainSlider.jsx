import Slider from '@/components/Slider'
import HomeMainProduct from './HomeMainProduct'
import { usePersonalizedAuctions } from '@/apis/auction'
import NoHomeMainProduct from './NoHomeMainProduct'
import Spinner from '@/components/placeholder/Spinner'

function HomeMainSlider() {
  const { data: products } = usePersonalizedAuctions()

  if (!products) return <Spinner />
  return (
    <Slider>
      {products.length < 1 ? (
        <NoHomeMainProduct />
      ) : (
        products.map((product, index) => (
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
