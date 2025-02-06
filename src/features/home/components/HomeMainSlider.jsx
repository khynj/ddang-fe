import Slider from '@/components/Slider'
import HomeMainProduct from './HomeMainProduct'
import { useSearchAuctions } from '@/apis'
import { useState } from 'react'

function HomeMainSlider() {
  const { data } = useSearchAuctions()
  useState(() => {
    console.log(data)
  }, [data])
  return (
    <Slider>
      {/* {products &&
        products.map((product, index) => (
          <HomeMainProduct
            key={index}
            index={index + 1}
            size={products.length}
            product={product}
          />
        ))} */}
    </Slider>
  )
}

export default HomeMainSlider
