import MaterialIcon from '@/components/icons/MaterialIcon'
import PropTypes from 'prop-types'
import ProductImage from '../ProductImage'
import ROUTES from '@/data/ROUTES'
import { Link } from 'react-router'
import { formatPrice } from '@/utils/price'
import { useQueryClient } from '@tanstack/react-query'
import useEndTimeDDay from '@/hooks/useEndTimeDDay'
import { UTCToDate } from '@/utils/date'

function ProductBiddingItem({ product }) {
  const price = formatPrice(product.currentBidPrice)
  const instantHammerPrice = formatPrice(product.instantHammerPrice)
  const isTopBidder = product.myBidPrice === product.currentBidPrice
  const queryClient = useQueryClient()
  const endTimeDDay = useEndTimeDDay(product.endTime)
  if (!endTimeDDay) {
    queryClient.invalidateQueries('searchAuctions')
  }
  return (
    <Link
      className={`grid grid-cols-8 p-4 gap-3 border-b border-gray-200`}
      to={ROUTES.PRODUCT_DETAIL.replace(':id', product.auctionId)}
    >
      <div className='col-span-2'>
        <ProductImage product={product} heartSize={26} heart />
      </div>
      <div className='col-span-4 flex flex-col w-full py-0.5 justify-between'>
        <div className='flex justify-between'>
          <p className='font-bold text-gray-900 tracking-tight truncate'>
            {product.title}
          </p>
        </div>
        <div className='flex justify-between'>
          <div>
            {isTopBidder ? (
              <div className='flex items-center w-fit gap-1 px-2 py-0.5 mt-2 mb-0.5 text-white bg-ddblue-400 rounded-xl'>
                <MaterialIcon name='crown' filled size={18} />
                <p className='font-bold leading-none'>{price}원</p>
              </div>
            ) : (
              <div className='flex items-center mt-2 mb-0.5 gap-1'>
                <div className='px-1 py-0.5 bg-gray-400 rounded-xl'>
                  <p className='font-bold text-white text-xs'>뺏김</p>
                </div>
                <p className='text-gray-500 leading-none line-through'>
                  {price}원
                </p>
              </div>
            )}
            {!!product.instantHammerPrice && (
              <p className='text-sm text-gray-600'>
                즉시낙찰가 {instantHammerPrice}원
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between items-end col-span-2'>
        <p className='text-sm text-gray-700'>
          {endTimeDDay ? `${endTimeDDay} 남음` : `경매 종료됨`}
        </p>

        <div className='flex items-end text-gray-600 gap-2'>
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
      </div>
    </Link>
  )
}

ProductBiddingItem.propTypes = {
  product: PropTypes.object,
  isHammered: PropTypes.bool,
}

export default ProductBiddingItem
