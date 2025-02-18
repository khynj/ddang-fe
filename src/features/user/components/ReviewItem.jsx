import PropTypes from 'prop-types'
// import ProfileImage from './ProfileImage'
import ProductImage from '../../product/components/ProductImage'
import { formatPrice } from '@/utils/price'
import { Link } from 'react-router'
import ROUTES from '@/data/ROUTES'
import { scoreToText } from '@/utils/member'

const ReviewItem = ({ review, received }) => {
  const hammeredPrice = formatPrice(review.auction.hammeredPrice)
  const action = review.review.role == 'SELLER' ? '구매' : '판매'

  return (
    <div className='flex flex-col gap-2 p-4 bg-white text-sm border-b border-gray-200'>
      {/* User Info */}
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          {received && (
            <div className='flex items-center gap-2 px-1'>
              <p className='text-gray-700'>{review.review.nickname}</p>
            </div>
          )}
          <Link
            to={ROUTES.PRODUCT_DETAIL.replace(':id', review.auction.auctionId)}
            className='flex grid grid-cols-5 gap-2'
          >
            <div className='col-span-1 py-1'>
              <ProductImage product={review.auction} small />
            </div>
            <div className='col-span-4 flex flex-col py-1'>
              <p className='text-gray-950 truncate flex-grow'>
                {review.auction.title}
              </p>
              <p className='font-bold text-gray-950 mt-1'>
                {hammeredPrice}원 {action}
              </p>
            </div>
          </Link>
        </div>
        <div className='flex flex-col shrink-0 gap-2.5 py-2'>
          <p className='text-xs text-gray-900'>
            {new Date(review.review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className='text-sm font-bold text-gray-900'>
        {scoreToText(review.review.satisfyScore)}
      </p>
      <p className='text-sm text-gray-800 '>{review.review.content}</p>
    </div>
  )
}

ReviewItem.propTypes = {
  review: PropTypes.object,
  received: PropTypes.bool,
}

export default ReviewItem
