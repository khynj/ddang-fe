import Slider from '@/components/Slider'
import HomeMainProduct from './HomeMainProduct'
import { usePersonalizedAuctions } from '@/apis/auction'
import NoHomeMainProduct from './NoHomeMainProduct'
import InlineSpinner from '@/components/placeholder/InlineSpinner'

function HomeMainSlider() {
  const { data: products, isPending, isError } = usePersonalizedAuctions()

  if (isPending) return <InlineSpinner />
  return (
    <Slider>
      {isError || products.length < 1 ? (
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
