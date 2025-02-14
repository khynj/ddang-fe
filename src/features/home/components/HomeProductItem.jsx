import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { dday } from '@/utils/Dday'
import ProductImage from '../../product/components/ProductImage'
import { Link } from 'react-router'
import ROUTES from '@/data/ROUTES'
import { formatPrice } from '@/utils/formatPrice'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
function HomeProductItem({ product }) {
  const price = formatPrice(product.currentBidPrice || product.minimumBid)
  const [endTime, setEndTime] = useState(new Date(product.endTime))
  // const [mountedTime, setMountedTime] = useState(new Date())
  // const queryClient = useQueryClient()
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setEndTime(cur => cur - 1000)
  //   }, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  // if (endTime - mountedTime < 0) {
  //   queryClient.invalidateQueries('searchAuctions')
  // }

  return (
    <Link
      className='flex flex-col'
      to={`${ROUTES.PRODUCT_DETAIL}`.replace(':id', product.auctionId)}
    >
      <ProductImage product={product} heart />
      <div className='flex flex-col px-0.5 mt-1'>
        <span className='text-gray-800 text-sm truncate'>{product.title}</span>
        <span className='text-gray-950 font-bold h-fit leading-none'>
          {price}원
        </span>
        <div className='flex flex-row justify-between items-center mt-1'>
          <div className='flex items-center text-gray-600 gap-2'>
            <div className='flex items-center gap-0.5'>
              <MaterialIcon name='person_raised_hand' filled size={18} />
              <span className='text-sm tracking-tight'>
                {product.bidderCount}
              </span>
            </div>
            <div className='flex items-center gap-0.5'>
              <MaterialIcon name='front_hand' filled size={18} />
              <span className='text-sm tracking-tight'>{product.bidCount}</span>
            </div>
          </div>
          <span className='text-gray-600 text-sm'>{dday(endTime)} 남음</span>
        </div>
      </div>
    </Link>
  )
}

HomeProductItem.propTypes = {
  product: PropTypes.object,
}

export default HomeProductItem
