import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router'
import { shortRelativeTime } from '@/utils/date'
import ProductImage from './ProductImage'
import { formatPrice } from '@/utils/price'
import ROUTES from '@/data/ROUTES'

function ProductHistoryItem({ product, role }) {
  const price = product.currentBidPrice
    ? formatPrice(product.currentBidPrice) + '원 낙찰'
    : '유찰'
  const minimumBid = formatPrice(product.minimumBid)
  const instantHammerPrice = product.instantHammerPrice
    ? formatPrice(product.instantHammerPrice)
    : null
  const day =
    product.hammeredTime && product.hammeredTime < product.endTime
      ? shortRelativeTime(product.hammeredTime)
      : product.endTime
      ? shortRelativeTime(product.endTime)
      : ''

  const route = useNavigate()
  const onReview = e => {
    e.preventDefault()
    route(ROUTES.REVIEW_REGISTER.replace(':id', product.auctionId), {
      state: { revieweeRole: role == 'seller' ? 'BUYER' : 'SELLER' },
    })
  }

  return (
    <Link
      className={`grid grid-cols-9 p-4 py-3.5 gap-3 border-b border-gray-200 ${
        product.myBidPrice && 'bg-gray-50'
      }`}
      to={ROUTES.PRODUCT_DETAIL.replace(':id', product.auctionId)}
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
      <div className='flex flex-col col-span-2 items-end justify-between'>
        <p className='text-sm text-gray-700'>{day}</p>
        {!product.reviewed && (
          <button
            onClick={onReview}
            className='p-2 bg-ddblue-400 text-white rounded-xl whitespace-nowrap text-sm'
          >
            리뷰작성
          </button>
        )}
      </div>
    </Link>
  )
}

ProductHistoryItem.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductHistoryItem
