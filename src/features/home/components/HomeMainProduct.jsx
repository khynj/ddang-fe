import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { formatPrice } from '@/utils/price'
import ROUTES from '@/data/ROUTES'
import { useAuth } from '@/contexts/AuthContext'
import { useQueryClient } from '@tanstack/react-query'
import useEndTimeDDay from '@/hooks/useEndTimeDDay'

function HomeMainProduct({ product, index, size }) {
  const { user } = useAuth()
  const price = formatPrice(product.currentBidPrice || product.minimumBid)
  const queryClient = useQueryClient()
  const endTimeDDay = useEndTimeDDay(product.endTime)
  if (!endTimeDDay) {
    queryClient.invalidateQueries(['searchAuctions'])
  }
  return (
    <Link
      to={ROUTES.PRODUCT_DETAIL.replace(':id', product.auctionId)}
      className='relative aspect-square w-full flex-shrink-0 snap-center'
    >
      <div className='bg-white brightness-96'>
        <img
          src={product.url}
          alt='product'
          className='aspect-square w-full object-contain'
        />
      </div>
      <div
        className='absolute z-1 w-full bottom-0 px-3 py-2 text-white'
        style={{ backgroundColor: '#00000060' }}
      >
        <div className='flex justify-between text-sm text-gray-50'>
          <span>{user.nickname}님을 위한 상품</span>
          <span>{endTimeDDay ? `${endTimeDDay} 남음` : `경매 종료됨`}</span>
        </div>
        <p className='text-lg font-bold text-gray-100 mt-4'>
          {product.productName}
        </p>
        <div className='flex justify-between items-end text-sm '>
          <span className='text-xl font-bold tracking-wide'>{price}원</span>
          <span className='text-gray-50'>
            {index} / {size}
          </span>
        </div>
      </div>
    </Link>
  )
}

HomeMainProduct.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number,
  size: PropTypes.number,
}

export default HomeMainProduct
