import Slider from '@/components/Slider'
import HomeMainProduct from './HomeMainProduct'
import { useSearchAuctions } from '@/apis/auction'
import { useState } from 'react'

function HomeMainSlider() {
  const { data: products } = useSearchAuctions({
    orderBy: 'createdAt',
    page: 1,
    size: 10,
    isHammered: false,
  })
  useState(() => {
    // console.log(products, typeof products)
    console.log(products)
  }, [products])
  if (!products) return null
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
