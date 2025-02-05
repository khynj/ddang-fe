import PropTypes from 'prop-types'
import ProfileImage from './ProfileImage'
import ProductImage from '../../product/components/ProductImage'
import { Link } from 'react-router-dom'

const ReviewItem = ({ review }) => {
  const hammeredPrice = Intl.NumberFormat('ko-KR').format(
    review.product.hammeredPrice,
  )
  return (
    <div className='flex flex-col gap-2 p-4 bg-white text-sm border-b border-gray-200'>
      {/* User Info */}
      <div className='flex justify-between items-center '>
        <div className='flex items-center gap-2'>
          <ProfileImage src={review.review.profileImage} size={32} />
          <p className='text-gray-700'>{review.review.nickname}</p>
        </div>
        <p className='text-xs text-gray-900'>2024. 01. 29</p>
      </div>

      {/* Product Info */}
      <Link
        className='flex grid grid-cols-7 gap-2'
        to={`/popup/product/${review.product.productId}`}
      >
        <div className='col-span-1 py-1'>
          <ProductImage product={review.product} />
        </div>
        <div className='col-span-6 flex flex-col justify-end'>
          <p className='text-gray-950 truncate'>{review.product.title}</p>
          <p className='font-semibold text-gray-950 mt-1'>{hammeredPrice}원</p>
        </div>
      </Link>

      <p className='text-sm font-semibold text-gray-900'>
        {scoreToText(review.review.score)}
      </p>
      <p className='text-sm text-gray-800 '>{review.review.review}</p>
    </div>
  )
}

function scoreToText(score) {
  switch (score) {
    case 1:
      return '매우의심'
    case 2:
      return '의심'
    case 3:
      return '보통'
    case 4:
      return '신뢰'
    case 5:
      return '완전신뢰'
    default:
      return ''
  }
}

ReviewItem.propTypes = {
  review: PropTypes.object,
}

export default ReviewItem
