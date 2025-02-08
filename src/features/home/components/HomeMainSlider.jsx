import Slider from '@/components/Slider'
import HomeMainProduct from './HomeMainProduct'
import { useSearchAuctions } from '@/apis/auction'
import { useState } from 'react'

function HomeMainSlider() {
  const { data: products } = useSearchAuctions()
  useState(() => {
    console.log(products)
  }, [products])
  return (
    <Slider>
      {products &&
        products.map((product, index) => (
          <HomeMainProduct
            key={index}
            index={index + 1}
            size={products.length}
            product={product}
          />
        ))}
    </Slider>
  )
}

export default HomeMainSlider
