import PropTypes from 'prop-types'
import { Link } from 'react-router'
import relativeTime from '@/utils/relativeTime'
import ProductImage from './ProductImage'
import { formatPrice } from '@/utils/price'

function ProductHistoryItem({ product }) {
  const price = product.hammeredTime
    ? formatPrice(product.hammeredPrice) + '원 낙찰'
    : '유찰'
  const minimumBid = formatPrice(product.minimumBid)
  const instantHammerPrice = product.instantHammerPrice
    ? formatPrice(product.instantHammerPrice)
    : null
  const day =
    product.hammeredTime && product.hammeredTime < product.endTime
      ? relativeTime(product.hammeredTime)
      : product.endTime
      ? relativeTime(product.endTime)
      : ''

  return (
    <Link
      className={`grid grid-cols-9 p-4 py-3.5 gap-3 border-b border-gray-200 ${
        product.myBidPrice && 'bg-gray-50'
      }`}
      to={`/popup/product/${product.auctionId}`}
    >
      <div className='col-span-2 m-auto'>
        <ProductImage product={product} />
      </div>
      <div className='col-span-5 flex flex-col justify-between w-full py-0.5'>
        <div className='flex justify-between'>
          <p className='font-bold text-gray-500 tracking-tight truncate'>
            {product.title}
          </p>
        </div>

        <div className='flex flex-col'>
          <p className='font-bold text-gray-950'>{price}</p>
          <div className='text-xs text-gray-900'>
            <p className='block'>입찰시작가 {minimumBid}원</p>
            {!!product.instantHammerPrice && (
              <p className='block'>즉시낙찰가 {instantHammerPrice}원</p>
            )}
          </div>
        </div>
      </div>
      <div className='flex col-span-2 justify-end'>
        <p className='text-sm text-gray-700'>{day}</p>
      </div>
    </Link>
  )
}

ProductHistoryItem.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductHistoryItem
